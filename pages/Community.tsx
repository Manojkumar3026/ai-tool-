
import React, { useState } from "react";
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const Community: React.FC = () => {
  const { Plus, MessageSquare, TrendingUp, Pin, Search, Eye, MessageCircle } = window.lucide;
  const { formatDistanceToNow } = window.dateFns;
  const { useQuery, useMutation, useQueryClient } = window.ReactQuery;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: []
  });

  const queryClient = useQueryClient();

  const { data: discussions = [] } = useQuery({
    queryKey: ['discussions'],
    queryFn: () => base44.entities.Discussion.list('-created_date'),
  });

  const createDiscussionMutation = useMutation({
    mutationFn: (data: any) => base44.entities.Discussion.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
      setShowNewDiscussion(false);
      setNewDiscussion({ title: '', content: '', category: 'General', tags: [] });
    },
  });

  const categories = ['General', 'Tool Discovery', 'AI Trends', 'Feature Requests', 'Help & Support'];

  const filteredDiscussions = discussions.filter(discussion => {
    if (selectedCategory !== 'all' && discussion.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        discussion.title?.toLowerCase().includes(query) ||
        discussion.content?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) return;
    createDiscussionMutation.mutate(newDiscussion);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Community</h1>
            <p className="text-gray-400">Join the conversation about AI tools</p>
          </div>
          <Dialog open={showNewDiscussion} onOpenChange={setShowNewDiscussion}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader><DialogTitle>Start a Discussion</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div><label className="text-sm text-gray-400 mb-2 block">Title</label><Input placeholder="What's on your mind?" value={newDiscussion.title} onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })} className="bg-white/5 border-white/10 text-white"/></div>
                <div><label className="text-sm text-gray-400 mb-2 block">Category</label><Select value={newDiscussion.category} onValueChange={(value) => setNewDiscussion({ ...newDiscussion, category: value })}><SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger><SelectContent>{categories.map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select></div>
                <div><label className="text-sm text-gray-400 mb-2 block">Content</label><Textarea placeholder="Share your thoughts..." value={newDiscussion.content} onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })} className="bg-white/5 border-white/10 text-white h-32"/></div>
                <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setShowNewDiscussion(false)} className="border-white/20">Cancel</Button><Button onClick={handleCreateDiscussion} disabled={createDiscussionMutation.isPending} className="bg-gradient-to-r from-blue-500 to-purple-500">Post Discussion</Button></div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass-effect rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><Input type="text" placeholder="Search discussions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white"/></div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}><SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white"><SelectValue placeholder="All Categories" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDiscussions.map(discussion => (
            <div key={discussion.id} className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border-2 border-blue-500/30"><AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">{discussion.created_by?.[0]?.toUpperCase() || 'U'}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">{discussion.is_pinned && <Pin className="w-4 h-4 text-orange-400" />}<h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{discussion.title}</h3></div>
                      <div className="flex items-center gap-3 text-sm text-gray-500"><span>{discussion.created_by?.split('@')[0]}</span><span>•</span><span>{formatDistanceToNow(new Date(discussion.created_date), { addSuffix: true })}</span></div>
                    </div>
                    <Badge variant="outline" className={`flex-shrink-0 ${discussion.category === 'General' ? 'border-blue-500/30 text-blue-400' : discussion.category === 'AI Trends' ? 'border-purple-500/30 text-purple-400' : 'border-green-500/30 text-green-400'}`}>{discussion.category}</Badge>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{discussion.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500"><div className="flex items-center gap-1"><Eye className="w-4 h-4" /><span>{discussion.views || 0}</span></div><div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /><span>{discussion.replies_count || 0}</span></div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
