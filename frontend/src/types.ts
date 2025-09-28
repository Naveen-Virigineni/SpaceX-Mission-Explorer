// src/types.ts

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string; // This is a rocket ID
  success: boolean | null;
  links: {
    patch: any;
    wikipedia: any;
    webcast: string | null;
  };
  details: string | null;
}

export interface Rocket {
  id: string;
  name: string;
}

// This will be our final, combined type
export interface LaunchWithRocketName extends Launch {
  rocketName: string;
}