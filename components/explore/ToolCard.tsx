
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Badge } from "../ui/badge";

const ToolCard: React.FC<{ tool: any }> = ({ tool }) => {
    const { Star, Heart, ExternalLink, Eye } = window.lucide;
    const { motion } = window.framer;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Link to={createPageUrl(`ToolDetail?id=${tool.id}`)} className="glass-effect rounded-xl p-5 transition-all duration-300 block h-full border border-white/10 hover:border-blue-500/30 group">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                        {tool.logo_url ? <img src={tool.logo_url} alt={tool.name} className="w-12 h-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"/> : <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110">{tool.name[0]}</div>}
                        <div className="flex-1 min-w-0"><h3 className="font-bold text-white group-hover:text-blue-400 transition-colors truncate">{tool.name}</h3><p className="text-xs text-gray-500">{tool.category}</p></div>
                    </div>
                    <Heart className="w-5 h-5 text-gray-500 hover:text-red-400 hover:scale-110 transition-all cursor-pointer flex-shrink-0" />
                </div>
                
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 h-16">{tool.tagline || tool.description}</p>
                
                {Array.isArray(tool.tags) && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4 h-6 overflow-hidden">
                        {tool.tags.slice(0, 3).map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20">{tag}</Badge>
                        ))}
                    </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        {tool.rating_avg > 0 && <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span>{tool.rating_avg.toFixed(1)}</span></div>}
                        <div className="flex items-center gap-1"><Eye className="w-4 h-4" /><span>{tool.views || 0}</span></div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                </div>
            </Link>
        </motion.div>
    );
};
export default ToolCard;
