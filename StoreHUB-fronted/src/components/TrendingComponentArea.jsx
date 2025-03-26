import React from "react";
import { ThumbsUp, ThumbsDown, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";


const ComponentCard = (card) => {
  return (
    <div className="bg-white border w-full bg-black border-black/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex">
      <div className="w-1/3 h-64 overflow-hidden">
        <img
          src={card.image || '/api/placeholder/400/300'}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="text-green-600" size={18} />
                <span className="text-gray-700 font-medium">{card.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsDown className="text-red-600" size={18} />
                <span className="text-gray-700 font-medium">{card.dislikes}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-base">{card.description}</p>
          <div className="flex space-x-2 mb-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-800">{card.framework}</span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-800">{card.componentType}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <UserCircle2 size={18} />
            <span className="text-sm font-medium">
              {card.user ? card.user.username : "Anonymous"}
            </span>
          </div>
          <span className="text-sm text-gray-500">

          </span>
        </div>
      </div>
    </div>
  );
};


const TrendingComponentArea = ({ components }) => {
  return (
    <div className="w-5/6 py-4 mx-auto mt-16 space-y-6 px-4">
      {components.map((component) => (
        <Link key={component.id} to={`/post/${component.id}`} className="block">
          <ComponentCard {...component} />
        </Link>
      ))}
    </div>
  );
};


export default TrendingComponentArea;
