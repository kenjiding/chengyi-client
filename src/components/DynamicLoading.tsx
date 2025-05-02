import React from 'react';

const DynamicLoadingComponent = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50">
      {/* Animated Spinner */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-8 h-8 border-4 border-t-transparent border-blue-300 rounded-full animate-spin animate-reverse"></div>
      </div>
      
      {/* Pulsating Text with Gradient */}
      <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
      {text}
      </h2>
      
      {/* Animated Dots */}
      <div className="flex mt-2 space-x-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default DynamicLoadingComponent;