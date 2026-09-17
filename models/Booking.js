import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  time: { type: String, required: true }, // VD: "14:30"
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);