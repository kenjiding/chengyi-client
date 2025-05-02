"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CartItem } from '@/types'
import Request from '@/lib/request'

export function InquiryDialog({ products }: { products: CartItem[] }) {
  const t = useTranslations('inquiryDialog');
  const [loadingObj, setLoadingObj] = useState({
    loading: false,
    text: ''
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields = [
    {
      label: t('formFields.name.label'),
      type: 'text',
      key: 'name',
      required: true,
      placeholder: t('formFields.name.placeholder')
    },
    {
      label: t('formFields.email.label'),
      type: 'email',
      key: 'email',
      required: true,
      placeholder: t('formFields.email.placeholder')
    },
    {
      label: t('formFields.phone.label'),
      type: 'tel',
      key: 'phone',
      required: true,
      placeholder: t('formFields.phone.placeholder')
    },
    {
      label: t('formFields.whatsapp.label'),
      type: 'tel',
      key: 'whatsapp',
      required: false,
      placeholder: t('formFields.whatsapp.placeholder')
    },
    {
      label: t('formFields.message.label'),
      type: 'textarea',
      key: 'message',
      required: false,
      placeholder: t('formFields.message.placeholder')
    }
  ];

  // 邮箱验证函数
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // 如果该字段有错误而且现在有值了，清除错误
    if (errors[key] && value.trim()) {
      if (key === 'email' && !isValidEmail(value)) {
        return; // 如果是邮箱但格式不正确，不清除错误
      }
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // 检查所有必填字段
    formFields.forEach(field => {
      const value = formData[field.key as keyof typeof formData].trim();
      
      if (field.required && !value) {
        newErrors[field.key] = '此项为必填项';
        isValid = false;
      } else if (field.key === 'email' && value && !isValidEmail(value)) {
        newErrors[field.key] = '请输入有效的电子邮件地址';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoadingObj({ loading: true, text: '' });
      await Request.post('/admin/inquiry', {
        data: {
          ...formData,
          products,
        }
      });
      setLoadingObj({ loading: false, text: 'success' });
    } finally {}
  }

  const onOpenChange = (val: boolean) => {
    setOpen(val);
    if(!val) {
      setLoadingObj({ loading: false, text: '' });
      setErrors({});
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 text-white py-4 sm:py-6 rounded-lg hover:bg-blue-700 transition-colors">
          {t('title')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95%] md:w-[90%] lg:w-[80%] max-h-[90vh] flex flex-col overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 flex-grow overflow-hidden">
          <div className="md:border-r md:pr-4 order-2 md:order-1 overflow-y-auto max-h-[50vh]">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 sticky top-0 bg-white z-10">
              {t('selectedProducts')}
            </h3>
            <div className="space-y-4">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">
                  {t('noProducts')}
                </p>
              ) : (
                products.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center border rounded-lg p-2 sm:p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md mr-2 sm:mr-4">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {t('quantity')}: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 px-4 order-1 md:order-2 overflow-y-auto max-h-[50vh]"
          >
            {formFields.map((field) => (
              <div key={field.key}>
                <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-gray-700">
                  {field.label}{field.required ? ' *' : ' (可选)'}
                </label>
                {field.type !== 'textarea' ? (
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className={`w-full px-2 py-2 sm:px-3 sm:py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[field.key] 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    onBlur={() => {
                      // 针对email字段在失焦时进行验证
                      if (field.key === 'email' && formData.email && !isValidEmail(formData.email)) {
                        setErrors(prev => ({
                          ...prev,
                          email: 'please enter a valid email address'
                        }));
                      }
                    }}
                  />
                ) : (
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-2 py-2 sm:px-3 sm:py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 sm:h-24 resize-none ${
                      errors[field.key] 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                )}
                {errors[field.key] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.key]}
                  </p>
                )}
              </div>
            ))}
          </form>
        </div>

        <DialogFooter className="mt-2 sm:mt-0 sticky bottom-0 bg-white py-2">
          <Button
            type="submit"
            loading={loadingObj.loading}
            onClick={handleSubmit}
            className={`w-full py-3 sm:py-6 text-sm sm:text-base ${loadingObj.text === 'success' ? 'bg-green-600' : ''}`}
          >
            {loadingObj.text === 'success' ? 'Success' : t('submitInquiry')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}