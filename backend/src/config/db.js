import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

export const connectDatabase = () =>
  mongoose.connect(env.MONGO_URI, {
    autoIndex: !env.isProduction,
    serverSelectionTimeoutMS: 10_000,
  });

export const disconnectDatabase = () => mongoose.disconnect();
