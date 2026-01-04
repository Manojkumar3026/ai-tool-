
import React from "react";

const StatsSection: React.FC<{ totalTools: number, categoriesCount: number }> = ({ totalTools, categoriesCount }) => {
    const { Database, Layers, TrendingUp, Clock } = window.lucide;
    const { motion } = window.framer;

    const stats = [
        { icon: Database, value: `${totalTools}+`, label: "AI Tools", color: "from-blue-500 to-cyan-500" },
        { icon: Layers, value: `${categoriesCount}+`, label: "Categories", color: "from-purple-500 to-pink-500" },
        { icon: TrendingUp, value: "Daily", label: "Updates", color: "from-orange-500 to-red-500" },
        { icon: Clock, value: "24/7", label: "Discovery", color: "from-green-500 to-emerald-500" }
    ];

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-transform"
                        >
                            <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default StatsSection;
