// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import LaunchList from './pages/LaunchList';
import LaunchDetail from './pages/LaunchDetail';

function App() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Atmosly - SpaceX Mission Explorer</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LaunchList />} />
            <Route path="/launch/:launchId" element={<LaunchDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;