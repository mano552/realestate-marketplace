import mongoose from 'mongoose';
import dns from 'dns';

// Node's own DNS resolver sometimes fails to reach the system/Windows default
// DNS server for SRV lookups (mongodb+srv://), even when the OS itself
// resolves it fine. Forcing Node to use public DNS servers fixes this.
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};