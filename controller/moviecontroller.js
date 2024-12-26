const Movies = require('../model/movie');

async function getAllMovies() {
    try{
        console.log("Received request to get all the movies");
        const moviesList = await Movies.find();
        return moviesList;
    } catch(error) {
        console.error("Error while getting all movies", error);
        throw error;
    }
}

async function searchMovies(filter) {
    try{
        console.log("Received request to filter movies by title or genre", filter);
        const moviesList = await Movies.find({
            $or: [
                { title: { $regex: filter, $options: 'i' } },
                { genre: { $regex: filter, $options: 'i' } },
            ],
        });
        return moviesList;
    } catch(error) {
        console.error("Error while filtering movies by title or genre", error);
        throw error;
    }
}

async function addNewMovies(reqMoviePayload) {
    try{
        console.log("Received request to add new movies");
        const { title, genre, rating, streamingLink } = reqMoviePayload;
        const movie = new Movies({title, genre, rating, streamingLink});
        await movie.save();
        return movie;
    } catch(error) {
        console.error("Error while adding new movies", error);
        throw error;
    }
}

async function updateMovie(id, movie) {
    try{
        console.log("Received request to update movie", id, movie);
        const filter = id;
        const update = movie;
        const options = { new: true };
        const updatedmovie = await Movies.findByIdAndUpdate(filter, update, options);
        return updatedmovie;
    } catch(error) {
        console.error("Error while adding new movies", error);
        throw error;
    }
}

async function deleteMovie(id) {
    try{
        console.log("Received request to delete a movie", id);
        const movie = await Movies.findByIdAndDelete(id);
        return movie;
    } catch(error) {
        console.error("Error while adding new movies", error);
        throw error;
    } 
}

module.exports = {
    getAllMovies,
    searchMovies,
    addNewMovies,
    updateMovie,
    deleteMovie
}