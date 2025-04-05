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
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'A'
    },
    {
      team: 'Hellfire Clan',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'A'
    },
    {
      team: 'Akatsuki',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'A'
    },
    {
      team: 'The Real Slim Shady`s ',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'A'
    },

    {
      team: 'Skull Scorchers',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'B'
    },
    {
      team: 'Beast Bulls',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'B'
    },
    {
      team: '420 Ballers',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'B'
    },
    {
      team: 'Small Bois Squad',
      played: 0,
      won: 0,
      lost: 0,
      points: 0,
      pool: 'B'
    },
   
  ];

  const poolATeams = teamStandings.filter(team => team.pool === 'A')
    .sort((a, b) => b.points - a.points);
  const poolBTeams = teamStandings.filter(team => team.pool === 'B')
    .sort((a, b) => b.points - a.points);

  const renderTable = (teams, poolName) => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          color: 'black',
          textAlign: 'center',
          mb: 2,
          fontWeight: 'bold'
        }}
      >
        Pool {poolName}
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: 'black',
                fontWeight: 'bold',
                fontSize: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="center">Played</TableCell>
              <TableCell align="center">Won</TableCell>
              <TableCell align="center">Lost</TableCell>
              <TableCell align="center">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.team}
                sx={{
                  '& td': {
                    color: 'black',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                  }
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{team.team}</TableCell>
                <TableCell align="center">{team.played}</TableCell>
                <TableCell align="center">{team.won}</TableCell>
                <TableCell align="center">{team.lost}</TableCell>
                <TableCell align="center">{team.points}</TableCell>
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
          p: 4,
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
              fontWeight: 'bold'
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