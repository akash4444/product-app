import React from "react";

const Star = ({ fill = 0 }) => {
  return (
    <div className="relative w-6 h-6">
      <svg
        className="absolute inset-0 w-6 h-6 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.64a1 1 0 00.95.69h3.832c.969 0 
          1.371 1.24.588 1.81l-3.1 2.253a1 1 0 00-.364 1.118l1.184 
          3.64c.3.921-.755 1.688-1.54 1.118l-3.1-2.253a1 1 0 
          00-1.176 0l-3.1 2.253c-.784.57-1.838-.197-1.539-1.118l1.183-3.64a1 
          1 0 00-.364-1.118L2.327 9.07c-.783-.57-.38-1.81.588-1.81h3.832a1 
          1 0 00.951-.69l1.183-3.64z"
        />
      </svg>

      <svg
        className="absolute inset-0 w-6 h-6 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.64a1 
          1 0 00.95.69h3.832c.969 0 
          1.371 1.24.588 1.81l-3.1 2.253a1 1 0 
          00-.364 1.118l1.184 3.64c.3.921-.755 
          1.688-1.54 1.118l-3.1-2.253a1 1 0 
          00-1.176 0l-3.1 2.253c-.784.57-1.838-.197-1.539-1.118l1.183-3.64a1 
          1 0 00-.364-1.118L2.327 9.07c-.783-.57-.38-1.81.588-1.81h3.832a1 
          1 0 00.951-.69l1.183-3.64z"
        />
      </svg>
    </div>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = rating - i;
    return starValue >= 1 ? 1 : starValue > 0 ? starValue : 0;
  });

  return (
    <div className="flex items-center space-x-1">
      {stars.map((fill, idx) => (
        <Star key={idx} fill={fill} />
      ))}
    </div>
  );
};

export default Rating;
