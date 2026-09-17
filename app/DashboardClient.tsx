"use client";
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API (Controller) để lấy dữ liệu (Model)
    const fetchTodayBookings = async () => {
      const res = await fetch('/api/bookings');
      const result = await res.json();
      if (result.success) {
        setBookings(result.data);
      }
      setLoading(false);
    };

    fetchTodayBookings();
  }, []);

  if (loading) return <p>Đang tải lịch trình...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lịch Spa Hôm Nay</h1>
      
      <div className="bg-white shadow rounded-lg p-4">
        {bookings.length === 0 ? (
          <p className="text-gray-500">Chưa có lịch đặt nào trong ngày hôm nay.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Thời gian</th>
                <th className="py-2">Khách hàng</th>
                <th className="py-2">Dịch vụ</th>
                <th className="py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-semibold text-blue-600">{booking.time}</td>
                  <td className="py-3">
                    {booking.customerName} <br/> 
                    <span className="text-sm text-gray-500">{booking.phone}</span>
                  </td>
                  <td className="py-3">{booking.service}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}