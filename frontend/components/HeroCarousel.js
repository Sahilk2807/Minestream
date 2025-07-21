import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { HiPlay } from 'react-icons/hi';

export default function HeroCarousel({ items, onWatchNow }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full h-[50vh] md:h-[60vh] mb-8">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="h-full"
      >
        {items.slice(0, 5).map((item) => (
          <SwiperSlide key={item._id} className="relative">
            <Image
              src={item.poster}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-dark via-deep-dark/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-3xl md:text-5xl font-bold">{item.title}</h2>
              <div className="flex items-center space-x-2 my-4">
                <span className="bg-white/20 px-2 py-1 rounded text-xs">{item.type.toUpperCase()}</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs">HD</span>
              </div>
              <button
                onClick={() => onWatchNow(item)}
                className="flex items-center space-x-2 bg-brand-purple hover:bg-brand-light transition-colors text-white font-bold py-3 px-6 rounded-lg"
              >
                <HiPlay className="text-2xl" />
                <span>Watch Now</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}