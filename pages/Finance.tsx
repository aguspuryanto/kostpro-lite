
import React, { useState } from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Download, 
  Plus, 
  FileText,
  Filter
} from 'lucide-react';
import { formatIDR, downloadCSV } from '../utils/helpers';

const TRANSACTIONS = [
  { id: 'TRX-001', date: '2024-05-15', type: 'Income', category: 'Sewa Kamar', amount: 2500000, desc: 'Pembayaran Andi P (A-101)' },
  { id: 'TRX-002', date: '2024-05-14', type: 'Expense', category: 'Listrik', amount: 1200000, desc: 'Tagihan PLN Bulanan' },
  { id: 'TRX-003', date: '2024-05-12', type: 'Income', category: 'Sewa Kamar', amount: 1500000, desc: 'Pembayaran Budi S (A-102)' },
  { id: 'TRX-004', date: '2024-05-10', type: 'Expense', category: 'Kebersihan', amount: 300000, desc: 'Iuran Sampah & Keamanan' },
  { id: 'TRX-005', date: '2024-05-08', type: 'Income', category: 'Deposit', amount: 500000, desc: 'Booking Fee Kamar B-202' },
];

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense'>('All');

  const filteredData = TRANSACTIONS.filter(t => 
    activeTab === 'All' ? true : t.type === activeTab
  );

  const totalIncome = TRANSACTIONS.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = TRANSACTIONS.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const handleExportCSV = () => {
    downloadCSV(TRANSACTIONS, `Laporan_Keuangan_Mei_2024`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Keuangan</h1>
          <p className="text-gray-500">Pantau arus kas dan laba bersih kost.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition"
          >
            <Download size={18} />
            Export Excel
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
            <Plus size={18} />
            Catat Transaksi
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <ArrowUpCircle size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pemasukan</p>
            <p className="text-xl font-bold text-gray-900">{formatIDR(totalIncome)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <ArrowDownCircle size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pengeluaran</p>
            <p className="text-xl font-bold text-gray-900">{formatIDR(totalExpense)}</p>
          </div>
        </div>
        <div className="bg-indigo-600 p-6 rounded-xl shadow-md flex items-center gap-4 text-white">
          <div className="p-3 bg-indigo-500/30 rounded-full">
            <FileText size={32} />
          </div>
          <div>
            <p className="text-sm text-indigo-100 font-medium">Laba Bersih (Mei)</p>
            <p className="text-xl font-bold">{formatIDR(netProfit)}</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('All')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === 'All' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setActiveTab('Income')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === 'Income' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
            >
              Pemasukan
            </button>
            <button 
              onClick={() => setActiveTab('Expense')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === 'Expense' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
            >
              Pengeluaran
            </button>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-indigo-600">
            <Filter size={16} />
            Filter Lanjutan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4 text-right">Nominal</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map(trx => (
                <tr key={trx.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-500">{trx.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trx.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">{trx.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{trx.desc}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${trx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {trx.type === 'Income' ? '+' : '-'} {formatIDR(trx.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Paid</span>
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

export default Finance;
