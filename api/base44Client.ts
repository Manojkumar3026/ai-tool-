
// Mock Base44 Client for frontend development
// This simulates a backend by parsing CSV data and storing it in memory.

const toolsCsv = `name,tagline,description,website_url,logo_url,category,tags,pricing_type,target_audience,launch_date,status,views,favorites_count,rating_avg,rating_count,features,use_cases,id,created_date,updated_date,created_by_id,created_by,is_sample
"ChatGPT","Conversational AI that understands and generates human-like text","ChatGPT is an advanced language model that can engage in conversations, answer questions, write content, and assist with various tasks through natural language interaction.","https://chat.openai.com","https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop","chatbots","[""conversation"",""text-generation"",""ai-assistant""]","Freemium","[""Developers"",""Writers"",""Students"",""Businesses""]","2022-11-30","featured","15420","0","4.8","1250","[""Natural conversations"",""Code generation"",""Creative writing"",""Problem solving""]","[""Content creation"",""Customer support"",""Education"",""Programming help""]","6906f4deda066f643ce50586","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Midjourney","AI art generator creating stunning images from text descriptions","Midjourney is a powerful AI art generator that transforms text prompts into beautiful, high-quality images. Perfect for artists, designers, and creators.","https://midjourney.com","https://images.unsplash.com/photo-1686191128892-c15d826f5c50?w=200&h=200&fit=crop","image-generation","[""art"",""design"",""creative"",""images""]","Paid","[""Designers"",""Artists"",""Marketers""]","2022-07-12","featured","12300","0","4.7","980","[""High-quality images"",""Multiple art styles"",""Upscaling"",""Variations""]","[""Digital art"",""Marketing materials"",""Concept design"",""Illustrations""]","6906f4deda066f643ce50587","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"GitHub Copilot","Your AI pair programmer","GitHub Copilot is an AI coding assistant that helps you write code faster by suggesting whole lines or blocks of code as you type.","https://github.com/features/copilot","https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=200&h=200&fit=crop","code-assistants","[""coding"",""programming"",""development"",""github""]","Freemium","[""Developers""]","2021-10-29","approved","18901","0","4.6","2100","[""Code completion"",""Multi-language support"",""Context-aware suggestions"",""IDE integration""]","[""Software development"",""Learning to code"",""Debugging"",""Code refactoring""]","6906f4deda066f643ce50588","2025-11-02T06:06:22.226000","2025-11-02T06:18:54.504000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Runway ML","AI-powered creative suite for video editing","Runway ML brings AI tools to video editing, allowing creators to generate, edit, and enhance videos with cutting-edge machine learning models.","https://runwayml.com","https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop","video-tools","[""video-editing"",""creative"",""ai-video""]","Freemium","[""Designers"",""Marketers"",""Content Creators""]","2023-03-20","featured","8700","0","4.5","650","[""Text-to-video"",""Green screen"",""Object removal"",""Style transfer""]","[""Video production"",""Social media content"",""Film editing"",""Marketing videos""]","6906f4deda066f643ce50589","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Jasper AI","AI content platform for businesses","Jasper is an AI writing assistant designed for businesses, marketers, and content creators to produce high-quality content at scale.","https://jasper.ai","https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=200&h=200&fit=crop","ai-writing","[""content"",""marketing"",""copywriting"",""business""]","Paid","[""Marketers"",""Writers"",""Businesses""]","2021-02-01","approved","11201","0","4.4","890","[""Brand voice"",""Templates"",""SEO optimization"",""Multi-language""]","[""Blog writing"",""Ad copy"",""Social media posts"",""Email campaigns""]","6906f4deda066f643ce5058a","2025-11-02T06:06:22.226000","2025-11-02T06:19:13.927000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Figma AI","Design tool with AI-powered features","Figma's AI capabilities help designers work faster with intelligent suggestions, auto-layout improvements, and design generation.","https://figma.com","https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&h=200&fit=crop","design-tools","[""ui-design"",""prototyping"",""collaboration"",""design""]","Freemium","[""Designers"",""Developers""]","2023-06-21","approved","20100","0","4.8","1500","[""AI design suggestions"",""Auto-layout"",""Component variants"",""Real-time collaboration""]","[""UI/UX design"",""Prototyping"",""Design systems"",""Wireframing""]","6906f4deda066f643ce5058b","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"ElevenLabs","AI voice generator with realistic speech","ElevenLabs offers cutting-edge AI voice synthesis technology that creates incredibly realistic and expressive voice overs in multiple languages.","https://elevenlabs.io","https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=200&fit=crop","audio-tools","[""voice"",""tts"",""audio"",""speech""]","Freemium","[""Content Creators"",""Developers"",""Businesses""]","2022-09-15","approved","9500","0","4.7","720","[""Voice cloning"",""Multiple languages"",""Emotional control"",""High-quality output""]","[""Audiobooks"",""Podcasts"",""Video narration"",""Accessibility""]","6906f4deda066f643ce5058c","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Notion AI","AI assistant built into your workspace","Notion AI helps you write, brainstorm, edit, summarize, and more, all within your Notion workspace.","https://notion.so/product/ai","https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop","productivity","[""productivity"",""note-taking"",""ai-assistant"",""workspace""]","Freemium","[""Students"",""Businesses"",""Writers""]","2023-02-22","featured","14600","0","4.6","1100","[""AI writing"",""Summarization"",""Translation"",""Q&A""]","[""Note-taking"",""Project management"",""Documentation"",""Knowledge base""]","6906f4deda066f643ce5058d","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Stable Diffusion","Open-source AI image generation","Stable Diffusion is an open-source AI model that generates detailed images from text descriptions, offering full control and customization.","https://stability.ai","https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop","image-generation","[""open-source"",""image-generation"",""ai-art""]","Open Source","[""Developers"",""Designers"",""Artists""]","2022-08-22","approved","16801","0","4.5","1350","[""Open-source"",""Local deployment"",""Customizable"",""Free to use""]","[""Art creation"",""Game assets"",""Product visualization"",""Experimentation""]","6906f4deda066f643ce5058e","2025-11-02T06:06:22.226000","2025-11-02T06:19:39.635000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Grammarly","AI-powered writing assistant","Grammarly uses AI to help you write clearly and mistake-free, with real-time grammar, spelling, and style suggestions.","https://grammarly.com","https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop","ai-writing","[""writing"",""grammar"",""editing"",""productivity""]","Freemium","[""Writers"",""Students"",""Businesses""]","2009-07-01","approved","22500","0","4.5","2800","[""Grammar checking"",""Tone detection"",""Plagiarism detection"",""Writing suggestions""]","[""Email writing"",""Academic writing"",""Professional documents"",""Content creation""]","6906f4deda066f643ce5058f","2025-11-02T06:06:22.226000","2025-11-02T06:06:22.226000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Copy.ai","AI-powered copywriting tool for marketing content","Copy.ai helps marketers and businesses create compelling copy for ads, social media, blogs, and more using advanced AI technology.","https://copy.ai","https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop","ai-writing","[""copywriting"",""marketing"",""content""]","Freemium","[""Marketers"",""Businesses"",""Writers""]","2020-10-01","approved","7800","0","4.3","450","[""90+ templates"",""Multi-language support"",""Brand voice"",""Team collaboration""]","[""Social media posts"",""Email campaigns"",""Product descriptions"",""Blog posts""]","6906f866794f6d47834b7875","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Writesonic","AI writer for SEO-optimized content","Writesonic is an AI writing assistant that helps create SEO-optimized articles, blog posts, ads, and landing pages in seconds.","https://writesonic.com","https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=200&h=200&fit=crop","ai-writing","[""seo"",""content"",""blogging""]","Freemium","[""Content Creators"",""Marketers"",""Bloggers""]","2021-03-15","approved","9200","0","4.4","680","[""SEO optimization"",""AI article writer"",""Landing page generator"",""Paraphrasing tool""]","[""Blog writing"",""SEO content"",""Ad copy"",""Product descriptions""]","6906f866794f6d47834b7876","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Rytr","AI writing assistant for all your content needs","Rytr is an AI writing assistant that helps you create high-quality content in just a few seconds, at a fraction of the cost.","https://rytr.me","https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&h=200&fit=crop","ai-writing","[""writing"",""content"",""productivity""]","Freemium","[""Writers"",""Students"",""Marketers""]","2021-04-20","approved","6500","0","4.2","520","[""40+ use cases"",""30+ languages"",""Plagiarism checker"",""Tone customization""]","[""Emails"",""Blog posts"",""Social media"",""Product descriptions""]","6906f866794f6d47834b7877","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"QuillBot","Paraphrasing and grammar checking AI tool","QuillBot is an AI-powered paraphrasing tool that helps you rewrite and enhance your writing with better clarity and style.","https://quillbot.com","https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=200&h=200&fit=crop","ai-writing","[""paraphrasing"",""grammar"",""writing""]","Freemium","[""Students"",""Writers"",""Researchers""]","2017-08-01","approved","15600","0","4.5","1200","[""Paraphraser"",""Grammar checker"",""Summarizer"",""Citation generator""]","[""Academic writing"",""Content rewriting"",""Grammar checking"",""Summarization""]","6906f866794f6d47834b7878","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"DALL-E 2","OpenAI's advanced AI image generator","DALL-E 2 creates realistic images and art from text descriptions, combining concepts, attributes, and styles.","https://openai.com/dall-e-2","https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=200&h=200&fit=crop","image-generation","[""ai-art"",""image-generation"",""openai""]","Paid","[""Artists"",""Designers"",""Content Creators""]","2022-04-06","featured","14200","0","4.6","890","[""Text-to-image"",""Inpainting"",""Outpainting"",""High resolution""]","[""Digital art"",""Product mockups"",""Concept design"",""Marketing visuals""]","6906f866794f6d47834b7879","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Leonardo.ai","AI art generator for game assets and creative projects","Leonardo.ai is a powerful AI image generator designed for creating game assets, concept art, and digital illustrations with precision control.","https://leonardo.ai","https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop","image-generation","[""game-art"",""concept-art"",""ai-generation""]","Freemium","[""Game Developers"",""Artists"",""Designers""]","2022-11-15","approved","10400","0","4.5","720","[""Style control"",""Batch generation"",""AI canvas"",""Asset library""]","[""Game assets"",""Character design"",""Environment art"",""Concept art""]","6906f866794f6d47834b787a","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Artbreeder","Collaborative AI art creation platform","Artbreeder allows you to create and remix images using AI, collaborating with others to make unique portraits, landscapes, and more.","https://artbreeder.com","https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=200&h=200&fit=crop","image-generation","[""collaborative"",""art"",""portraits""]","Freemium","[""Artists"",""Designers""]","2018-12-01","approved","8900","0","4.3","540","[""Image mixing"",""Gene editing"",""High-resolution downloads"",""Community gallery""]","[""Portrait creation"",""Landscape design"",""Character development"",""Art exploration""]","6906f866794f6d47834b787b","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Tabnine","AI code completion for all languages","Tabnine is an AI code assistant that provides intelligent code completions based on your code patterns and best practices.","https://tabnine.com","https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop","code-assistants","[""coding"",""autocomplete"",""productivity""]","Freemium","[""Developers""]","2018-06-01","approved","11200","0","4.4","980","[""All languages support"",""Local model"",""Team learning"",""IDE integration""]","[""Code completion"",""Code generation"",""Refactoring"",""Learning""]","6906f866794f6d47834b787c","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Codeium","Free AI-powered code acceleration","Codeium offers AI-powered code completion, search, and chat features completely free for individual developers.","https://codeium.com","https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=200&h=200&fit=crop","code-assistants","[""coding"",""free"",""ai-assistant""]","Free","[""Developers""]","2022-09-20","approved","13400","0","4.5","1100","[""70+ languages"",""AI chat"",""Code search"",""Always free""]","[""Code completion"",""Bug fixing"",""Code explanation"",""Documentation""]","6906f866794f6d47834b787d","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Replit Ghostwriter","AI pair programmer in your browser","Replit Ghostwriter is an AI coding assistant built into the Replit IDE, helping you code faster with intelligent suggestions.","https://replit.com/ghostwriter","https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop","code-assistants","[""coding"",""browser-ide"",""collaboration""]","Freemium","[""Developers"",""Students""]","2022-05-10","approved","9100","0","4.3","670","[""Code completion"",""Code explanation"",""Transform code"",""Generate code""]","[""Learning to code"",""Rapid prototyping"",""Code generation"",""Debugging""]","6906f866794f6d47834b787e","2025-11-02T06:21:26.007000","2025-11-02T06:21:26.007000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Descript","All-in-one video and podcast editing","Descript combines video editing, podcasting, screen recording, and transcription into one powerful AI-powered tool.","https://descript.com","https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=200&h=200&fit=crop","video-tools","[""video-editing"",""podcasting"",""transcription""]","Freemium","[""Content Creators"",""Podcasters"",""Video Editors""]","2017-01-01","featured","16800","0","4.7","1250","[""Text-based editing"",""AI voice cloning"",""Screen recording"",""Automatic transcription""]","[""Podcast editing"",""Video production"",""Screen recording"",""Transcription""]","6906f891794f6d47834b7899","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Pictory","Turn text into engaging videos automatically","Pictory uses AI to create short, branded videos from long-form content automatically, perfect for social media and marketing.","https://pictory.ai","https://images.unsplash.com/photo-1536240478700-b869070f9279?w=200&h=200&fit=crop","video-tools","[""video-creation"",""text-to-video"",""marketing""]","Freemium","[""Marketers"",""Content Creators""]","2021-07-01","approved","9500","0","4.4","680","[""Text to video"",""Auto-captions"",""Video summarization"",""Stock library""]","[""Social media videos"",""Marketing content"",""Blog to video"",""Video highlights""]","6906f891794f6d47834b789a","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Synthesia","Create AI videos with digital avatars","Synthesia allows you to create professional videos with AI avatars and voiceovers in minutes, without cameras or actors.","https://synthesia.io","https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop","video-tools","[""ai-avatars"",""video-creation"",""voiceover""]","Paid","[""Businesses"",""Educators"",""Marketers""]","2020-01-15","approved","12600","0","4.5","890","[""140+ AI avatars"",""120+ languages"",""Custom avatars"",""Video templates""]","[""Training videos"",""Marketing videos"",""E-learning"",""Corporate communications""]","6906f891794f6d47834b789b","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Canva","Design anything with AI-powered tools","Canva is a versatile design platform with AI features for creating graphics, presentations, videos, and more.","https://canva.com","https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop","design-tools","[""graphic-design"",""presentations"",""templates""]","Freemium","[""Designers"",""Marketers"",""Students""]","2013-01-01","featured","45200","0","4.7","5600","[""Magic Design"",""Background remover"",""100M+ templates"",""Team collaboration""]","[""Social media graphics"",""Presentations"",""Marketing materials"",""Branding""]","6906f891794f6d47834b789c","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Adobe Firefly","Adobe's generative AI for creative workflows","Adobe Firefly brings generative AI directly into Adobe's creative tools for text-to-image, generative fill, and more.","https://firefly.adobe.com","https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=200&h=200&fit=crop","design-tools","[""generative-ai"",""adobe"",""creative""]","Freemium","[""Designers"",""Artists""]","2023-03-21","featured","18900","0","4.6","980","[""Text to image"",""Generative fill"",""Text effects"",""Adobe integration""]","[""Photo editing"",""Graphic design"",""Digital art"",""Marketing assets""]","6906f891794f6d47834b789d","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Uizard","AI-powered UI design tool","Uizard transforms sketches and screenshots into editable UI designs using AI, accelerating the design process.","https://uizard.io","https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&h=200&fit=crop","design-tools","[""ui-design"",""prototyping"",""wireframing""]","Freemium","[""Designers"",""Product Managers"",""Developers""]","2018-10-01","approved","7800","0","4.3","450","[""Sketch to design"",""Screenshot to mockup"",""AI design assistant"",""Collaboration""]","[""UI mockups"",""Wireframing"",""Prototyping"",""Design systems""]","6906f891794f6d47834b789e","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Claude","Anthropic's helpful, harmless, and honest AI assistant","Claude is a next-generation AI assistant built by Anthropic for safe, accurate, and helpful conversations.","https://claude.ai","https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=200&h=200&fit=crop","chatbots","[""ai-assistant"",""conversation"",""anthropic""]","Freemium","[""Everyone""]","2023-03-14","featured","28400","0","4.8","2100","[""100K context window"",""Document analysis"",""Code generation"",""Safe responses""]","[""Research"",""Writing"",""Analysis"",""Coding help""]","6906f891794f6d47834b789f","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Perplexity AI","AI-powered answer engine","Perplexity AI combines search and AI to give you accurate, sourced answers to your questions instantly.","https://perplexity.ai","https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=200&h=200&fit=crop","chatbots","[""search"",""ai-answers"",""research""]","Freemium","[""Researchers"",""Students"",""Professionals""]","2022-12-07","approved","19800","0","4.6","1450","[""Source citations"",""Follow-up questions"",""Multiple AI models"",""Search integration""]","[""Research"",""Fact-checking"",""Learning"",""Q&A""]","6906f891794f6d47834b78a0","2025-11-02T06:22:09.852000","2025-11-02T06:22:09.852000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Character.AI","Create and chat with AI characters","Character.AI lets you create and interact with AI characters for entertainment, learning, and creative exploration.","https://character.ai","https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200&h=200&fit=crop","chatbots","[""entertainment"",""roleplay"",""creative""]","Free","[""Everyone""]","2022-09-16","approved","38600","0","4.5","3200","[""Custom characters"",""Group chats"",""Voice calls"",""Character creation""]","[""Entertainment"",""Creative writing"",""Learning"",""Roleplay""]","6906f891794f6d47834b78a1","2025-11-02T06:22:09.853000","2025-11-02T06:22:09.853000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Murf AI","AI voice generator for professional voiceovers","Murf AI creates studio-quality voiceovers with AI voices for videos, presentations, and e-learning content.","https://murf.ai","https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop","audio-tools","[""voice-synthesis"",""tts"",""voiceover""]","Freemium","[""Content Creators"",""Educators"",""Marketers""]","2020-08-01","approved","11200","0","4.5","780","[""120+ voices"",""20+ languages"",""Voice cloning"",""Voice customization""]","[""Video voiceovers"",""Presentations"",""E-learning"",""Audiobooks""]","6906f891794f6d47834b78a2","2025-11-02T06:22:09.853000","2025-11-02T06:22:09.853000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Play.ht","Realistic AI text-to-speech generator","Play.ht converts text into natural-sounding speech with ultra-realistic AI voices in multiple languages and accents.","https://play.ht","https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=200&h=200&fit=crop","audio-tools","[""text-to-speech"",""voiceover"",""audio""]","Freemium","[""Content Creators"",""Podcasters""]","2016-06-01","approved","8900","0","4.4","650","[""800+ voices"",""Multi-language"",""Voice cloning"",""API access""]","[""Podcasts"",""YouTube videos"",""IVR systems"",""Audiobooks""]","6906f8b7794f6d47834b78ab","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Suno AI","Create music and songs with AI","Suno AI generates complete songs with vocals and instrumentals from text descriptions, revolutionizing music creation.","https://suno.ai","https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop","audio-tools","[""music-generation"",""ai-music"",""creative""]","Freemium","[""Musicians"",""Content Creators""]","2023-05-01","featured","19500","0","4.7","1200","[""Full song generation"",""Multiple genres"",""Custom lyrics"",""Commercial use""]","[""Music creation"",""Background music"",""Song ideas"",""Content soundtracks""]","6906f8b7794f6d47834b78ac","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"ClickUp","All-in-one productivity platform with AI","ClickUp combines tasks, docs, goals, and chat with AI-powered features to boost team productivity.","https://clickup.com","https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop","productivity","[""project-management"",""collaboration"",""tasks""]","Freemium","[""Teams"",""Businesses"",""Project Managers""]","2017-01-01","approved","32100","0","4.6","3400","[""AI writing"",""Task automation"",""Custom views"",""Time tracking""]","[""Project management"",""Task tracking"",""Team collaboration"",""Documentation""]","6906f8b7794f6d47834b78ad","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Zapier","Automate workflows between your apps","Zapier connects your apps and automates workflows, now with AI-powered automation suggestions and natural language processing.","https://zapier.com","https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop","productivity","[""automation"",""integration"",""workflow""]","Freemium","[""Businesses"",""Marketers"",""Developers""]","2011-10-01","approved","28900","0","4.5","2800","[""5000+ app integrations"",""AI automation"",""Custom workflows"",""No-code""]","[""Workflow automation"",""Data syncing"",""Lead management"",""Task automation""]","6906f8b7794f6d47834b78ae","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Otter.ai","AI meeting assistant and transcription","Otter.ai provides real-time transcription and AI-powered meeting summaries, making meetings more productive.","https://otter.ai","https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop","productivity","[""transcription"",""meetings"",""notes""]","Freemium","[""Professionals"",""Students"",""Teams""]","2016-04-01","approved","21400","0","4.6","1900","[""Real-time transcription"",""Meeting summaries"",""Speaker identification"",""Collaboration""]","[""Meeting notes"",""Interviews"",""Lectures"",""Podcasts""]","6906f8b7794f6d47834b78af","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Tome","AI-powered storytelling and presentations","Tome uses AI to help you create compelling presentations and narratives with stunning visuals and layouts.","https://tome.app","https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop","productivity","[""presentations"",""storytelling"",""ai-design""]","Freemium","[""Professionals"",""Educators"",""Marketers""]","2022-09-20","featured","12700","0","4.5","890","[""AI content generation"",""Smart layouts"",""DALL-E integration"",""Collaboration""]","[""Presentations"",""Pitch decks"",""Reports"",""Storytelling""]","6906f8b7794f6d47834b78b0","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Fireflies.ai","AI assistant for meetings and transcription","Fireflies.ai records, transcribes, and analyzes voice conversations automatically across multiple platforms.","https://fireflies.ai","https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop","productivity","[""meetings"",""transcription"",""ai-assistant""]","Freemium","[""Teams"",""Sales"",""Professionals""]","2016-11-01","approved","16800","0","4.5","1450","[""Auto-join meetings"",""AI summaries"",""Action items"",""CRM integration""]","[""Sales calls"",""Team meetings"",""Interviews"",""Customer calls""]","6906f8b7794f6d47834b78b1","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Beautiful.ai","AI-powered presentation software","Beautiful.ai creates stunning presentations automatically with smart templates and design AI.","https://beautiful.ai","https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop","productivity","[""presentations"",""design"",""templates""]","Freemium","[""Professionals"",""Teams"",""Marketers""]","2017-04-01","approved","11200","0","4.4","780","[""Smart templates"",""Auto-formatting"",""Team collaboration"",""Analytics""]","[""Business presentations"",""Pitch decks"",""Reports"",""Proposals""]","6906f8b7794f6d47834b78b2","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Pika Labs","AI video generation from text and images","Pika Labs creates and edits videos using AI, transforming static images and text into dynamic video content.","https://pika.art","https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop","video-tools","[""video-generation"",""ai-video"",""creative""]","Freemium","[""Content Creators"",""Marketers""]","2023-04-25","featured","14200","0","4.6","890","[""Text to video"",""Image animation"",""Video effects"",""3D animation""]","[""Social media content"",""Marketing videos"",""Animation"",""Creative projects""]","6906f8b7794f6d47834b78b3","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"HeyGen","Create videos with AI avatars instantly","HeyGen makes video creation easy with AI-powered avatars, voices, and templates for professional content.","https://heygen.com","https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop","video-tools","[""ai-avatars"",""video-creation"",""marketing""]","Freemium","[""Marketers"",""Educators"",""Businesses""]","2020-06-01","approved","15600","0","4.5","1100","[""100+ avatars"",""40+ languages"",""Custom avatars"",""Video templates""]","[""Marketing videos"",""Training content"",""Social media"",""Sales videos""]","6906f8b7794f6d47834b78b4","2025-11-02T06:22:47.936000","2025-11-02T06:22:47.936000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Voicemod","Real-time voice changer and soundboard","Voicemod provides real-time voice changing technology for gaming, streaming, and content creation with AI-powered effects.","https://voicemod.net","https://images.unsplash.com/photo-1590602846989-e99596d2a6ee?w=200&h=200&fit=crop","audio-tools","[""voice-changer"",""streaming"",""gaming""]","Freemium","[""Gamers"",""Streamers"",""Content Creators""]","2014-03-01","approved","18700","0","4.3","2100","[""100+ voice effects"",""Soundboard"",""Real-time"",""App integration""]","[""Gaming"",""Streaming"",""Online meetings"",""Content creation""]","6906f8de794f6d47834b78bf","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Soundraw","AI music generator for creators","Soundraw creates royalty-free music using AI, perfect for videos, podcasts, and commercial projects.","https://soundraw.io","https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop","audio-tools","[""music-generation"",""royalty-free"",""background-music""]","Freemium","[""Content Creators"",""Video Editors""]","2020-01-01","approved","9800","0","4.4","650","[""Unlimited music"",""Customizable"",""Commercial license"",""No copyright""]","[""YouTube videos"",""Podcasts"",""Ads"",""Games""]","6906f8de794f6d47834b78c0","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Mem","AI-powered note-taking and knowledge management","Mem uses AI to help you capture, organize, and retrieve information effortlessly from your notes.","https://mem.ai","https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&h=200&fit=crop","productivity","[""notes"",""knowledge-management"",""ai-assistant""]","Freemium","[""Professionals"",""Researchers""]","2021-05-01","approved","8400","0","4.3","520","[""AI search"",""Auto-tagging"",""Smart connections"",""Calendar integration""]","[""Note-taking"",""Knowledge base"",""Research"",""Meeting notes""]","6906f8de794f6d47834b78c1","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Motion","AI-powered calendar and project management","Motion uses AI to automatically plan your day, manage tasks, and schedule meetings for maximum productivity.","https://usemotion.com","https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop","productivity","[""calendar"",""task-management"",""scheduling""]","Paid","[""Professionals"",""Teams""]","2019-06-01","approved","12300","0","4.6","890","[""AI scheduling"",""Task automation"",""Calendar optimization"",""Meeting booking""]","[""Time management"",""Task planning"",""Meeting scheduling"",""Productivity""]","6906f8de794f6d47834b78c2","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Krisp","AI-powered noise cancellation","Krisp removes background noise and echo from your calls using AI, ensuring crystal-clear communication.","https://krisp.ai","https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop","audio-tools","[""noise-cancellation"",""audio"",""meetings""]","Freemium","[""Professionals"",""Remote Workers""]","2017-11-01","approved","19400","0","4.7","1800","[""Noise cancellation"",""Echo removal"",""Voice clarity"",""Works with any app""]","[""Video calls"",""Podcasting"",""Recording"",""Online meetings""]","6906f8de794f6d47834b78c3","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Lumen5","Turn content into engaging videos","Lumen5 uses AI to transform blog posts and articles into engaging video content for social media.","https://lumen5.com","https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=200&h=200&fit=crop","video-tools","[""video-creation"",""content-marketing"",""social-media""]","Freemium","[""Marketers"",""Content Creators""]","2017-02-01","approved","14800","0","4.4","1250","[""AI video creation"",""Stock media library"",""Brand customization"",""Auto-captions""]","[""Social media videos"",""Blog to video"",""Marketing content"",""News videos""]","6906f8de794f6d47834b78c4","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Intercom","AI-powered customer service platform","Intercom combines AI chatbots with human support for seamless customer communication and support.","https://intercom.com","https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop","chatbots","[""customer-service"",""support"",""business""]","Paid","[""Businesses"",""Support Teams""]","2011-08-01","approved","28900","0","4.5","2400","[""AI chatbot"",""Live chat"",""Help desk"",""Customer data""]","[""Customer support"",""Sales"",""Product tours"",""User onboarding""]","6906f8de794f6d47834b78c5","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Drift","Conversational AI for sales and marketing","Drift uses AI-powered chatbots to qualify leads, book meetings, and accelerate your sales pipeline.","https://drift.com","https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop","chatbots","[""sales"",""marketing"",""lead-generation""]","Paid","[""Sales Teams"",""Marketers""]","2015-09-01","approved","19800","0","4.4","1650","[""Conversational AI"",""Meeting booking"",""Lead routing"",""CRM integration""]","[""Lead qualification"",""Sales automation"",""Customer engagement"",""Meeting scheduling""]","6906f8de794f6d47834b78c6","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Tidio","AI chatbot and live chat for customer service","Tidio combines AI chatbots with live chat to automate customer service and boost conversions.","https://tidio.com","https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=200&h=200&fit=crop","chatbots","[""customer-service"",""live-chat"",""automation""]","Freemium","[""E-commerce"",""Small Businesses""]","2013-01-01","approved","24500","0","4.6","3200","[""AI chatbot"",""Live chat"",""Email integration"",""Mobile app""]","[""Customer support"",""E-commerce"",""Lead generation"",""Sales""]","6906f8de794f6d47834b78c7","2025-11-02T06:23:26.938000","2025-11-02T06:23:26.938000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Craiyon","Free AI image generator (formerly DALL-E mini)","Craiyon is a free AI image generator that creates images from text prompts, accessible to everyone.","https://craiyon.com","https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop","image-generation","[""free"",""ai-art"",""text-to-image""]","Free","[""Everyone""]","2022-04-01","approved","32401","0","4.1","2800","[""Free generation"",""No signup required"",""Multiple styles"",""Quick results""]","[""Casual art creation"",""Memes"",""Experimentation"",""Fun projects""]","6906f8de794f6d47834b78c8","2025-11-02T06:23:26.938000","2025-11-02T06:39:39.985000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"`;

