// src/pages/LaunchList.tsx
import { useState, useEffect, useMemo } from 'react';
import { queryLaunches } from '../services/spacexAPI';
import type { LaunchWithRocketName } from '../types';
import LaunchCard from '../components/LaunchCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useDebounce } from '../hooks/useDebounce';

const LaunchList = () => {
  // --- All state management from your old App.tsx goes here ---
  const [launches, setLaunches] = useState<LaunchWithRocketName[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSuccessOnly, setIsSuccessOnly] = useState<boolean>(false);
  const [isFavoritesOnly, setIsFavoritesOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  
  const itemsPerPage = 12;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteLaunches');
    return saved ? JSON.parse(saved) : [];
  });

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2006; year--) {
      years.push(year.toString());
    }
    return years;
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteLaunches', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      const filters = {
        searchTerm: debouncedSearchTerm,
        isSuccessOnly: isSuccessOnly,
        year: selectedYear,
        page: currentPage,
        limit: itemsPerPage,
      };
      const data = await queryLaunches(filters);
      setLaunches(data.launches);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchLaunches();
  }, [debouncedSearchTerm, isSuccessOnly, selectedYear, currentPage]);

  const handleToggleFavorite = (launchId: string) => {
    setFavoriteIds(prev =>
      prev.includes(launchId) ? prev.filter(id => id !== launchId) : [...prev, launchId]
    );
  };

  const displayedLaunches = isFavoritesOnly
    ? launches.filter(launch => favoriteIds.includes(launch.id))
    : launches;

  return (
    <>
      <div className="space-y-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Filters
          availableYears={availableYears}
          selectedYear={selectedYear}
          onYearChange={(year) => {
            setSelectedYear(year);
            setCurrentPage(1); // <-- RESET PAGE ON YEAR CHANGE
          }}
          isSuccessOnly={isSuccessOnly}
          onSuccessChange={(isChecked) => {
            setIsSuccessOnly(isChecked);
            setCurrentPage(1); // <-- RESET PAGE ON SUCCESS CHANGE
          }}
          isFavoritesOnly={isFavoritesOnly}
          onFavoritesChange={setIsFavoritesOnly}
        />
      </div>
      <div className="mt-8 relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center z-10">
            <p className="text-slate-500 text-lg">Loading missions...</p>
          </div>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${loading ? 'opacity-50' : ''}`}>
          {displayedLaunches.map(launch => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              isFavorite={favoriteIds.includes(launch.id)}
              onFavoriteToggle={handleToggleFavorite}
            />
          ))}
        </div>
        {displayedLaunches.length === 0 && !loading && (
          <div className="text-center bg-white p-10 rounded-lg shadow-sm border border-slate-200 mt-10">
            <h3 className="text-xl font-semibold text-slate-700">No Missions Found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </>
  );
};

export default LaunchList;