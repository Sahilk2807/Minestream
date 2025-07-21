import Image from 'next/image';

export default function MovieCard({ content, onCardClick }) {
  return (
    <div onClick={() => onCardClick(content)} className="cursor-pointer group">
      <div className="relative aspect-[2/3] bg-light-dark rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
        <Image
          src={content.poster}
          alt={content.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded">
          DUB
        </div>
        {content.type === 'anime' && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
            EP {content.episodes?.length || 1}
          </div>
        )}
      </div>
      <h3 className="text-white text-md font-semibold mt-2 truncate">{content.title}</h3>
    </div>
  );
}