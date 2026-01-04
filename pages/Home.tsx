
import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import FeaturedTools from "../components/home/FeaturedTools";
import TrendingCategories from "../components/home/TrendingCategories";
import StatsSection from "../components/home/StatsSection";
import LatestTools from "../components/home/LatestTools";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const { Sparkles, TrendingUp, Zap, ArrowRight, Search, Users, Rocket, Star, Globe, Shield } = window.lucide;
  const { motion } = window.framer;
  const { useQuery } = window.ReactQuery;


  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: toolsData = [] } = useQuery({
    queryKey: ['tools'],
    queryFn: () => base44.entities.Tool.filter({ status: 'approved' }, '-created_date', 100),
  });
  
  const { data: categoriesData = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  useEffect(() => {
    if (toolsData) setTools(toolsData);
    if (categoriesData) setCategories(categoriesData);
  }, [toolsData, categoriesData])


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = createPageUrl(`Explore?q=${encodeURIComponent(searchQuery)}`).substring(1);
    }
  };

  const featuredTools = tools.filter(t => t.status === 'featured').slice(0, 6);
  const latestTools = tools.slice(0, 8);
  const totalTools = tools.length;
  const categoriesCount = categories.length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex"
            >
              <Badge className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-orange-500/20 border-2 border-blue-500/30 text-blue-300 text-base font-semibold">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Discover {totalTools}+ AI Tools Daily
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                The Living Dictionary
              </span>
              <br />
              <span className="text-white mt-4 block">of AI Tools</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore, discover, and master the world's most powerful AI tools.
              <br />
              <span className="text-blue-400 font-semibold">Updated daily.</span> <span className="text-purple-400 font-semibold">Powered by community.</span> <span className="text-orange-400 font-semibold">Enhanced by intelligence.</span>
            </p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto"
            >
              <div className="relative glass-effect rounded-2xl p-3 glow-blue border-2 border-blue-500/30 hover:border-blue-500/50 transition-all">
                <Input
                  type="text"
                  placeholder="Search for AI tools... (e.g., video editing, chatbots, coding)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 text-white placeholder:text-gray-500 text-lg h-16 pr-36"
                />
                <Button
                  type="submit"
                  className="absolute right-3 top-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-14 px-8 text-base font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </motion.form>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <span className="text-gray-500 font-medium">Popular searches:</span>
              {['AI Writing', 'Image Generation', 'Code Assistants', 'Video Tools'].map((tag) => (
                <Link
                  key={tag}
                  to={createPageUrl(`Explore?q=${encodeURIComponent(tag)}`)}
                  className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-all border border-white/10 hover:border-blue-500/30 hover:scale-105"
                >
                  {tag}
                </Link>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 pt-8"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Verified Tools</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Community Rated</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Global Database</span>
              </div>
            </motion.div>

            {/* Auth CTA */}
            {!user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <Button
                  onClick={() => base44.auth.redirectToLogin()}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-6 text-lg"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join AIverse - It's Free!
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection totalTools={totalTools} categoriesCount={categoriesCount} />

      {/* Trending Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Trending Categories</h2>
              <p className="text-gray-400">Explore AI tools by use case</p>
            </div>
            <Link to={createPageUrl("Explore")}>
              <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <TrendingCategories categories={categories} />
        </div>
      </section>

      {/* Featured Tools */}
      {featuredTools.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center glow-orange">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Featured Tools</h2>
                <p className="text-gray-400">Hand-picked tools of the week</p>
              </div>
            </div>
            <FeaturedTools tools={featuredTools} />
          </div>
        </section>
      )}

      {/* Latest Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Latest Additions</h2>
              <p className="text-gray-400">Fresh AI tools added to AIverse</p>
            </div>
          </div>
          <LatestTools tools={latestTools} />
          <div className="text-center mt-10">
            <Link to={createPageUrl("Explore")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6">
                Explore All Tools
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-3xl p-12 glow-blue border-2 border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <Zap className="w-16 h-16 mx-auto mb-6 text-orange-400 animate-pulse" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Discover Your Next AI Tool?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of creators, developers, and innovators exploring the AI universe
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("AIChat")}>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Assistant
                </Button>
              </Link>
              <Link to={createPageUrl("Community")}>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-lg px-8 py-6">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
