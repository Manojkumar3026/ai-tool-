
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const TrendingCategories: React.FC<{ categories: any[] }> = ({ categories }) => {
  const { motion } = window.framer;
  const topCategories = categories.slice(0, 8);
  const { Sparkles, Code, Palette, Video, Music, FileText, Image, MessageSquare } = window.lucide;
  
  const iconMap: { [key: string]: React.ElementType } = {
    Code, Palette, Video, Music, FileText, Image, MessageSquare, Sparkles
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {topCategories.map((category, index) => {
        const IconComponent = iconMap[category.icon] || Sparkles;
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={createPageUrl(`Explore?category=${category.slug}`)}
              className="glass-effect rounded-2xl p-6 transition-all duration-300 block group border border-white/10 hover:border-blue-500/30 hover:scale-105"
            >
              <div
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${category.color}22` }}
              >
                <IconComponent 
                  className="w-6 h-6 transition-all duration-300" 
                  style={{ color: category.color }} 
                />
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500">{category.tool_count} Tools</p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
export default TrendingCategories;
