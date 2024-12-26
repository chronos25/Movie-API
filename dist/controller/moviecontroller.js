"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMovies = getAllMovies;
exports.searchMovies = searchMovies;
exports.addNewMovies = addNewMovies;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;
const movie_1 = __importDefault(require("../model/movie"));
function getAllMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received request to get all the movies");
            const moviesList = yield movie_1.default.find();
            return moviesList;
        }
        catch (error) {
            console.error("Error while getting all movies", error);
            throw error;
        }
    });
}
function searchMovies(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received request to filter movies by title or genre", filter);
            const moviesList = yield movie_1.default.find({
                $or: [
                    { title: { $regex: filter, $options: 'i' } },
                    { genre: { $regex: filter, $options: 'i' } },
                ],
            });
            return moviesList;
        }
        catch (error) {
            console.error("Error while filtering movies by title or genre", error);
            throw error;
        }
    });
}
function addNewMovies(reqMoviePayload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received request to add new movies");
            const { title, genre, rating, streamingLink } = reqMoviePayload;
            const movie = new movie_1.default({ title, genre, rating, streamingLink });
            yield movie.save();
            return movie;
        }
        catch (error) {
            console.error("Error while adding new movies", error);
            throw error;
        }
    });
}
function updateMovie(id, movie) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received request to update movie", id, movie);
            const updatedMovie = yield movie_1.default.findByIdAndUpdate(id, movie, { new: true });
            return updatedMovie;
        }
        catch (error) {
            console.error("Error while updating the movie", error);
            throw error;
        }
    });
}
function deleteMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received request to delete a movie", id);
            const movie = yield movie_1.default.findByIdAndDelete(id);
            return movie;
        }
        catch (error) {
            console.error("Error while deleting the movie", error);
            throw error;
        }
    });
}
exports.default = {
    getAllMovies,
    searchMovies,
    addNewMovies,
    updateMovie,
    deleteMovie,
};
