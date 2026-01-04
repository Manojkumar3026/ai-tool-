
import React, { useState, useRef, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const AIChat: React.FC = () => {
  const { useQuery } = window.ReactQuery;
  const { motion, AnimatePresence } = window.framer;
  const ReactMarkdown = window.ReactMarkdown;
  const { Send, Sparkles, Bot, User, Loader2, Lightbulb } = window.lucide;
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your AI assistant for discovering tools. Ask me anything like:\n\n• \"Show me free AI tools for video editing\"\n• \"What are the best chatbots for customer support?\"\n• \"Find me design tools for beginners\"\n\nHow can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: tools = [] } = useQuery({
    queryKey: ['tools-chat'],
    queryFn: () => base44.entities.Tool.filter({ status: 'approved' }, '-created_date', 500),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Show me free coding tools",
    "What's trending in AI design?",
    "Find tools for content creators",
    "Best AI tools for marketing"
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const toolsContext = tools.map(t => ({
        name: t.name,
        description: t.tagline || t.description,
        category: t.category,
        pricing: t.pricing_type,
        tags: t.tags,
        id: t.id
      })).slice(0, 100);

      const prompt = `You are an AI assistant helping users discover AI tools from the AIverse database.

Available tools database (first 100 tools):
${JSON.stringify(toolsContext, null, 2)}

User question: ${userMessage}

Please provide a helpful response that:
1. Recommends specific tools from the database that match their needs
2. Explains why each tool is relevant
3. Mentions pricing and key features
4. Be conversational and friendly
5. If asking about trends, analyze the tools database

Format your response in markdown with tool names in bold and use bullet points for features.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    }

    setIsLoading(false);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="h-[calc(100vh-60px)] lg:h-screen flex flex-col bg-[#0a0a0f]">
      <div className="glass-effect border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center glow-blue">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Assistant</h1>
            <p className="text-sm text-gray-400">Your personal AI tool discovery guide</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-orange-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                <div className={`flex-1 glass-effect rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-orange-500/20'
                    : 'border-blue-500/20'
                }`}>
                  {message.role === 'assistant' ? (
                    <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-white">{message.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="glass-effect rounded-2xl p-4 border-blue-500/20">
                <div className="flex items-center gap-2 text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {messages.length === 1 && !isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm">Try asking:</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button key={index} onClick={() => handleQuestionClick(question)} className="glass-effect rounded-xl p-4 text-left hover:border-blue-500/30 transition-all text-sm text-gray-300 hover:text-white border border-white/10">
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="glass-effect border-t border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
            <Input
              type="text"
              placeholder="Ask me anything about AI tools..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-12 h-12 rounded-xl"
            />
            <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="absolute right-1 top-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-10 w-10">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">AI can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
};
export default AIChat;
