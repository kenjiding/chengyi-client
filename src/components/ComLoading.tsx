import React from 'react';

const ComLoading = () => (
  <div className="flex justify-center items-center h-64 w-full">
    <div className="relative w-24 h-24">
      <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-gray-200 rounded-full"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-500 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 font-semibold">
        loading...
      </div>
    </div>
  </div>
);

export default ComLoading;