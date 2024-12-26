import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

async function connect(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log({ message: 'connected without authentication' });
    } catch (error) {
        console.error({ message: 'Error while connecting mongo', error });
    }
}

export { connect };