const categoriesCsv = `name,slug,description,icon,color,tool_count,id,created_date,updated_date,created_by_id,created_by,is_sample
"AI Writing","ai-writing","Text generation, copywriting, and content creation tools","FileText","#3b82f6","0","6906f4deda066f643ce5057e","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Image Generation","image-generation","AI-powered image creation and editing tools","Image","#8b5cf6","0","6906f4deda066f643ce5057f","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Code Assistants","code-assistants","Programming help, code completion, and debugging","Code","#10b981","0","6906f4deda066f643ce50580","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Video Tools","video-tools","Video editing, generation, and enhancement","Video","#f59e0b","0","6906f4deda066f643ce50581","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Design Tools","design-tools","UI/UX design, graphic design, and creative tools","Palette","#ec4899","0","6906f4deda066f643ce50582","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Chatbots","chatbots","Conversational AI and virtual assistants","MessageSquare","#06b6d4","0","6906f4deda066f643ce50583","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Audio Tools","audio-tools","Music generation, voice synthesis, and audio editing","Music","#f97316","0","6906f4deda066f643ce50584","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"
"Productivity","productivity","Task management, automation, and workflow tools","Sparkles","#eab308","0","6906f4deda066f643ce50585","2025-11-02T06:06:22.183000","2025-11-02T06:06:22.183000","6906f31bc2fa6a1e605f5361","manojkumartpt15@gmail.com","false"`;


