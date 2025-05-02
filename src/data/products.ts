import { IProduct } from '@/types';

export const featuredProducts: IProduct[] = [
  {
    id: '1',
    name: 'Arduino Uno R3',
    description: 'The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.',
    price: 23.00,
    category: 'Microcontrollers',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'ATmega328P microcontroller',
      'Input voltage - 7-12V',
      'Digital I/O Pins - 14',
      'Analog Input Pins - 6',
      'DC Current per I/O Pin - 20 mA',
      'Flash Memory - 32 KB',
    ],
    specifications: [
      { name: 'Microcontroller', value: 'ATmega328P' },
      { name: 'Operating Voltage', value: '5V' },
      { name: 'Input Voltage', value: '7-12V' },
      { name: 'Digital I/O Pins', value: '14' },
      { name: 'PWM Digital I/O Pins', value: '6' },
      { name: 'Analog Input Pins', value: '6' },
      { name: 'DC Current per I/O Pin', value: '20 mA' },
      { name: 'Flash Memory', value: '32 KB' },
      { name: 'SRAM', value: '2 KB' },
      { name: 'EEPROM', value: '1 KB' },
      { name: 'Clock Speed', value: '16 MHz' },
    ]
  },
  {
    id: '2',
    name: 'Raspberry Pi 4',
    description: 'The latest Raspberry Pi computer, perfect for projects and learning. Features a quad-core processor, dual display output, and enhanced thermal management.',
    price: 45.99,
    category: 'Microcontrollers',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800',
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33147?w=800'
    ],
    features: [
      'Quad-core Cortex-A72 processor',
      'Dual micro-HDMI ports',
      'USB 3.0 ports',
      'Gigabit Ethernet',
      'Bluetooth 5.0',
      'PoE capability'
    ],
    specifications: [
      { name: 'Processor', value: 'Quad Core Cortex-A72' },
      { name: 'RAM', value: '4GB LPDDR4' },
      { name: 'GPU', value: 'VideoCore VI' },
      { name: 'Networking', value: 'Gigabit Ethernet' },
      { name: 'Wireless', value: 'Dual-band WiFi + BT 5.0' },
      { name: 'USB Ports', value: '2x USB 3.0, 2x USB 2.0' },
      { name: 'Power Input', value: '5V DC via USB-C' },
      { name: 'Video Output', value: '2x micro-HDMI' }
    ]
  },
  {
    id: '3',
    name: 'Temperature Sensor',
    description: 'High-precision digital temperature sensor module with wide measurement range and excellent accuracy.',
    price: 4.99,
    category: 'Sensors',
    stock: 100,
    images: [
      'https://img2.baidu.com/it/u=3175835339,1812647254&fm=253&fmt=auto&app=138&f=JPEG?w=784&h=500',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'High precision measurements',
      'Wide temperature range',
      'Digital interface',
      'Low power consumption',
      'Waterproof option available'
    ],
    specifications: [
      { name: 'Temperature Range', value: '-55°C to +125°C' },
      { name: 'Accuracy', value: '±0.5°C' },
      { name: 'Resolution', value: '0.1°C' },
      { name: 'Interface', value: 'Digital (I2C)' },
      { name: 'Supply Voltage', value: '3.3V - 5V' },
      { name: 'Response Time', value: '<2s' }
    ]
  },
  {
    id: '2343353',
    name: 'Raspberry Pi 4',
    description: 'The latest Raspberry Pi computer, perfect for projects and learning. Features a quad-core processor, dual display output, and enhanced thermal management.',
    price: 45.99,
    category: 'Microcontrollers',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800',
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33147?w=800'
    ],
    features: [
      'Quad-core Cortex-A72 processor',
      'Dual micro-HDMI ports',
      'USB 3.0 ports',
      'Gigabit Ethernet',
      'Bluetooth 5.0',
      'PoE capability'
    ],
    specifications: [
      { name: 'Processor', value: 'Quad Core Cortex-A72' },
      { name: 'RAM', value: '4GB LPDDR4' },
      { name: 'GPU', value: 'VideoCore VI' },
      { name: 'Networking', value: 'Gigabit Ethernet' },
      { name: 'Wireless', value: 'Dual-band WiFi + BT 5.0' },
      { name: 'USB Ports', value: '2x USB 3.0, 2x USB 2.0' },
      { name: 'Power Input', value: '5V DC via USB-C' },
      { name: 'Video Output', value: '2x micro-HDMI' }
    ]
  },
  {
    id: '53454523',
    name: 'Temperature Sensor',
    description: 'High-precision digital temperature sensor module with wide measurement range and excellent accuracy.',
    price: 4.99,
    category: 'Sensors',
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'High precision measurements',
      'Wide temperature range',
      'Digital interface',
      'Low power consumption',
      'Waterproof option available'
    ],
    specifications: [
      { name: 'Temperature Range', value: '-55°C to +125°C' },
      { name: 'Accuracy', value: '±0.5°C' },
      { name: 'Resolution', value: '0.1°C' },
      { name: 'Interface', value: 'Digital (I2C)' },
      { name: 'Supply Voltage', value: '3.3V - 5V' },
      { name: 'Response Time', value: '<2s' }
    ]
  },
  {
    id: '253453',
    name: 'Raspberry Pi 4',
    description: 'The latest Raspberry Pi computer, perfect for projects and learning. Features a quad-core processor, dual display output, and enhanced thermal management.',
    price: 45.99,
    category: 'Microcontrollers',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800',
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33147?w=800'
    ],
    features: [
      'Quad-core Cortex-A72 processor',
      'Dual micro-HDMI ports',
      'USB 3.0 ports',
      'Gigabit Ethernet',
      'Bluetooth 5.0',
      'PoE capability'
    ],
    specifications: [
      { name: 'Processor', value: 'Quad Core Cortex-A72' },
      { name: 'RAM', value: '4GB LPDDR4' },
      { name: 'GPU', value: 'VideoCore VI' },
      { name: 'Networking', value: 'Gigabit Ethernet' },
      { name: 'Wireless', value: 'Dual-band WiFi + BT 5.0' },
      { name: 'USB Ports', value: '2x USB 3.0, 2x USB 2.0' },
      { name: 'Power Input', value: '5V DC via USB-C' },
      { name: 'Video Output', value: '2x micro-HDMI' }
    ]
  },
  {
    id: '54643',
    name: 'Temperature Sensor',
    description: 'High-precision digital temperature sensor module with wide measurement range and excellent accuracy.',
    price: 4.99,
    category: 'Sensors',
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'High precision measurements',
      'Wide temperature range',
      'Digital interface',
      'Low power consumption',
      'Waterproof option available'
    ],
    specifications: [
      { name: 'Temperature Range', value: '-55°C to +125°C' },
      { name: 'Accuracy', value: '±0.5°C' },
      { name: 'Resolution', value: '0.1°C' },
      { name: 'Interface', value: 'Digital (I2C)' },
      { name: 'Supply Voltage', value: '3.3V - 5V' },
      { name: 'Response Time', value: '<2s' }
    ]
  },
  {
    id: '34622',
    name: 'Raspberry Pi 4',
    description: 'The latest Raspberry Pi computer, perfect for projects and learning. Features a quad-core processor, dual display output, and enhanced thermal management.',
    price: 45.99,
    category: 'Microcontrollers',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800',
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33147?w=800'
    ],
    features: [
      'Quad-core Cortex-A72 processor',
      'Dual micro-HDMI ports',
      'USB 3.0 ports',
      'Gigabit Ethernet',
      'Bluetooth 5.0',
      'PoE capability'
    ],
    specifications: [
      { name: 'Processor', value: 'Quad Core Cortex-A72' },
      { name: 'RAM', value: '4GB LPDDR4' },
      { name: 'GPU', value: 'VideoCore VI' },
      { name: 'Networking', value: 'Gigabit Ethernet' },
      { name: 'Wireless', value: 'Dual-band WiFi + BT 5.0' },
      { name: 'USB Ports', value: '2x USB 3.0, 2x USB 2.0' },
      { name: 'Power Input', value: '5V DC via USB-C' },
      { name: 'Video Output', value: '2x micro-HDMI' }
    ]
  },
  {
    id: '4433',
    name: 'Temperature Sensor',
    description: 'High-precision digital temperature sensor module with wide measurement range and excellent accuracy.',
    price: 4.99,
    category: 'Sensors',
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'High precision measurements',
      'Wide temperature range',
      'Digital interface',
      'Low power consumption',
      'Waterproof option available'
    ],
    specifications: [
      { name: 'Temperature Range', value: '-55°C to +125°C' },
      { name: 'Accuracy', value: '±0.5°C' },
      { name: 'Resolution', value: '0.1°C' },
      { name: 'Interface', value: 'Digital (I2C)' },
      { name: 'Supply Voltage', value: '3.3V - 5V' },
      { name: 'Response Time', value: '<2s' }
    ]
  },
  {
    id: '53453452',
    name: 'Raspberry Pi 4',
    description: 'The latest Raspberry Pi computer, perfect for projects and learning. Features a quad-core processor, dual display output, and enhanced thermal management.',
    price: 45.99,
    category: 'Microcontrollers',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800',
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33147?w=800'
    ],
    features: [
      'Quad-core Cortex-A72 processor',
      'Dual micro-HDMI ports',
      'USB 3.0 ports',
      'Gigabit Ethernet',
      'Bluetooth 5.0',
      'PoE capability'
    ],
    specifications: [
      { name: 'Processor', value: 'Quad Core Cortex-A72' },
      { name: 'RAM', value: '4GB LPDDR4' },
      { name: 'GPU', value: 'VideoCore VI' },
      { name: 'Networking', value: 'Gigabit Ethernet' },
      { name: 'Wireless', value: 'Dual-band WiFi + BT 5.0' },
      { name: 'USB Ports', value: '2x USB 3.0, 2x USB 2.0' },
      { name: 'Power Input', value: '5V DC via USB-C' },
      { name: 'Video Output', value: '2x micro-HDMI' }
    ]
  },
  {
    id: '46352343',
    name: 'Temperature Sensor',
    description: 'High-precision digital temperature sensor module with wide measurement range and excellent accuracy.',
    price: 4.99,
    category: 'Sensors',
    stock: 100,
    images: [
      'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81371?w=800',
      'https://images.unsplash.com/photo-1608564697071-ddf911d81372?w=800',
    ],
    features: [
      'High precision measurements',
      'Wide temperature range',
      'Digital interface',
      'Low power consumption',
      'Waterproof option available'
    ],
    specifications: [
      { name: 'Temperature Range', value: '-55°C to +125°C' },
      { name: 'Accuracy', value: '±0.5°C' },
      { name: 'Resolution', value: '0.1°C' },
      { name: 'Interface', value: 'Digital (I2C)' },
      { name: 'Supply Voltage', value: '3.3V - 5V' },
      { name: 'Response Time', value: '<2s' }
    ]
  }
]; 