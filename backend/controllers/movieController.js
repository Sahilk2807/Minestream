const Movie = require('../models/Movie');
const axios = require('axios');

exports.getAllContent = async (req, res) => {
    try {
        const content = await Movie.find().sort({ createdAt: -1 });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContentById = async (req, res) => {
    try {
        const content = await Movie.findById(req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchContent = async (req, res) => {
    const { q } = req.query;
    if (!q || q.length < 3) {
        return res.status(400).json({ message: 'Search query must be at least 3 characters long.' });
    }
    try {
        const content = await Movie.find({
            title: { $regex: q, $options: 'i' }
        });
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addContent = async (req, res) => {
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const updatedContent = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if (!updatedContent) return res.status(404).json({ message: 'Content not found' });
        res.json(updatedContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteContent = async (req, res) => {
    try {
        const content = await Movie.findByIdAndDelete(req.params.id);
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json({ message: 'Content deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.fetchTMDb = async (req, res) => {
    const { tmdbId, type } = req.query;
    if (!tmdbId || !type) {
        return res.status(400).json({ message: 'TMDb ID and type are required' });
    }
    const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        const metadata = {
            title: data.title || data.name,
            description: data.overview,
            poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            release_year: new Date(data.release_date || data.first_air_date).getFullYear(),
            category: data.genres.map(g => g.name),
            tmdb_id: data.id,
        };
        res.json(metadata);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch from TMDb', error: error.message });
    }
};