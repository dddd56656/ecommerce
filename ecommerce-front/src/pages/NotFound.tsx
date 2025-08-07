import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">页面不存在</h2>
    <p className="mb-6 text-gray-600">
      很抱歉，您访问的页面不存在或已被移除。
    </p>
    <Link
      to="/"
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      返回首页
    </Link>
  </div>
);

export default NotFound;
