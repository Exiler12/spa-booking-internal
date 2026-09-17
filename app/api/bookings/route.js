import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';

// LẤY DANH SÁCH LỊCH TRONG NGÀY
export async function GET(request) {
  await dbConnect();
  
  // Lấy thời điểm bắt đầu và kết thúc của ngày hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const bookings = await Booking.find({
      date: { $gte: today, $lt: tomorrow }
    }).sort({ time: 1 }); // Sắp xếp theo giờ tăng dần
    
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// TẠO LỊCH MỚI
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newBooking = await Booking.create(body);
    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}