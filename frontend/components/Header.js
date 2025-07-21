import Link from 'next/link';
import { HiMenu, HiSearch, HiStar } from 'react-icons/hi';

export default function Header() {
  return (
    <header className="bg-deep-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button className="text-2xl">
          <HiMenu />
        </button>
        <Link href="/" className="text-2xl font-extrabold tracking-wider">
          MINETREAM
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-2xl">
            <HiSearch />
          </button>
          <button className="text-2xl text-brand-purple">
            <HiStar />
          </button>
        </div>
      </nav>
    </header>
  );
}