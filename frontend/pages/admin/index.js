import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

// NOTE: This is a simple implementation. For a real app, use a more secure auth method.
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check for admin password from environment variables
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };
  
  const fetchContent = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`);
      setContent(res.data);
    } catch (error) {
      console.error("Failed to fetch content for admin", error);
      alert("Could not fetch content. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/delete/${id}`, {
          headers: { 'Authorization': ADMIN_PASSWORD }
        });
        fetchContent(); // Refresh list after deleting
      } catch (error) {
        alert('Failed to delete. Check console for details.');
        console.error("Delete error:", error);
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-deep-dark text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep-dark">
        <form onSubmit={handleLogin} className="p-8 bg-light-dark rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-white text-2xl mb-4 font-bold text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button type="submit" className="w-full mt-4 p-3 bg-brand-purple text-white rounded font-bold hover:bg-brand-light transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-deep-dark min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* THIS LINK IS NOW ACTIVE */}
        <Link href="/admin/add" className="mb-6 inline-block bg-green-600 text-white py-2 px-5 rounded-lg font-bold hover:bg-green-700 transition-colors">
          Add New Content
        </Link>
        
        <p className="text-white/50 mb-6">Here you can view and delete existing content.</p>
        <div className="space-y-4">
          {content.length > 0 ? (
            content.map(item => (
              <div key={item._id} className="bg-light-dark p-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={item.poster} alt={item.title} className="w-12 h-auto rounded" />
                    <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {item.release_year}</p>
                    </div>
                </div>
                <div>
                  {/* Edit button can be added later */}
                  {/* <Link href={`/admin/edit/${item._id}`} className="text-blue-400 mr-4">Edit</Link> */}
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-400 font-semibold">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-light-dark p-6 rounded-lg text-center text-gray-400">
                <p>No content has been added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}