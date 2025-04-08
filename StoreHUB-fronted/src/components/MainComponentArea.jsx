import React from "react";
import { ThumbsUp, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ComponentCard = (card) => {
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={card.image || "/api/placeholder/400/300"}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold truncate w-5/6">{card.title}</h3>
          <div className="flex items-center space-x-1">
            <ThumbsUp className="text-black/60" size={16} />
            <span>{card.likes || 0}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="bg-black/10 px-2 py-1 rounded text-xs truncate">
              {card.framework}
            </span>
            <span className="bg-black/10 px-2 py-1 rounded text-xs truncate">
              {card.componentType}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-black/60">
            <UserCircle2 size={16} />
            <span className="text-sm truncate">
              {card.user ? card.user.username : "anonymous"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainComponentArea = ({ components }) => {
  return (
    <div className="mt-4 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {components.map((component, idx) => (
        <Link to={`/post/${component.id}`} key={idx}>
          <ComponentCard {...component} />
        </Link>
      ))}
    </div>
  );
};

export default MainComponentArea;
