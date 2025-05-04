// const fetch = require('node-fetch'); // 👈 Node 18+ 不需要，Node <18 要手动安装

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:9990/api/admin/products?page=1&pageSize=1000');

    if (!response.ok) {
      throw new Error(`HTTP error! 状态码: ${response.status}`);
    }

    const data = await response.json();
    console.log('接口数据:', data);
    return data.data.items || [];
  } catch (error) {
    console.error('请求出错:', error);
  }
}


async function getTotalPages() {
  // Calculate total pages based on product count and pageSize
  const totalProducts = 1000; // Replace with actual product count
  const pageSize = 12;
  return Math.ceil(totalProducts / pageSize); // Example: 5 pages
}

const config = {
  siteUrl: 'https://www.chengyiauto.com', // Replace with your actual domain
  generateRobotsTxt: true, // Generate robots.txt to fix HTTP 500 error
  sitemapSize: 7000, // Maximum URLs per sitemap file
  changefreq: 'weekly', // Default change frequency
  priority: 0.7, // Default priority
  // Dynamic URL generation
  additionalPaths: async () => {
    const paths = [];

    // Static pages
    paths.push(
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      }
    );

    // Product list page
    paths.push({
      loc: '/products',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Product pagination
    const totalPages = await getTotalPages();
    for (let page = 1; page <= totalPages; page++) {
      paths.push({
        loc: `/products?page=${page}&pageSize=12`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    }

    // Product detail pages
    const products = await fetchProducts();
    products.forEach((product) => {
      paths.push({
        loc: `/products/${product.id}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: product.lastmod || new Date().toISOString(),
      });
    });

    return paths;
  },
  // Customize URL transformation (optional)
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  // robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/products', '/products/*', '/categories', '/categories/*'],
        disallow: [
          '/admin',
          '/login',
          '/cart',
          '/checkout',
          '/api/*',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'Baiduspider',
        allow: ['/', '/products', '/products/*', '/categories', '/categories/*'],
        disallow: ['/admin', '/login', '/cart', '/checkout', '/api/*'],
      },
    ],
    additionalSitemaps: ['https://www.chengyiauto.com/sitemap.xml'],
  },
  // Exclude unnecessary pages
  exclude: ['/admin/*', '/login', '/cart', '/checkout'],
  // Generate index sitemap for large sites
  generateIndexSitemap: true,
};

module.exports = config;