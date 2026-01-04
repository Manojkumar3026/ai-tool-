
import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ToolDetail: React.FC = () => {
    const { ExternalLink, Heart, Star, Eye, Calendar, DollarSign, Users, Sparkles, ArrowLeft, CheckCircle, MessageSquare } = window.lucide;
    const { useQuery, useMutation, useQueryClient } = window.ReactQuery;
    const { useLocation } = window.ReactRouterDOM;
    const { formatDistanceToNow } = window.dateFns;

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const toolId = urlParams.get('id');

    const [user, setUser] = useState<any>(null);
    const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '' });
    const [showIframe, setShowIframe] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => setUser(null));
    }, []);

    const { data: tool, isLoading } = useQuery({
        queryKey: ['tool', toolId],
        queryFn: async () => {
            const tools = await base44.entities.Tool.list();
            const foundTool = tools.find(t => t.id === toolId);
            if (foundTool) {
                // Increment view count optimistically
                base44.entities.Tool.update(toolId, { views: (foundTool.views || 0) + 1 });
            }
            return foundTool;
        },
        enabled: !!toolId,
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', toolId],
        queryFn: () => base44.entities.Review.filter({ tool_id: toolId }, '-created_date'),
        enabled: !!toolId,
    });

    const { data: allTools = [] } = useQuery({
        queryKey: ['all-tools'],
        queryFn: () => base44.entities.Tool.filter({ status: 'approved' }),
    });

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites', user?.email],
        queryFn: () => base44.entities.Favorite.filter({ user_email: user.email }),
        enabled: !!user,
    });

    const createReviewMutation = useMutation({
        mutationFn: (data: any) => base44.entities.Review.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', toolId] });
            setNewReview({ rating: 5, title: '', content: '' });
        },
    });

    const toggleFavoriteMutation = useMutation({
        mutationFn: async () => {
            const existing = favorites.find(f => f.tool_id === toolId);
            if (existing) {
                await base44.entities.Favorite.delete(existing.id);
            } else {
                await base44.entities.Favorite.create({ tool_id: toolId, user_email: user.email });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites', user?.email] });
        },
    });
    
    if (isLoading || !tool) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;
    }

    const isFavorited = favorites.some(f => f.tool_id === toolId);
    const relatedTools = allTools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

    const handleSubmitReview = () => {
        if (!user) { base44.auth.redirectToLogin(); return; }
        if (!newReview.content.trim()) return;
        createReviewMutation.mutate({ tool_id: toolId, user_email: user.email, rating: newReview.rating, title: newReview.title, content: newReview.content });
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to={createPageUrl("Explore")}><Button variant="ghost" className="mb-6 text-gray-400 hover:text-white"><ArrowLeft className="w-4 h-4 mr-2" />Back to Explore</Button></Link>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/10">
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                {tool.logo_url ? <img src={tool.logo_url} alt={tool.name} className="w-24 h-24 rounded-2xl object-cover"/> : <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">{tool.name[0]}</div>}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h1 className="text-4xl font-bold text-white mb-2">{tool.name}</h1>
                                            <p className="text-xl text-gray-400">{tool.tagline}</p>
                                        </div>
                                        <Button variant={isFavorited ? "default" : "outline"} size="icon" onClick={() => toggleFavoriteMutation.mutate()} className={isFavorited ? "bg-red-500 hover:bg-red-600" : "border-white/20"}><Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} /></Button>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-sm text-gray-400">
                                        {tool.rating_avg > 0 && <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white font-semibold">{tool.rating_avg.toFixed(1)}</span><span>({tool.rating_count} reviews)</span></div>}
                                        <div className="flex items-center gap-1"><Eye className="w-4 h-4" /><span>{tool.views || 0} views</span></div>
                                        {tool.launch_date && <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>Launched {new Date(tool.launch_date).getFullYear()}</span></div>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3">
                                {tool.website_url && <a href={tool.website_url} target="_blank" rel="noopener noreferrer"><Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"><ExternalLink className="w-4 h-4 mr-2" />Visit Website</Button></a>}
                                <Button variant="outline" className="border-white/20" onClick={() => setShowIframe(!showIframe)}><Sparkles className="w-4 h-4 mr-2" />Try It Live</Button>
                            </div>
                        </div>

                        {showIframe && (
                            <div className="mb-8"><h2 className="text-2xl font-bold text-white mb-4">Live Preview</h2><iframe src={tool.website_url} className="w-full h-96 rounded-2xl border border-white/10" title={`Live preview of ${tool.name}`}></iframe></div>
                        )}

                        <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">About {tool.name}</h2>
                            <p className="text-gray-300 leading-relaxed">{tool.description}</p>
                        </div>
                        
                        <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {tool.features?.map((feature: string, index: number) => <li key={index} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" /><span className="text-gray-300">{feature}</span></li>)}
                            </ul>
                        </div>

                        <div id="reviews" className="glass-effect rounded-3xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Community Reviews ({reviews.length})</h2>
                            <div className="space-y-6">
                                {reviews.map((review: any) => (
                                    <div key={review.id} className="flex items-start gap-4">
                                        <Avatar><AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">{review.user_email[0].toUpperCase()}</AvatarFallback></Avatar>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-white">{review.title || 'Review'}</h4>
                                                <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />)}</div>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-2">By {review.user_email.split('@')[0]} • {formatDistanceToNow(new Date(review.created_date), { addSuffix: true })}</p>
                                            <p className="text-gray-300">{review.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-gray-400">Rating:</label>
                                        <div className="flex items-center gap-1">{[1,2,3,4,5].map(star => <Star key={star} onClick={() => setNewReview({...newReview, rating: star})} className={`w-5 h-5 cursor-pointer ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`} />)}</div>
                                    </div>
                                    <Textarea value={newReview.content} onChange={e => setNewReview({...newReview, content: e.target.value})} placeholder="Share your experience..." className="bg-white/5 border-white/10 text-white"/>
                                    <Button onClick={handleSubmitReview} disabled={createReviewMutation.isPending} className="bg-gradient-to-r from-blue-500 to-purple-500">{createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <Card className="glass-effect border-white/10 text-white"><CardHeader><CardTitle>Information</CardTitle></CardHeader><CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">Category</span><Badge variant="outline" className="border-blue-500/30 text-blue-400">{tool.category}</Badge></div>
                            <div className="flex justify-between"><span className="text-gray-400">Pricing</span><Badge variant="outline" className={`capitalize ${tool.pricing_type === 'Free' ? 'border-green-500/30 text-green-400' : tool.pricing_type === 'Freemium' ? 'border-purple-500/30 text-purple-400' : 'border-orange-500/30 text-orange-400'}`}>{tool.pricing_type}</Badge></div>
                            <div className="flex justify-between"><span className="text-gray-400">Launch Date</span><span className="font-medium">{tool.launch_date ? new Date(tool.launch_date).toLocaleDateString() : 'N/A'}</span></div>
                        </CardContent></Card>
                        
                        <Card className="glass-effect border-white/10 text-white"><CardHeader><CardTitle>Tags</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{tool.tags?.map((tag: string, i: number) => <Badge key={i} className="bg-white/10">{tag}</Badge>)}</CardContent></Card>
                        
                        {relatedTools.length > 0 && <Card className="glass-effect border-white/10 text-white"><CardHeader><CardTitle>Related Tools</CardTitle></CardHeader><CardContent className="space-y-4">{relatedTools.map((relatedTool: any) => (<Link key={relatedTool.id} to={createPageUrl(`ToolDetail?id=${relatedTool.id}`)} className="flex items-center gap-3 group"><img src={relatedTool.logo_url} className="w-10 h-10 rounded-lg"/><div className="min-w-0"><p className="font-semibold truncate group-hover:text-blue-400">{relatedTool.name}</p><p className="text-xs text-gray-400 truncate">{relatedTool.tagline}</p></div></Link>))}</CardContent></Card>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ToolDetail;
