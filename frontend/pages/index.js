import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import HeroCarousel from '@/components/HeroCarousel';
import DetailModal from '@/components/DetailModal';

const SectionTitle = ({ title }) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <a href="#" className="text-brand-purple font-semibold text-sm">VIEW ALL ></a>
    </div>
);

export default function Home({ allContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleCardClick = (content) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  const trending = allContent.slice(0, 12);
  const latest = [...allContent].reverse().slice(0, 12);

  return (
    <div className="bg-deep-dark min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <HeroCarousel items={trending} onWatchNow={handleCardClick} />

        <section className="mb-12">
            <SectionTitle title="Popular Today" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {trending.map(item => (
                    <MovieCard key={item._id} content={item} onCardClick={handleCardClick} />
                ))}
            </div>
        </section>

        <section className="mb-12">
            <SectionTitle title="Latest Releases" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {latest.map(item => (
                    <MovieCard key={item._id} content={item} onCardClick={handleCardClick} />
                ))}
            </div>
        </section>
      </main>

      <a 
        href="#" // Your Discord link
        target="_blank" 
        rel="noopener noreferrer"
        className="hidden md:block fixed bottom-20 right-5 bg-brand-purple text-white font-bold py-3 px-5 rounded-lg shadow-lg hover:bg-brand-light transition-colors"
      >
        JOIN OUR DISCORD COMMUNITY!
      </a>
      
      {isModalOpen && <DetailModal content={selectedContent} onClose={closeModal} />}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`);
    return { props: { allContent: res.data } };
  } catch (error) {
    console.error("Failed to fetch initial content", error);
    return { props: { allContent: [] } };
  }
}