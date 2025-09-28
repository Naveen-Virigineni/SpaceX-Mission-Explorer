import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLaunchById } from '../services/spacexAPI';
import type { LaunchWithRocketName } from '../types';

const LaunchDetail = () => {
  const { launchId } = useParams<{ launchId: string }>();
  const [launch, setLaunch] = useState<LaunchWithRocketName | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!launchId) return;

    const fetchLaunch = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLaunchById(launchId);
        if (data) {
          setLaunch(data);
        } else {
          setError('Mission not found.');
        }
      } catch (err) {
        setError('Failed to fetch launch details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLaunch();
  }, [launchId]);

  if (loading) {
    return <div className="text-center p-10 text-slate-500">Loading mission details...</div>;
  }

  if (error || !launch) {
    return (
        <div className="text-center p-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Mission not found.'}</h2>
            <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                &larr; Back to All Missions
            </Link>
        </div>
    );
  }

  const patchImageUrl = launch.links.patch?.small;

  return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left Side: Mission Patch */}
                <div className="flex-shrink-0 text-center">
                    {patchImageUrl ? (
                    <img src={patchImageUrl} alt={`${launch.name} patch`} className="w-40 h-40 mx-auto rounded-lg shadow-md" />
                    ) : (
                    <div className="w-40 h-40 bg-slate-200 rounded-lg shadow-md flex items-center justify-center text-slate-500 text-center mx-auto">
                        No Patch Available
                    </div>
                    )}
                </div>

                {/* Right Side: Details */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">{launch.name}</h1>
                    <p className="text-md text-slate-500 mb-4">
                    <strong>Rocket:</strong> {launch.rocketName}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                    {launch.details || "No details provided for this mission."}
                    </p>

                    {/* Links */}
                    <div className="mt-6 flex flex-wrap gap-4">
                    {launch.links.wikipedia && (
                        <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Wikipedia
                        </a>
                    )}
                    {launch.links.webcast && (
                        <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Watch Webcast
                        </a>
                    )}
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center mt-8">
            <Link to="/" className="text-blue-500 hover:underline">&larr; Back to All Missions</Link>
        </div>
    </div>
  );
};

export default LaunchDetail;