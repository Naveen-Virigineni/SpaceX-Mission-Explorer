import type { LaunchWithRocketName } from '../types';
import { Link } from 'react-router-dom';

interface LaunchCardProps {
  launch: LaunchWithRocketName;
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
}

const LaunchCard = ({ launch, onFavoriteToggle, isFavorite }:LaunchCardProps) => {
  const launchDate = new Date(launch.date_utc).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Stop propagation on the favorite button so it doesn't trigger the modal
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(launch.id);
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 flex flex-col h-full cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
      // Trigger modal on card click
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-lg text-slate-800 pr-2">{launch.name}</h3>
        <button
          className={`text-2xl transition-colors duration-200 ${isFavorite ? 'text-yellow-400' : 'text-slate-300'} hover:text-yellow-400`}
          onClick={handleFavoriteClick}
          aria-label="Favorite this launch"
        >
          &#9733;
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        {launchDate} - {launch.rocketName}
      </p>
      {launch.details && (
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {launch.details}
        </p>
      )}
      <div className="mt-auto pt-4">
        <Link to={`/launch/${launch.id}`}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default LaunchCard;