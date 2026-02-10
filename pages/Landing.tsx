
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, MapPin, Star } from 'lucide-react';
import { INITIAL_ROOMS } from '../constants';
import { formatIDR } from '../utils/helpers';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
              <span>KostPro</span>
            </div>
            <div className="hidden md:flex items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#kamar" className="text-gray-600 hover:text-indigo-600">Unit Tersedia</a>
              <a href="#fasilitas" className="text-gray-600 hover:text-indigo-600">Fasilitas</a>
              <Link to="/" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Hunian Nyaman, <br/><span className="text-indigo-600">Privasi Terjamin.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Rasakan pengalaman tinggal di kost eksklusif dengan fasilitas lengkap, lokasi strategis, dan manajemen profesional. Tersedia berbagai tipe kamar sesuai kebutuhan Anda.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#kamar" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition">
                Cek Unit
              </a>
              <a href="#kontak" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition">
                Hubungi Kami
              </a>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/landing/800/600" alt="Hero" className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">98% Okupansi</p>
                <p className="text-sm text-gray-500">Paling dicari mahasiswa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section id="kamar" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Unit Pilihan Kami</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Tersedia berbagai pilihan kamar yang telah kami rancang untuk kenyamanan maksimal Anda.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {INITIAL_ROOMS.map(room => (
              <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition group">
                <div className="relative h-56">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${room.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {room.status === 'Available' ? 'Tersedia' : 'Terisi'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{room.name} - {room.type}</h3>
                    <div className="flex items-center text-yellow-500 gap-1">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-medium text-gray-700">4.9</span>
                    </div>
                  </div>
                  <p className="text-indigo-600 font-bold text-lg mb-4">{formatIDR(room.price)}<span className="text-sm text-gray-500 font-normal"> / bulan</span></p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.facilities.slice(0, 3).map(f => (
                      <span key={f} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="kontak" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-6">KostPro Management</h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              Membantu pengelolaan kost lebih profesional dan efisien sejak 2020. Kepuasan penghuni adalah prioritas kami.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-indigo-500" />
                <span>Jl. Pendidikan No. 42, Sleman, Yogyakarta</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={20} className="text-indigo-500" />
                <span>+62 812 3456 7890</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white">Beranda</a></li>
              <li><a href="#kamar" className="hover:text-white">Daftar Kamar</a></li>
              <li><a href="#fasilitas" className="hover:text-white">Fasilitas</a></li>
              <li><Link to="/" className="hover:text-white">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-4 text-gray-400">
              <li>Senin - Jumat: 08:00 - 20:00</li>
              <li>Sabtu: 09:00 - 18:00</li>
              <li>Minggu: Tutup (Emergency Only)</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 KostPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
