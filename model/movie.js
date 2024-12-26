const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true },
},{
  timestamps: true
});

const movies = mongoose.model('movies', movieSchema);

module.exports = movies;