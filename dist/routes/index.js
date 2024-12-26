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
const express_1 = __importDefault(require("express"));
const moviecontroller_1 = __importDefault(require("../controller/moviecontroller"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const router = express_1.default.Router();
router.get('/movies', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield moviecontroller_1.default.getAllMovies();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/search', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield moviecontroller_1.default.searchMovies(req.query.q);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post('/movie', middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield moviecontroller_1.default.addNewMovies(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        next();
    }
}));
router.put('/movie/:movieId', middleware_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield moviecontroller_1.default.updateMovie(req.params.movieId, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        next();
    }
}));
router.delete('/movie/:movieId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield moviecontroller_1.default.deleteMovie(req.params.movieId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
