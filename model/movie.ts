import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMovie extends Document {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
    createdAt?: Date; 
    updatedAt?: Date; 
}

const movieSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        genre: { type: String, required: true },
        rating: { type: Number, required: true },
        streamingLink: { type: String, required: true },
    },
    {
        timestamps: true, 
    }
);

const Movie: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
