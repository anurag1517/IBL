import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Fixtures from './components/Fixtures';
import PointsTable from './components/PointsTable';
import Stats from './components/Stats';
import Teams from './components/Teams';
import Archives from './components/Archives';
//import Gallery from './components/Gallery';
import AdminDashboard from './components/admin/AdminDashboard';
import { Box, CircularProgress } from '@mui/material';
import basketBg from './assets/images/basket.jpg';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { initialFixturesWithIds, initialTeamStandingsWithIds } from './data/initialData';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, getDocs } from 'firebase/firestore';

const App = () => {
  const [fixtures, setFixtures] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDataIfEmpty = async () => {
      try {
        const initDocRef = doc(db, 'config', 'init');
        const initDocSnap = await getDocs(collection(db, 'config'));

        let isInitialized = false;
        initDocSnap.forEach((doc) => {
          if (doc.id === 'init') isInitialized = true;
        });

        if (!isInitialized) {
          console.log("First time setup: Initializing Firestore...");

          // Mark as initialized first to prevent race conditions
          await setDoc(initDocRef, { initialized: true, timestamp: new Date() });

          for (const fixture of initialFixturesWithIds) {
            await setDoc(doc(db, 'fixtures', fixture.id), fixture);
          }

          for (const team of initialTeamStandingsWithIds) {
            await setDoc(doc(db, 'pointsTable', team.id), team);
          }
        }
      } catch (error) {
        console.error("Error checking initialization status:", error);
      }
    };

    initializeDataIfEmpty();

    // Listen to fixtures
    const unsubscribeFixtures = onSnapshot(collection(db, 'fixtures'), (snapshot) => {
      const fixturesData = snapshot.docs.map(doc => doc.data());
      // Optionally sort by some logic, but for now just set
      setFixtures(fixturesData);
    });

    // Listen to points table
    const unsubscribePoints = onSnapshot(collection(db, 'pointsTable'), (snapshot) => {
      const pointsData = snapshot.docs.map(doc => doc.data());
      setPointsTable(pointsData);
      setLoading(false);
    });

    return () => {
      unsubscribeFixtures();
      unsubscribePoints();
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
          overflow: 'hidden'
        }}>
          <Box
            className="background-wrapper"
            sx={{
              backgroundImage: `url(${basketBg})`,
              backgroundSize: {
                xs: 'cover',
                sm: 'cover',
                md: 'cover'
              },
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              '@media (orientation: portrait)': {
                backgroundSize: 'auto 100vh'
              },
              '@media (orientation: landscape)': {
                backgroundSize: '100vw auto'
              }
            }}
          />
          <Box className="content-container" sx={{ flexGrow: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fixtures" element={<Fixtures fixtures={fixtures} />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/points-table" element={<PointsTable pointsTable={pointsTable} />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/archives" element={<Archives />} />
              {/* <Route path="/gallery" element={<Gallery />} /> */}
              <Route path="/admin" element={
                <AdminDashboard
                  fixtures={fixtures}
                  setFixtures={setFixtures}
                  pointsTable={pointsTable}
                  setPointsTable={setPointsTable}
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