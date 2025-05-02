import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Microcontrollers',
    description: 'High-performance microcontrollers and development boards for your electronic projects',
    image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800',
    specifications: [
      'Wide range of processing power',
      'Multiple I/O options',
      'Built-in peripherals',
      'Development tool support',
      'Various memory configurations'
    ],
    applications: [
      'Embedded Systems',
      'IoT Devices',
      'Robotics',
      'Home Automation',
      'Industrial Control'
    ]
  },
  {
    id: '2',
    name: 'Sensors',
    description: 'Precision sensors for temperature, pressure, motion, and more',
    image: '/images/simenzi.png',
    specifications: [
      'High accuracy and precision',
      'Digital and analog outputs',
      'Multiple interface options',
      'Industrial grade quality',
      'Environmental protection'
    ],
    applications: [
      'Environmental Monitoring',
      'Industrial Automation',
      'Smart Buildings',
      'Medical Devices',
      'Automotive Systems'
    ]
  },
  {
    id: '3',
    name: 'Passive Components',
    description: 'High-quality passive components including resistors, capacitors, and inductors',
    image: '/images/sanling.png',
    specifications: [
      'Tight tolerances',
      'Temperature stability',
      'High reliability',
      'RoHS compliant',
      'Multiple package options'
    ],
    applications: [
      'Circuit Design',
      'Power Supplies',
      'Signal Processing',
      'Filtering',
      'Impedance Matching'
    ]
  },
  {
    id: '4',
    name: 'Active Components',
    description: 'Wide selection of transistors, ICs, and other active components',
    image: '/images/samsune.png',
    specifications: [
      'Low power consumption',
      'High switching speed',
      'Wide operating voltage',
      'Multiple package types',
      'Extended temperature range'
    ],
    applications: [
      'Amplification',
      'Switching',
      'Power Management',
      'Signal Processing',
      'Digital Logic'
    ]
  }
]; 