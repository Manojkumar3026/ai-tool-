
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Badge } from "../ui/badge";

const LatestTools: React.FC<{ tools: any[] }> = ({ tools }) => {
  const { ExternalLink, Clock } = window.lucide;
  const { formatDistanceToNow } = window.dateFns;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          to={createPageUrl(`ToolDetail?id=${tool.id}`)}
          className="glass-effect rounded-xl p-5 hover:scale-105 transition-all duration-300 block border border-blue-500/10 hover:border-blue-500/30 group"
        >
          <div className="flex items-start gap-3 mb-3">
            {tool.logo_url ? (
              <img
                src={tool.logo_url}
                alt={tool.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {tool.name[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(new Date(tool.created_date), { addSuffix: true })}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {tool.tagline || tool.description}
          </p>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
              {tool.category}
            </Badge>
            <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
};
export default LatestTools;
