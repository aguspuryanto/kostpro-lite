
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  MessageSquare, 
  History,
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatIDR, generateWhatsAppLink } from '../utils/helpers';

const INITIAL_RESIDENTS = [
  { id: '1', name: 'Andi Pratama', phone: '628123456789', roomId: 'A-101', startDate: '2024-01-28', endDate: '2024-05-28', status: 'Active' },
  { id: '2', name: 'Budi Santoso', phone: '628123456780', roomId: 'A-102', startDate: '2024-03-26', endDate: '2024-05-26', status: 'Active' },
  { id: '3', name: 'Citra Dewi', phone: '628123456781', roomId: 'B-201', startDate: '2023-12-02', endDate: '2024-06-02', status: 'Active' },
  { id: '4', name: 'Dian Sastro', phone: '628123456782', roomId: 'C-301', startDate: '2023-01-10', endDate: '2024-01-10', status: 'Alumni' },
];

const Residents: React.FC = () => {
  const [filter, setFilter] = useState<'Active' | 'Alumni' | 'All'>('All');

  const filteredResidents = INITIAL_RESIDENTS.filter(r => 
    filter === 'All' ? true : r.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Penghuni</h1>
          <p className="text-gray-500">Kelola riwayat sewa dan perpanjangan.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
          <Plus size={20} />
          Pendaftaran Baru
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
            <button 
              onClick={() => setFilter('All')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition ${filter === 'All' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('Active')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition ${filter === 'Active' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Aktif
            </button>
            <button 
              onClick={() => setFilter('Alumni')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition ${filter === 'Alumni' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Alumni
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari penghuni..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Nama Penghuni</th>
                <th className="px-6 py-4">Kamar</th>
                <th className="px-6 py-4">Periode Sewa</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResidents.map(resident => (
                <tr key={resident.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {resident.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{resident.name}</p>
                        <p className="text-xs text-gray-500">{resident.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{resident.roomId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{resident.startDate} s/d</p>
                      <p className="font-bold text-indigo-600">{resident.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      resident.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {resident.status === 'Active' ? 'Aktif' : 'Alumni'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a 
                        href={generateWhatsAppLink(resident.phone, `Halo ${resident.name}...`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <MessageSquare size={18} />
                      </a>
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Perpanjang Sewa">
                        <Clock size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Residents;
