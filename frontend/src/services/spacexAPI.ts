// src/services/spacexAPI.ts

import axios from 'axios';
// We now only need the Launch and Rocket types here
import type { Launch, Rocket, LaunchWithRocketName } from '../types';

const API_URL = 'https://api.spacexdata.com/v4';

interface PaginatedLaunchResponse {
  docs: Launch[];
  totalPages: number;
}

export interface QueryFilters {
  searchTerm: string;
  isSuccessOnly: boolean;
  year: string;
  page: number;
  limit: number;
}

// Helper function to process a launch object
const processLaunch = (launch: Launch): LaunchWithRocketName => {
    let rocketName = 'Unknown Rocket';
    if (typeof launch.rocket === 'object' && launch.rocket !== null) {
        rocketName = (launch.rocket as Rocket).name;
    }
    return {
        ...launch,
        rocketName,
    };
};


// --- NEW FUNCTION TO GET A SINGLE LAUNCH BY ID ---
export const getLaunchById = async (id: string): Promise<LaunchWithRocketName | null> => {
  try {
    const response = await axios.post<PaginatedLaunchResponse>(`${API_URL}/launches/query`, {
      query: { _id: id },
      options: {
        limit: 1,
        populate: ['rocket'],
      },
    });

    if (response.data.docs.length > 0) {
      return processLaunch(response.data.docs[0]);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching launch with id ${id}:`, error);
    throw error; // Re-throw the error to be caught by the component
  }
};

export const queryLaunches = async (filters: QueryFilters) => {
  try {
    const query: any = {};
    if (filters.searchTerm) {
      query.name = { $regex: filters.searchTerm, $options: 'i' };
    }
    if (filters.isSuccessOnly) {
      query.success = true;
    }

    if (filters.year && filters.year !== 'All') {
      const startDate = new Date(`${filters.year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${parseInt(filters.year) + 1}-01-01T00:00:00.000Z`);
      query.date_utc = {
        $gte: startDate.toISOString(),
        $lt: endDate.toISOString()
      };
    }

    const options = {
      page: filters.page,
      limit: filters.limit,
      sort: { date_utc: 'desc' },
      populate: ['rocket']
    };

    const response = await axios.post<PaginatedLaunchResponse>(`${API_URL}/launches/query`, {
      query,
      options,
    });
    
    const launchesWithRocketNames = response.data.docs.map(launch => {
      let rocketName = 'Unknown Rocket';

      if (typeof launch.rocket === 'object' && launch.rocket !== null) {
        // --- THIS IS THE FIX ---
        // We cast launch.rocket to the Rocket type to resolve the 'never' error.
        rocketName = (launch.rocket as Rocket).name;
      }
      
      return {
        ...launch,
        rocketName
      };
    });
    
    return {
      launches: launchesWithRocketNames,
      totalPages: response.data.totalPages
    };

  } catch (error) {
    console.error("Error querying SpaceX data:", error);
    return { launches: [], totalPages: 0 };
  }
};