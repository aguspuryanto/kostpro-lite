
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance';

export interface Room {
  id: string;
  name: string;
  type: string; // e.g., Deluxe, Standard
  price: number;
  image: string;
  status: RoomStatus;
  description: string;
  facilities: string[];
}

export interface Resident {
  id: string;
  name: string;
  phone: string;
  roomId: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Alumni';
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  description: string;
  residentId?: string;
}

export type TicketStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface MaintenanceTicket {
  id: string;
  roomId: string;
  residentName: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  technician?: string;
  image?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  occupancyRate: number;
  pendingBills: number;
  upcomingExpirations: number;
}
