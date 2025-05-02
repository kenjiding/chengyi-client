import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* 修改grid布局 */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_40%_25%] gap-8">
          {/* 左侧列保持原样 */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Chengyi - Leading Automation & Semiconductor Equipment Solutions.
              Professional electronic components supplier with worldwide shipping and expert support.
            </p>
          </div>

          {/* 中间列（占50%） */}
          <div className="m-auto">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: 
                <a href="mailto:anna@chengyiauto.cn" className="text-white hover:text-blue-700"><p>anna@chengyiauto.cn</p></a>
                <a href="mailto:alissa@chengyiauto.cn" className="text-white hover:text-blue-700"><p>alissa@chengyiauto.cn</p></a>
              </li>
              <li>Phone: 
                <a 
                  href="https://wa.me/+8613725293855" 
                  target="_blank"
                  className="text-white hover:text-blue-700">
                  <p>+86 13725293855</p>
                </a>
                <a 
                  href="https://wa.me/+8613610307032" 
                  target="_blank"
                  className="text-white hover:text-blue-700">
                  <p>+86 13610307032</p>
                </a>
                
              </li>
              <li>Address: 
                <p>{t('address')}</p>
              </li>
            </ul>
          </div>

          {/* 右侧列保持原样 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CHENGYI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}