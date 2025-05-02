"use client";

import { PhoneCall, X, MessageCircleMore, Mail } from "lucide-react";
import { useState } from "react";

const RootContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <div 
        className={`
          w-80 bg-white rounded-xl shadow-2xl p-6 
          transform transition-all duration-300 
          ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'}
        `}
      >
        {isOpen && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </span>
              <div>
                <p className="text-sm text-green-500">Phone / WhatsApp</p>
                <a 
                  href="https://wa.me/+8613610307032" 
                  target="_blank"
                  className="text-black hover:text-blue-700">
                  <p className="font-medium">+86 13610307032</p>
                </a>
                <a 
                  href="https://wa.me/+8613725293855" 
                  target="_blank"
                  className="text-black hover:text-blue-700">
                  <p className="font-medium">+86 13725293855</p>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-400 text-white p-2 rounded-full hover:bg-green-500 transition">
                <MessageCircleMore className="w-6 h-6" />
              </span>
              <div>
                <p className="text-sm text-green-400">WeChat</p>
                <a href="weixin://jianjeab123" className="text-black hover:text-blue-700">
                  <p className="font-medium">jianjeab123</p>
                </a>
                <a href="weixin://" className="text-black hover:text-blue-700">
                  <p className="font-medium">Adingli888</p>
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
                <Mail className="w-6 h-6" />
              </span>
              <div>
                <p className="text-sm text-blue-500">Email</p>
                <a href="mailto:alissa@chengyiauto.cn" className="text-black hover:text-blue-700">
                  <p className="font-medium">alissa@chengyiauto.cn</p>
                </a>
                <a href="mailto:anna@chengyiauto.cn" className="text-black hover:text-blue-700">
                  <p className="font-medium">anna@chengyiauto.cn</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-center items-center text-white bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-lg 
          hover:shadow-xl transform hover:scale-110 transition-all duration-1000 ${isOpen ? '' : 'animate-bounce'}`}
      >
        { isOpen ? <X /> : <PhoneCall /> }
      </button>
    </div>
  );
};

export default RootContact;