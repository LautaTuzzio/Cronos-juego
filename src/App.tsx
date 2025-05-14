import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameModesPage from './pages/GameModesPage';
import InstructionsPage from './pages/InstructionsPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import WikiPage from './pages/WikiPage';
import { GameProvider } from './contexts/GameContext';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <GameProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game-modes/:civilizationId" element={<GameModesPage />} />
            <Route path="/instructions/:civilizationId/:mode" element={<InstructionsPage />} />
            <Route path="/play/:civilizationId/:mode" element={<GamePage />} />
            <Route path="/results/:civilizationId/:mode" element={<ResultsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/:civilizationId" element={<WikiPage />} />
            <Route path="/wiki/:civilizationId/:eventId" element={<WikiPage />} />
          </Routes>
        </Layout>
      </GameProvider>
    </Router>
  );
}

export default App;