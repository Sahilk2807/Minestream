const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  episode_number: { type: Number, required: true },
  title: { type: String, required: true },
  stream_url: { type: String, required: true },
  download_url: { type: String },
});

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  release_year: { type: Number },
  type: { type: String, enum: ['movie', 'anime'], required: true },
  category: { type: [String], required: true },
  stream_url: { type: String },
  download_url: { type: String },
  episodes: [EpisodeSchema],
  tmdb_id: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);