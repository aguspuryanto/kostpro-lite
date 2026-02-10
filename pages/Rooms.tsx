
import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Camera } from 'lucide-react';
import { INITIAL_ROOMS } from '../constants';
import { formatIDR } from '../utils/helpers';
import { Room } from '../types';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kamar</h1>
          <p className="text-gray-500">Atur unit, harga, dan ketersediaan.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
          <Plus size={20} />
          Tambah Kamar Baru
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama kamar atau tipe..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
            <div className="relative h-48">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                room.status === 'Available' ? 'bg-green-500 text-white' : 
                room.status === 'Occupied' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {room.status === 'Available' ? 'Tersedia' : room.status === 'Occupied' ? 'Terisi' : 'Perbaikan'}
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-indigo-600 hover:text-white transition">
                  <Camera size={20} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{room.type}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{room.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">{formatIDR(room.price)}<span className="text-xs text-gray-500 font-normal"> / bln</span></p>
                <button className="text-indigo-600 text-sm font-bold hover:underline">Detail Unit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
