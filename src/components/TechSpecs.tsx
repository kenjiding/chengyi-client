"use client";

import { motion } from 'framer-motion';

const specs = [
  {
    title: "Quality Control",
    items: [
      "100% Authenticity Guaranteed",
      "Multi-Stage Testing",
      "ISO 9001 Certified",
      "RoHS Compliant"
    ]
  },
  {
    title: "Technical Support",
    items: [
      "24/7 Expert Assistance",
      "Detailed Documentation",
      "Sample Code Available",
      "Design Consultation"
    ]
  }
];

export default function TechSpecs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Technical Excellence</h2>
            <p className="text-gray-600">Our commitment to quality and technical precision</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {specs.map((spec, specIndex) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: specIndex * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-blue-600 p-4">
                  <h3 className="text-xl font-semibold text-white">{spec.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {spec.items.map((item, itemIndex) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-blue-600 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 