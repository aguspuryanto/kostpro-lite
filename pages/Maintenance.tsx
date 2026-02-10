
import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Image as ImageIcon,
  MoreVertical,
  Search,
  ChevronRight
} from 'lucide-react';
import { MaintenanceTicket, TicketStatus, TicketPriority } from '../types';
import { INITIAL_TICKETS } from '../constants';

const Maintenance: React.FC = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [filter, setFilter] = useState<TicketStatus | 'All'>('All');
  const [showNewModal, setShowNewModal] = useState(false);

  const filteredTickets = tickets.filter(t => 
    filter === 'All' ? true : t.status === filter
  );

  const stats = {
    pending: tickets.filter(t => t.status === 'Pending').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    completed: tickets.filter(t => t.status === 'Completed').length,
  };

  const updateStatus = (id: string, newStatus: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const getPriorityColor = (p: TicketPriority) => {
    switch (p) {
      case 'Urgent': return 'text-red-700 bg-red-100';
      case 'High': return 'text-orange-700 bg-orange-100';
      case 'Medium': return 'text-yellow-700 bg-yellow-100';
      case 'Low': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (s: TicketStatus) => {
    switch (s) {
      case 'Pending': return <Clock size={16} className="text-orange-500" />;
      case 'In Progress': return <Wrench size={16} className="text-blue-500" />;
      case 'Completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'Cancelled': return <AlertTriangle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pemeliharaan & Perbaikan</h1>
          <p className="text-gray-500">Kelola keluhan fasilitas dan jadwal teknisi.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          Buat Tiket Baru
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Perlu Tindakan</p>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
            <Clock size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Sedang Dikerjakan</p>
            <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
            <Wrench size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase">Selesai (Bulan Ini)</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-500 rounded-lg">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
            {['All', 'Pending', 'In Progress', 'Completed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-4 py-2 text-sm font-bold rounded-md transition ${
                  filter === s ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {s === 'All' ? 'Semua' : s}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari tiket..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none" 
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Problem Image Preview */}
                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative group cursor-pointer">
                  {ticket.image ? (
                    <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={24} />
                      <span className="text-[10px] mt-1 font-bold">TIDAK ADA FOTO</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white text-xs font-bold">Lihat Foto</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{ticket.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Kamar <span className="font-bold text-gray-700">{ticket.roomId}</span> • Diajukan oleh <span className="font-bold text-gray-700">{ticket.residentName}</span></p>
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-200 rounded-full transition">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{ticket.description}</p>

                  <div className="flex flex-wrap items-center gap-y-4 gap-x-6 pt-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <span className="text-sm font-bold text-gray-700">{ticket.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Teknisi: <span className="font-medium">{ticket.technician || 'Belum ditugaskan'}</span></span>
                    </div>
                    <div className="text-sm text-gray-400 italic">
                      Dibuat pada {ticket.createdAt}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {ticket.status === 'Pending' && (
                      <button 
                        onClick={() => updateStatus(ticket.id, 'In Progress')}
                        className="text-xs bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-600 hover:text-white transition"
                      >
                        Tugaskan Teknisi
                      </button>
                    )}
                    {ticket.status === 'In Progress' && (
                      <button 
                        onClick={() => updateStatus(ticket.id, 'Completed')}
                        className="text-xs bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-green-600 hover:text-white transition"
                      >
                        Tandai Selesai
                      </button>
                    )}
                    <button className="text-xs border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition">
                      Edit Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="text-gray-300" size={32} />
              </div>
              <p className="text-gray-500 font-medium">Tidak ada tiket perbaikan ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Simple Mock Modal for New Ticket */}
      {showNewModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Ajukan Tiket Perbaikan</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Kamar</label>
                <input type="text" placeholder="Contoh: A-101" className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Judul Masalah</label>
                <input type="text" placeholder="AC Rusak, Kran Bocor, dll" className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Deskripsi Lengkap</label>
                <textarea rows={3} placeholder="Jelaskan detail masalahnya..." className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
              </div>
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center hover:bg-gray-50 transition cursor-pointer">
                <ImageIcon className="mx-auto text-gray-300 mb-2" size={24} />
                <p className="text-xs text-gray-500 font-medium">Klik untuk unggah foto bukti kerusakan</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition"
              >
                Batal
              </button>
              <button 
                onClick={() => setShowNewModal(false)}
                className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-lg"
              >
                Kirim Tiket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
