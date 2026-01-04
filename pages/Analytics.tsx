
import React from "react";
import { base44 } from "../api/base44Client";
import { Badge } from "../components/ui/badge";

const Analytics: React.FC = () => {
  const { TrendingUp, BarChart3, Users, Zap, Calendar } = window.lucide;
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } = window.Recharts;
  const { useQuery } = window.ReactQuery;
  const { format, subDays } = window.dateFns;

  const { data: tools = [] } = useQuery({
    queryKey: ['tools-analytics'],
    queryFn: () => base44.entities.Tool.list('-created_date'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews-analytics'],
    queryFn: () => base44.entities.Review.list(),
  });

  const categoryData = categories.map(cat => ({
    name: cat.name,
    value: tools.filter(t => t.category === cat.slug).length,
    color: cat.color
  })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

  const pricingData = [
    { name: 'Free', value: tools.filter(t => t.pricing_type === 'Free').length, color: '#10b981' },
    { name: 'Freemium', value: tools.filter(t => t.pricing_type === 'Freemium').length, color: '#3b82f6' },
    { name: 'Paid', value: tools.filter(t => t.pricing_type === 'Paid').length, color: '#f59e0b' },
    { name: 'Open Source', value: tools.filter(t => t.pricing_type === 'Open Source').length, color: '#8b5cf6' },
  ].filter(p => p.value > 0);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const count = tools.filter(t => format(new Date(t.created_date), 'yyyy-MM-dd') === dateStr).length;
    return { date: format(date, 'MMM dd'), tools: count };
  });

  const topCategories = categoryData.slice(0, 5);

  const totalTools = tools.length;
  const avgRating = totalTools > 0 ? tools.reduce((sum, t) => sum + (t.rating_avg || 0), 0) / totalTools : 0;
  const totalViews = tools.reduce((sum, t) => sum + (t.views || 0), 0);
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Insights into the AIverse ecosystem</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><BarChart3 className="w-6 h-6 text-white" /></div><TrendingUp className="w-5 h-5 text-green-400" /></div>
            <div className="text-3xl font-bold text-white mb-1">{totalTools}</div><div className="text-sm text-gray-400">Total AI Tools</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Zap className="w-6 h-6 text-white" /></div><Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Avg</Badge></div>
            <div className="text-3xl font-bold text-white mb-1">{avgRating.toFixed(1)}</div><div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"><Users className="w-6 h-6 text-white" /></div></div>
            <div className="text-3xl font-bold text-white mb-1">{totalViews.toLocaleString()}</div><div className="text-sm text-gray-400">Total Views</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between mb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center"><Calendar className="w-6 h-6 text-white" /></div></div>
            <div className="text-3xl font-bold text-white mb-1">{totalReviews}</div><div className="text-sm text-gray-400">Total Reviews</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="glass-effect rounded-2xl p-6 border border-white/10"><h3 className="text-xl font-bold text-white mb-6">Tools Added (Last 7 Days)</h3><ResponsiveContainer width="100%" height={300}><LineChart data={last7Days}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /><XAxis dataKey="date" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} /><Line type="monotone" dataKey="tools" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} /></LineChart></ResponsiveContainer></div>
          <div className="glass-effect rounded-2xl p-6 border border-white/10"><h3 className="text-xl font-bold text-white mb-6">Top Categories</h3><ResponsiveContainer width="100%" height={300}><BarChart data={topCategories}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /><XAxis dataKey="name" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} /><Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-effect rounded-2xl p-6 border border-white/10"><h3 className="text-xl font-bold text-white mb-6">Pricing Models</h3><div className="flex items-center justify-center"><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={pricingData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">{pricingData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} /></PieChart></ResponsiveContainer></div></div>
          <div className="glass-effect rounded-2xl p-6 border border-white/10"><h3 className="text-xl font-bold text-white mb-4">Weekly Insights</h3><div className="space-y-4"><div className="glass-effect rounded-lg p-4 border border-blue-500/20"><div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0"><TrendingUp className="w-4 h-4 text-blue-400" /></div><div><h4 className="font-semibold text-white mb-1">Growing Categories</h4><p className="text-sm text-gray-400">{topCategories[0]?.name} leads with {topCategories[0]?.value} tools, showing strong growth in this sector.</p></div></div></div><div className="glass-effect rounded-lg p-4 border border-green-500/20"><div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0"><Zap className="w-4 h-4 text-green-400" /></div><div><h4 className="font-semibold text-white mb-1">Quality Trend</h4><p className="text-sm text-gray-400">Average tool rating is {avgRating.toFixed(1)}/5.0, indicating high community satisfaction.</p></div></div></div><div className="glass-effect rounded-lg p-4 border border-purple-500/20"><div className="flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0"><Users className="w-4 h-4 text-purple-400" /></div><div><h4 className="font-semibold text-white mb-1">Engagement</h4><p className="text-sm text-gray-400">{totalViews.toLocaleString()} total views with {totalReviews} community reviews across all tools.</p></div></div></div></div></div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
