import { Document, Model } from 'mongoose';
import MovieModel, { IMovie } from '../model/movie'; 

export async function getAllMovies(): Promise<IMovie[]> {
    try {
        console.log("Received request to get all the movies");
        const moviesList = await MovieModel.find();
        return moviesList;
    } catch (error) {
        console.error("Error while getting all movies", error);
        throw error;
    }
}

export async function searchMovies(filter: string): Promise<IMovie[]> {
    try {
        console.log("Received request to filter movies by title or genre", filter);
        const moviesList = await MovieModel.find({
            $or: [
                { title: { $regex: filter, $options: 'i' } },
                { genre: { $regex: filter, $options: 'i' } },
            ],
        });
        return moviesList;
    } catch (error) {
        console.error("Error while filtering movies by title or genre", error);
        throw error;
    }
}

export async function addNewMovies(reqMoviePayload: IMovie): Promise<IMovie> {
    try {
        console.log("Received request to add new movies");
        const { title, genre, rating, streamingLink } = reqMoviePayload;
        const movie = new MovieModel({ title, genre, rating, streamingLink });
        await movie.save();
        return movie;
    } catch (error) {
        console.error("Error while adding new movies", error);
        throw error;
    }
}

export async function updateMovie(id: string, movie: Partial<IMovie>): Promise<IMovie | null> {
    try {
        console.log("Received request to update movie", id, movie);
        const updatedMovie = await MovieModel.findByIdAndUpdate(id, movie, { new: true });
        return updatedMovie;
    } catch (error) {
        console.error("Error while updating the movie", error);
        throw error;
    }
}

export async function deleteMovie(id: string): Promise<IMovie | null> {
    try {
        console.log("Received request to delete a movie", id);
        const movie = await MovieModel.findByIdAndDelete(id);
        return movie;
    } catch (error) {
        console.error("Error while deleting the movie", error);
        throw error;
    }
}

export default {
    getAllMovies,
    searchMovies,
    addNewMovies,
    updateMovie,
    deleteMovie,
};
