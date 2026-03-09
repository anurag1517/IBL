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

const PointsTable = ({ pointsTable }) => {
  const teamStandings = pointsTable || [];

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
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        sx={{
          color: '#ff2a2a',
          textAlign: 'center',
          mb: 3,
          fontWeight: 800,
          fontFamily: "'Poppins', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Pool {poolName}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#0a0a0a',
          borderRadius: '20px',
          border: '1px solid rgba(255, 42, 42, 0.15)',
          overflow: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                backgroundColor: 'rgba(255, 42, 42, 0.15)',
                borderBottom: '2px solid #ff2a2a',
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: 'nowrap',
                padding: { xs: '12px', sm: '16px' },
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
                  transition: 'all 0.3s ease',
                  '& td': {
                    color: '#e0e0e0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    padding: { xs: '12px', sm: '16px' },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 42, 42, 0.1)',
                    boxShadow: 'inset 0 0 15px rgba(255, 42, 42, 0.2)'
                  },
                  backgroundColor: index === 0
                    ? 'rgba(255, 215, 0, 0.05)'
                    : index === 1
                      ? 'rgba(192, 192, 192, 0.05)'
                      : 'transparent'
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: index < 2 ? 600 : 400, color: '#ffffff' }}>
                  {team.team}
                </TableCell>
                <TableCell align="center">{team.played}</TableCell>
                <TableCell align="center">{team.won}</TableCell>
                <TableCell align="center">{team.lost}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#ff2a2a'
                  }}
                >
                  {team.points}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: team.pointDiff > 0 ? '#4caf50' : team.pointDiff < 0 ? '#ff2a2a' : '#aaaaaa',
                    fontWeight: 600
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: '#000000',
          borderRadius: '30px',
          border: '1px solid rgba(255, 42, 42, 0.2)'
        }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff',
              textAlign: 'center',
              mb: 5,
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            <span style={{ color: '#ff2a2a' }}>Points</span> Table
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