// --- UTILS ---
const parseCsv = (csvText: string) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    // This is a simple parser, doesn't handle commas inside quotes well.
    // A more robust solution would use a regex or state machine.
    const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    for (let j = 0; j < headers.length; j++) {
      let value: any = values[j]?.replace(/^"|"$/g, '').replace(/""/g, '"') || '';
      const header = headers[j];

      // Type conversion
      if (['views', 'favorites_count', 'rating_count', 'tool_count', 'helpful_count', 'replies_count', 'upvotes'].includes(header)) {
        value = parseInt(value, 10) || 0;
      } else if (['rating_avg'].includes(header)) {
        value = parseFloat(value) || 0;
      } else if (['is_sample', 'verified_user', 'is_pinned', 'is_solution'].includes(header)) {
        value = value === 'true';
      } else if (['tags', 'features', 'use_cases', 'target_audience'].includes(header) && value.startsWith('[')) {
        try {
          value = JSON.parse(value.replace(/""/g, '"'));
        } catch (e) {
          value = [];
        }
      }
      obj[header] = value;
    }
    result.push(obj);
  }
  return result;
};

// --- IN-MEMORY DATABASE ---
let db = {
  Tool: parseCsv(toolsCsv),
  Category: parseCsv(categoriesCsv),
  Review: [],
  Favorite: [],
  Discussion: [],
  Reply: [],
};

