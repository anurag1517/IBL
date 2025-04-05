import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Fixtures from './components/Fixtures';
import PointsTable from './components/PointsTable';
import Stats from './components/Stats';
import AdminDashboard from './components/admin/AdminDashboard';
import Teams from './components/Teams';
import { Box } from '@mui/material';
import basketBg from './assets/images/basket.jpg';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
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
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/points-table" element={<PointsTable />} />
              <Route path="/stats" element={<Stats />} />
              {/* <Route path="/admin" element={<AdminDashboard />} /> */}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;