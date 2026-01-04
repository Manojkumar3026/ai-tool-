
import React, { useState } from "react";
import { base44 } from "../api/base44Client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ToolCard from "../components/explore/ToolCard";
import FilterSidebar from "../components/explore/FilterSidebar";

const Explore: React.FC = () => {
  const { useLocation } = window.ReactRouterDOM;
  const { useQuery } = window.ReactQuery;
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPricing, setSelectedPricing] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [sortBy, setSortBy] = useState('-created_date');
  const [showFilters, setShowFilters] = useState(false);
  const { Search, Filter, X, SlidersHorizontal } = window.lucide;

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['tools-explore', sortBy],
    queryFn: () => base44.entities.Tool.filter({ status: 'approved' }, sortBy, 500),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  const filteredTools = tools.filter(tool => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        tool.name?.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query) ||
        tool.tagline?.toLowerCase().includes(query) ||
        (Array.isArray(tool.tags) && tool.tags.some(tag => tag.toLowerCase().includes(query)));
      if (!matchesSearch) return false;
    }

    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== '') {
      if (tool.category !== selectedCategory) return false;
    }

    if (selectedPricing && selectedPricing !== 'all') {
      if (tool.pricing_type !== selectedPricing) return false;
    }

    if (selectedAudience && selectedAudience !== 'all') {
        if (!Array.isArray(tool.target_audience) || !tool.target_audience.includes(selectedAudience)) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPricing('all');
    setSelectedAudience('all');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory && selectedCategory !== 'all' && selectedCategory !== '',
    selectedPricing !== 'all',
    selectedAudience !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Explore AI Tools</h1>
          <p className="text-gray-400">Discover the perfect AI tool for your needs</p>
        </div>

        <div className="glass-effect rounded-2xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-created_date">Latest</SelectItem>
                <SelectItem value="created_date">Oldest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="-rating_avg">Highest Rated</SelectItem>
                <SelectItem value="-views">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="lg:hidden border-white/20 text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
              {searchQuery && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Search: {searchQuery}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchQuery('')} />
                </Badge>
              )}
              {selectedCategory && selectedCategory !== 'all' && selectedCategory !== '' &&(
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Category: {categories.find(c => c.slug === selectedCategory)?.name}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory('')} />
                </Badge>
              )}
              {selectedPricing !== 'all' && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {selectedPricing}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedPricing('all')} />
                </Badge>
              )}
              {selectedAudience !== 'all' && (
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  For: {selectedAudience}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedAudience('all')} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                Clear All
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPricing={selectedPricing}
            setSelectedPricing={setSelectedPricing}
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
                <p className="text-gray-400 mt-4">Loading tools...</p>
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters} variant="outline" className="border-blue-500/30 text-blue-400">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-400">
                  Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
