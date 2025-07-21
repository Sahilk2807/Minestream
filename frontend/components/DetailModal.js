import { useState } from 'react';
import Image from 'next/image';
import { HiX, HiDownload, HiPlay } from 'react-icons/hi';

const VideoPlayer = ({ streamUrl }) => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
                src={streamUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen={true}
                sandbox="allow-scripts allow-same-origin"
                controlsList="nodownload"
                referrerPolicy="no-referrer"
            ></iframe>
        </div>
    );
};


export default function DetailModal({ content, onClose }) {
  if (!content) return null;

  const [selectedEpisode, setSelectedEpisode] = useState(
    content.type === 'anime' && content.episodes.length > 0 ? content.episodes[0] : null
  );

  const streamUrl = content.type === 'movie' ? content.stream_url : selectedEpisode?.stream_url;
  const downloadUrl = content.type === 'movie' ? content.download_url : selectedEpisode?.download_url;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-light-dark rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl">
          <HiX />
        </button>

        <div className="mb-4">
          {streamUrl ? (
            <VideoPlayer streamUrl={streamUrl} />
          ) : (
             <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                <p className='text-white/50'>Select an episode to watch</p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-2">{content.title}</h2>
        <p className="text-white/60 text-sm mb-4">{content.description}</p>
        
        {downloadUrl && (
            <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-light transition-colors text-white font-bold py-2 px-4 rounded-lg mb-6"
            >
                <HiDownload />
                <span>Download</span>
            </a>
        )}

        {content.type === 'anime' && content.episodes.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3">Episodes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {content.episodes.map(ep => (
                <button
                  key={ep.episode_number}
                  onClick={() => setSelectedEpisode(ep)}
                  className={`p-3 rounded text-center text-sm font-semibold transition-colors ${selectedEpisode?.episode_number === ep.episode_number ? 'bg-brand-purple text-white' : 'bg-gray-700 hover:bg-gray-600 text-white/80'}`}
                >
                  Ep {ep.episode_number}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}