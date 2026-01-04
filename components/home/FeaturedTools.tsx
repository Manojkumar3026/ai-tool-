
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const FeaturedTools: React.FC<{ tools: any[] }> = ({ tools }) => {
  const { Star, ExternalLink, Heart } = window.lucide;
  const { motion } = window.framer;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            to={createPageUrl(`ToolDetail?id=${tool.id}`)}
            className="glass-effect rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 block h-full border border-orange-500/20 glow-orange group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {tool.logo_url && (
                  <img
                    src={tool.logo_url}
                    alt={tool.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                )}
                <div>
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mt-1">
                    Featured
                  </Badge>
                </div>
              </div>
              <Heart className="w-5 h-5 text-gray-500 hover:text-red-400 transition-colors cursor-pointer" />
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {tool.tagline || tool.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tool.rating_avg > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-400">{tool.rating_avg.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                View Tool <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
export default FeaturedTools;
