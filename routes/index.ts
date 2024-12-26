import express, { Request, Response, NextFunction } from 'express';
import movieController from '../controller/moviecontroller';
import adminMiddleware from '../utils/middleware';

const router = express.Router();

router.get('/movies', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await movieController.getAllMovies();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await movieController.searchMovies(req.query.q as string);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/movie', adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await movieController.addNewMovies(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        next();
    }
});

router.put('/movie/:movieId', adminMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await movieController.updateMovie(req.params.movieId, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        next();
    }
});

router.delete('/movie/:movieId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await movieController.deleteMovie(req.params.movieId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
