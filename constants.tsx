
import React from 'react';
import { LayoutDashboard, Bed, Users, CreditCard, PieChart, Wrench } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { label: 'Kamar', icon: <Bed size={20} />, path: '/rooms' },
  { label: 'Penghuni', icon: <Users size={20} />, path: '/residents' },
  { label: 'Pemeliharaan', icon: <Wrench size={20} />, path: '/maintenance' },
  { label: 'Keuangan', icon: <CreditCard size={20} />, path: '/finance' },
  { label: 'Laporan', icon: <PieChart size={20} />, path: '/reports' },
];

export const INITIAL_ROOMS = [
  {
    id: '1',
    name: 'A-101',
    type: 'Deluxe',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    status: 'Occupied' as const,
    description: 'Kamar mewah dengan AC dan balkon pribadi.',
    facilities: ['AC', 'WiFi', 'Water Heater', 'Balkon']
  },
  {
    id: '2',
    name: 'A-102',
    type: 'Standard',
    price: 1500000,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    status: 'Available' as const,
    description: 'Kamar standar nyaman untuk mahasiswa.',
    facilities: ['WiFi', 'Lemari', 'Meja Belajar']
  },
  {
    id: '3',
    name: 'B-201',
    type: 'Suite',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=800&auto=format&fit=crop',
    status: 'Occupied' as const,
    description: 'Suite luas dengan dapur kecil.',
    facilities: ['AC', 'Kitchenette', 'Smart TV', 'King Bed']
  },
];

export const INITIAL_TICKETS = [
  {
    id: 'TKT-001',
    roomId: 'A-101',
    residentName: 'Andi Pratama',
    title: 'AC Tidak Dingin',
    description: 'AC di kamar A-101 sudah 2 hari tidak dingin dan mengeluarkan bunyi bising.',
    status: 'Pending' as const,
    priority: 'High' as const,
    createdAt: '2024-05-20 09:00',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ec3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'TKT-002',
    roomId: 'B-201',
    residentName: 'Citra Dewi',
    title: 'Lampu Kamar Mandi Mati',
    description: 'Lampu LED di dalam kamar mandi mati mendadak.',
    status: 'In Progress' as const,
    priority: 'Medium' as const,
    createdAt: '2024-05-21 14:30',
    technician: 'Pak Bambang',
    image: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800&auto=format&fit=crop'
  }
];

export const APP_NAME = "KostPro";
