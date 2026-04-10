'use client';

import StatusBadge from './StatusBadge';

interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  status: string;
}

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const statusOptions = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

export default function BookingTable({ bookings, onStatusChange, onDelete, showActions = true }: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Customer</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Phone</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Service</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
            {showActions && (
              <th className="text-left py-3 px-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 7 : 6} className="py-12 text-center text-gray-400">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900">{booking.customerName}</td>
                <td className="py-4 px-4 text-slate-600 font-medium">{booking.email}</td>
                <td className="py-4 px-4 text-slate-600 font-medium">{booking.phone}</td>
                <td className="py-4 px-4 text-slate-700 font-bold">{booking.serviceType}</td>
                <td className="py-4 px-4 text-slate-600 font-medium">
                  {new Date(booking.preferredDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  {showActions && onStatusChange ? (
                    <select
                      value={booking.status}
                      onChange={(e) => onStatusChange(booking._id, e.target.value)}
                      className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <StatusBadge status={booking.status} />
                  )}
                </td>
                {showActions && (
                  <td className="py-3 px-4">
                    {onDelete && (
                      <button
                        onClick={() => onDelete(booking._id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
