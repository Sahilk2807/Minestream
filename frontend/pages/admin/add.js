import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AddContentPage() {
    const router = useRouter();
    const [tmdbId, setTmdbId] = useState('');
    const [tmdbType, setTmdbType] = useState('movie'); // 'movie' or 'tv' for anime/series
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        poster: '',
        release_year: '',
        type: 'movie', // 'movie' or 'anime'
        category: '', // This will be a comma-separated string
        stream_url: '',
        download_url: '',
        episodes: []
    });
    const [isFetching, setIsFetching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFetchFromTMDb = async () => {
        if (!tmdbId) {
            alert('Please enter a TMDb ID.');
            return;
        }
        setIsFetching(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tmdb/fetch?tmdbId=${tmdbId}&type=${tmdbType}`, {
                headers: { 'Authorization': process.env.NEXT_PUBLIC_ADMIN_PASSWORD }
            });
            const data = res.data;
            setFormData(prev => ({
                ...prev,
                title: data.title,
                description: data.description,
                poster: data.poster,
                release_year: data.release_year,
                category: data.category.join(', '), // Convert array to comma-separated string for the input
            }));
        } catch (error) {
            alert('Failed to fetch from TMDb. Check the ID and type.');
            console.error('TMDb fetch error:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Convert comma-separated category string back to an array
            const finalData = {
                ...formData,
                category: formData.category.split(',').map(cat => cat.trim()).filter(Boolean),
            };

            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/add`, finalData, {
                headers: { 'Authorization': process.env.NEXT_PUBLIC_ADMIN_PASSWORD }
            });
            alert('Content added successfully!');
            router.push('/admin'); // Go back to the dashboard
        } catch (error) {
            alert('Failed to add content.');
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Simple helper for form fields
    const FormField = ({ label, name, value, onChange, placeholder, required = false, type = "text" }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            />
        </div>
    );

    return (
        <div className="p-4 sm:p-8 bg-deep-dark min-h-screen text-white">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Add New Content</h1>
                
                {/* TMDb Fetch Section */}
                <div className="bg-light-dark p-4 rounded-lg mb-8">
                    <h2 className="text-xl font-semibold mb-3">Fetch from TMDb</h2>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="TMDb ID (e.g., 550)"
                            value={tmdbId}
                            onChange={(e) => setTmdbId(e.target.value)}
                            className="flex-grow p-2 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <select
                            value={tmdbType}
                            onChange={(e) => setTmdbType(e.target.value)}
                            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                        >
                            <option value="movie">Movie</option>
                            <option value="tv">TV/Anime</option>
                        </select>
                    </div>
                    <button
                        onClick={handleFetchFromTMDb}
                        disabled={isFetching}
                        className="w-full p-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:bg-gray-500"
                    >
                        {isFetching ? 'Fetching...' : 'Fetch Data'}
                    </button>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit}>
                    <FormField label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <FormField label="Description" name="description" value={formData.description} onChange={handleChange} required />
                    <FormField label="Poster URL" name="poster" value={formData.poster} onChange={handleChange} required />
                    <FormField label="Release Year" name="release_year" value={formData.release_year} onChange={handleChange} type="number" />
                    <FormField label="Categories (comma-separated)" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Action, Sci-Fi, Anime" required />
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600">
                            <option value="movie">Movie</option>
                            <option value="anime">Anime</option>
                        </select>
                    </div>

                    {formData.type === 'movie' && (
                        <>
                            <FormField label="Movie Stream URL (TeraBox)" name="stream_url" value={formData.stream_url} onChange={handleChange} />
                            <FormField label="Movie Download URL (TeraBox)" name="download_url" value={formData.download_url} onChange={handleChange} />
                        </>
                    )}
                    
                    {/* Note: A proper UI for adding multiple episodes would be more complex. This is a placeholder. */}
                    {formData.type === 'anime' && (
                        <p className="text-yellow-400 text-sm my-4">
                            Anime episode management is not in this form yet. Add the main details here, then use a database tool like MongoDB Compass to add episodes for now.
                        </p>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full mt-4 p-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:bg-gray-500">
                        {isSubmitting ? 'Submitting...' : 'Add Content'}
                    </button>
                </form>
            </div>
        </div>
    );
}