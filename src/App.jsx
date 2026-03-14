import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Fixtures from './components/Fixtures';
import PointsTable from './components/PointsTable';
import Stats from './components/Stats';
import Teams from './components/Teams';
import Archives from './components/Archives';
import Gallery from './components/Gallery';
import AdminDashboard from './components/admin/AdminDashboard';
import CaptainDashboard from './components/CaptainDashboard';
import LiveMatch from './components/LiveMatch';
import PublicLiveMatch from './components/PublicLiveMatch';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';

const App = () => {
  const [fixtures, setFixtures] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [stats, setStats] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    // Listen to fixtures
    const unsubscribeFixtures = onSnapshot(collection(db, 'fixtures'), (snapshot) => {
      const fixturesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Optionally sort by some logic, but for now just set
      setFixtures(fixturesData);
    });

    // Listen to points table
    const unsubscribePoints = onSnapshot(collection(db, 'pointsTable'), (snapshot) => {
      const pointsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setPointsTable(pointsData);
    });

    // Listen to stats
    const unsubscribeStats = onSnapshot(collection(db, 'stats'), (snapshot) => {
      const statsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort by score descending, then assign ranks
      statsData.sort((a, b) => b.score - a.score);
      statsData.forEach((player, index) => {
        player.rank = index + 1;
      });
      setStats(statsData);
    });

    // Listen to gallery
    const unsubscribeGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      let galleryImages = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.images && Array.isArray(data.images)) {
          galleryImages = [...galleryImages, ...data.images];
        }
      });
      setGallery(galleryImages);
    });

    // Listen to archives
    const unsubscribeArchives = onSnapshot(collection(db, 'archives'), (snapshot) => {
      const archivesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setArchives(archivesData);
      setLoading(false);
    });

    return () => {
      unsubscribeFixtures();
      unsubscribePoints();
      unsubscribeStats();
      unsubscribeGallery();
      unsubscribeArchives();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#000000'
        }}>
          <Box className="content-container" sx={{ flexGrow: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fixtures" element={<Fixtures fixtures={fixtures} />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/points-table" element={<PointsTable pointsTable={pointsTable} />} />
              <Route path="/stats" element={<Stats stats={stats} />} />
              <Route path="/archives" element={<Archives archives={archives} />} />
              <Route path="/gallery" element={<Gallery galleryData={gallery} />} />
              <Route path="/captain" element={<CaptainDashboard />} />
              <Route path="/live-match" element={<PublicLiveMatch />} />
              <Route path="/admin" element={
                <AdminDashboard
                  fixtures={fixtures}
                  setFixtures={setFixtures}
                  pointsTable={pointsTable}
                  setPointsTable={setPointsTable}
                  stats={stats}
                  galleryData={gallery}
                  archives={archives}
                />
              } />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;