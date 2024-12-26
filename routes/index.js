const express = require('express')
const router = express.Router();
const movieController = require('../controller/moviecontroller');
const adminMiddleware = require('../utils/middleware');

router.get('/movies', async (req, res, next) => {
    try {
        const result = await movieController.getAllMovies();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req, res, next)=>{
    try{
        const result = await movieController.searchMovies(req.query.q);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.post('/movie', adminMiddleware, async (req, res, next)=>{
    try{
        const result = await movieController.addNewMovies(req.body);
        res.status(201).json(result);
    } catch(error){
        res.status(500).json({ error: error.message });
        next();
    }
});

router.put('/movie/:movieId', adminMiddleware, async (req, res, next)=>{
    try{
        const result = await movieController.updateMovie(req.params.movieId, req.body);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({ error: error.message });
        next();
    }
});

router.delete('/movie/:movieId', async (req, res, next)=>{
    try{
        const result = await movieController.deleteMovie(req.params.movieId, req.body);
        res.status(200).json(result);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;