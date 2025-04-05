import React from 'react';
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Container 
} from '@mui/material';
import Footer from './Footer';

const PointsTable = () => {
  const teamStandings = [
    {
      team: 'Dark Knights',
      played: 1,
      won: 0,
      lost: 1,
      points: 0,
      pointDiff: -12, // Add point difference
      pool: 'A'
    },
    {
      team: 'Hellfire Clan',
      played: 1,
      won: 0,
      lost: 1,
      points: 0,
      pointDiff: -14, // Add point difference
      pool: 'A'
    },
    {
      team: 'Akatsuki',
      played: 1,
      won: 0,
      lost: 1,
      points: 0,
      pointDiff: -9, // Add point difference
      pool: 'A'
    },
    {
      team: 'The Real Slim Shady`s ',
      played: 3,
      won: 3,
      lost: 0,
      points: 6,
      pointDiff: 35, // Add point difference
      pool: 'A'
    },

    {
      team: 'Skull Scorchers',
      played: 3,
      won: 2,
      lost: 1,
      points: 4,
      pointDiff: 22, // Add point difference
      pool: 'B'
    },
    {
      team: 'Beast Bulls',
      played: 2,
      won: 1,
      lost: 1,
      points: 2,
      pointDiff: 1, // Add point difference
      pool: 'B'
    },
    {
      team: '420 Ballers',
      played: 2,
      won: 0,
      lost: 2,
      points: 0,
      pointDiff: -32, // Add point difference
      pool: 'B'
    },
    {
      team: 'Small Bois Squad',
      played: 3,
      won: 2,
      lost: 1,
      points: 4,
      pointDiff: 9, // Add point difference
      pool: 'B'
    },
   
  ];

  // Modified sorting function with point difference as secondary criteria
  const sortTeams = (teams) => {
    return teams.sort((a, b) => {
      // First sort by points
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // Second sort by point difference
      if (b.pointDiff !== a.pointDiff) {
        return b.pointDiff - a.pointDiff;
      }
      // Third sort by wins
      if (b.won !== a.won) {
        return b.won - a.won;
      }
      // Fourth sort by games played (less games = higher position)
      if (a.played !== b.played) {
        return a.played - b.played;
      }
      // If everything is equal, sort alphabetically
      return a.team.localeCompare(b.team);
    });
  };

  // Modified pool filtering with sorting
  const poolATeams = sortTeams(teamStandings.filter(team => team.pool === 'A'));
  const poolBTeams = sortTeams(teamStandings.filter(team => team.pool === 'B'));

  const renderTable = (teams, poolName) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          color: 'black',
          textAlign: 'center',
          mb: 2,
          fontWeight: 'bold',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Pool {poolName}
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          overflow: 'auto' // Enable horizontal scroll for mobile
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: 'black',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: 'nowrap', // Prevent text wrapping
                padding: { xs: '8px', sm: '16px' },
              }
            }}>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Played</TableCell>
              <TableCell align="center">Won</TableCell>
              <TableCell align="center">Lost</TableCell>
              <TableCell align="center">Points</TableCell>
              <TableCell align="center" sx={{ 
                minWidth: '100px'
              }}>
                Point Diff
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.team}
                sx={{
                  '& td': {
                    color: 'black',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '8px', sm: '16px' },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transition: 'background-color 0.3s ease'
                  },
                  backgroundColor: index === 0 
                    ? 'rgba(255, 215, 0, 0.05)'
                    : index === 1 
                      ? 'rgba(192, 192, 192, 0.05)'
                      : 'transparent'
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: index < 2 ? 600 : 400 }}>
                  {team.team}
                </TableCell>
                <TableCell align="center">{team.played}</TableCell>
                <TableCell align="center">{team.won}</TableCell>
                <TableCell align="center">{team.lost}</TableCell>
                <TableCell 
                  align="center"
                  sx={{ 
                    fontWeight: 'bold',
                    color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : 'inherit'
                  }}
                >
                  {team.points}
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{
                    color: team.pointDiff > 0 ? 'green' : team.pointDiff < 0 ? 'red' : 'inherit',
                    fontWeight: 500
                  }}
                >
                  {team.pointDiff > 0 ? `+${team.pointDiff}` : team.pointDiff}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}>
          <Typography
            variant="h4"
            sx={{
              color: 'black',
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Points Table
          </Typography>
          {renderTable(poolATeams, 'A')}
          {renderTable(poolBTeams, 'B')}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PointsTable;