// Add tool_count to categories
db.Category.forEach(cat => {
  cat.tool_count = db.Tool.filter(t => t.category === cat.slug).length;
});

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// --- MOCK CLIENT ---
class MockEntity {
  private entityName: keyof typeof db;

  constructor(name: keyof typeof db) {
    this.entityName = name;
  }

  async list(sort?: string, limit?: number) {
    await delay(100);
    let data = [...db[this.entityName]];
    if (sort) {
      const isDescending = sort.startsWith('-');
      const key = isDescending ? sort.substring(1) : sort;
      data.sort((a, b) => {
        if (a[key] < b[key]) return isDescending ? 1 : -1;
        if (a[key] > b[key]) return isDescending ? -1 : 1;
        return 0;
      });
    }
    return limit ? data.slice(0, limit) : data;
  }
  
  async filter(filters: any, sort?: string, limit?: number) {
    await delay(150);
    let data = db[this.entityName].filter(item => {
      for (const key in filters) {
        if (item[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
     if (sort) {
      const isDescending = sort.startsWith('-');
      const key = isDescending ? sort.substring(1) : sort;
      data.sort((a, b) => {
        if (a[key] < b[key]) return isDescending ? 1 : -1;
        if (a[key] > b[key]) return isDescending ? -1 : 1;
        return 0;
      });
    }
    return limit ? data.slice(0, limit) : data;
  }

  async create(data: any) {
    await delay(200);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const newItem = {
      ...data,
      id: generateId(),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
      created_by: user?.email,
    };
    db[this.entityName].push(newItem);
    return newItem;
  }

  async update(id: string, data: any) {
    await delay(200);
    const index = db[this.entityName].findIndex(item => item.id === id);
    if (index !== -1) {
      db[this.entityName][index] = { ...db[this.entityName][index], ...data, updated_date: new Date().toISOString() };
      return db[this.entityName][index];
    }
    throw new Error("Not found");
  }

  async delete(id: string) {
    await delay(200);
    const initialLength = db[this.entityName].length;
    db[this.entityName] = db[this.entityName].filter(item => item.id !== id);
    if (db[this.entityName].length === initialLength) {
        throw new Error("Not found");
    }
    return { success: true };
  }
}

const mockAuth = {
    async me() {
        await delay(50);
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return Promise.reject("Not logged in");
    },
    redirectToLogin() {
        // In a real app, this would redirect. Here, we'll simulate it.
        const email = prompt("You are not logged in. Enter your email to simulate login:");
        if (email) {
            const user = { email: email, full_name: email.split('@')[0] };
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
        }
    },
    logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }
}

const mockIntegrations = {
    Core: {
        async InvokeLLM(params: { prompt: string; add_context_from_internet: boolean }) {
            await delay(1500);
            return `This is an AI-generated response based on your query: "${params.prompt.split('\n').pop()}". I analyzed the provided tool data and found some recommendations for you.

*   **ChatGPT**: Great for general conversation and text generation. It's a freemium tool.
*   **Midjourney**: Perfect for creating stunning AI art from text prompts. This is a paid tool.
*   **GitHub Copilot**: An essential tool for developers, offering AI-powered code completion.

I hope this helps you find the perfect tool!`;
        }
    }
}

export const base44 = {
    entities: {
        Tool: new MockEntity('Tool'),
        Category: new MockEntity('Category'),
        Review: new MockEntity('Review'),
        Favorite: new MockEntity('Favorite'),
        Discussion: new MockEntity('Discussion'),
        Reply: new MockEntity('Reply'),
    },
    auth: mockAuth,
    integrations: mockIntegrations,
};

// Initialize some mock data
if (db.Discussion.length === 0) {
    const discussionCategories = ['General', 'Tool Discovery', 'AI Trends', 'Feature Requests', 'Help & Support'];
    for(let i=0; i<15; i++) {
        db.Discussion.push({
            id: generateId(),
            title: `Discussion topic #${i + 1}: Let's talk about AI`,
            content: `This is the content for discussion #${i + 1}. It's a great place to share ideas and ask questions about the amazing world of AI tools and technologies. What are your thoughts?`,
            category: discussionCategories[i % discussionCategories.length],
            tags: ['ai', 'discussion', `topic${i}`],
            replies_count: Math.floor(Math.random() * 20),
            views: Math.floor(Math.random() * 500),
            is_pinned: i < 2,
            upvotes: Math.floor(Math.random() * 100),
            created_date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user@example.com'
        })
    }
}
