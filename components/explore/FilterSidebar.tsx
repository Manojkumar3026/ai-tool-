
import React from "react";
import { Badge } from "../ui/badge";

interface FilterSidebarProps {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  selectedAudience: string;
  setSelectedAudience: (audience: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPricing,
  setSelectedPricing,
  selectedAudience,
  setSelectedAudience,
  showFilters,
  setShowFilters
}) => {
  const { Layers, DollarSign, Users } = window.lucide;
  const pricingOptions = ['Free', 'Freemium', 'Paid', 'Open Source'];
  const audienceOptions = ['Developers', 'Designers', 'Marketers', 'Writers', 'Students', 'Businesses'];

  return (
    <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="glass-effect rounded-2xl p-6 sticky top-24 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4"><Layers className="w-5 h-5 text-blue-400" /><h3 className="font-semibold text-white">Categories</h3></div>
          <div className="space-y-2">
            <button onClick={() => setSelectedCategory('')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}>All Categories</button>
            {categories.map(category => (
              <button key={category.id} onClick={() => setSelectedCategory(category.slug)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === category.slug ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:bg-white/5'}`}>
                <span>{category.name}</span>
                <Badge variant="outline" className="text-xs border-white/20">{category.tool_count || 0}</Badge>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4"><DollarSign className="w-5 h-5 text-green-400" /><h3 className="font-semibold text-white">Pricing</h3></div>
          <div className="space-y-2">
            <button onClick={() => setSelectedPricing('all')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPricing === 'all' ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:bg-white/5'}`}>All</button>
            {pricingOptions.map(option => (
              <button key={option} onClick={() => setSelectedPricing(option)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPricing === option ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:bg-white/5'}`}>{option}</button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-orange-400" /><h3 className="font-semibold text-white">Target Audience</h3></div>
          <div className="space-y-2">
             <button onClick={() => setSelectedAudience('all')} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedAudience === 'all' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5'}`}>All</button>
            {audienceOptions.map(option => (
              <button key={option} onClick={() => setSelectedAudience(option)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedAudience === option ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5'}`}>{option}</button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
export default FilterSidebar;
