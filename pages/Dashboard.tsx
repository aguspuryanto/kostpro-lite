
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Home, 
  AlertCircle,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatIDR, calculateDaysUntil, generateWhatsAppLink } from '../utils/helpers';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 12000000 },
  { month: 'Feb', revenue: 15000000 },
  { month: 'Mar', revenue: 18000000 },
  { month: 'Apr', revenue: 16500000 },
  { month: 'May', revenue: 21000000 },
  { month: 'Jun', revenue: 23500000 },
];

const UPCOMING_DUES = [
  { id: '1', name: 'Andi Pratama', room: 'A-101', dueDate: '2024-05-28', amount: 2500000, phone: '628123456789' },
  { id: '2', name: 'Budi Santoso', room: 'A-102', dueDate: '2024-05-26', amount: 1500000, phone: '628123456780' },
  { id: '3', name: 'Citra Dewi', room: 'B-201', dueDate: '2024-06-02', amount: 3500000, phone: '628123456781' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ringkasan Operasional</h1>
        <p className="text-gray-500">Pantau performa kost Anda secara real-time.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Pendapatan (Mei)" 
          value={formatIDR(21000000)} 
          trend="+12%" 
          icon={<TrendingUp className="text-green-600" />} 
          bgColor="bg-green-50"
        />
        <StatCard 
          label="Okupansi Kamar" 
          value="92%" 
          trend="+5%" 
          icon={<Home className="text-indigo-600" />} 
          bgColor="bg-indigo-50"
        />
        <StatCard 
          label="Penghuni Aktif" 
          value="24 Orang" 
          trend="Tetap" 
          icon={<Users className="text-blue-600" />} 
          bgColor="bg-blue-50"
        />
        <StatCard 
          label="Tagihan Menunggak" 
          value={formatIDR(4500000)} 
          trend="3 Kamar" 
          icon={<AlertCircle className="text-red-600" />} 
          bgColor="bg-red-50"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Pertumbuhan Pendapatan</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `Rp${val/1000000}M`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Peringatan Jatuh Tempo (H-7)</h3>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">Mendesak</span>
          </div>
          <div className="space-y-4">
            {UPCOMING_DUES.map(due => {
              const daysLeft = calculateDaysUntil(due.dueDate);
              const waMsg = `Halo ${due.name}, ini pengingat dari KostPro. Sewa kamar ${due.room} akan berakhir pada ${due.dueDate}. Total tagihan: ${formatIDR(due.amount)}. Silakan lakukan pembayaran tepat waktu. Terima kasih!`;
              
              return (
                <div key={due.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {due.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{due.name} ({due.room})</p>
                      <p className="text-sm text-gray-500">Jatuh tempo: {due.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-right ${daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'}`}>
                      <p className="text-sm font-bold">{daysLeft} Hari Lagi</p>
                      <p className="text-xs">{formatIDR(due.amount)}</p>
                    </div>
                    <a 
                      href={generateWhatsAppLink(due.phone, waMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      title="Kirim Tagihan WhatsApp"
                    >
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; trend: string; icon: React.ReactNode; bgColor: string }> = ({ 
  label, value, trend, icon, bgColor 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
        {trend}
      </span>
    </div>
    <h4 className="text-gray-500 text-sm font-medium">{label}</h4>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;
