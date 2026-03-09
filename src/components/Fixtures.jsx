import React from 'react';
import Footer from './Footer';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const Fixtures = ({ fixtures }) => {
  const matches = fixtures || [];

  return (
    <><Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      mt: { xs: 2, sm: 4 },
      mb: 6,
      backgroundColor: '#000000',
      borderRadius: '30px',
      border: '1px solid rgba(255, 42, 42, 0.2)'
    }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          color: '#ff2a2a',
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          fontFamily: "'Poppins', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}
      >
        Match Fixtures
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#0a0a0a',
          borderRadius: '20px',
          border: '1px solid rgba(255, 42, 42, 0.15)',
          overflowX: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                backgroundColor: 'rgba(255, 42, 42, 0.15)',
                borderBottom: '2px solid #ff2a2a'
              }
            }}>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Team 1</TableCell>
              <TableCell align="center">VS</TableCell>
              <TableCell>Team 2</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow
                key={index}
                sx={{
                  transition: 'all 0.3s ease',
                  '& td': {
                    color: '#e0e0e0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: "'Montserrat', sans-serif",
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 42, 42, 0.1)',
                    boxShadow: 'inset 0 0 15px rgba(255, 42, 42, 0.2)'
                  }
                }}
              >
                <TableCell>{match.date}</TableCell>
                <TableCell>{match.time}</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>{match.team1}</TableCell>
                <TableCell align="center" sx={{ color: '#ff2a2a', fontWeight: 'bold' }}>VS</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>{match.team2}</TableCell>
                <TableCell>{match.venue}</TableCell>
                <TableCell sx={{
                  color: match.status === 'Completed' ? '#aaaaaa' : '#ff2a2a',
                  fontWeight: match.status === 'Completed' ? 400 : 700
                }}>
                  {match.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
      <Footer /></>
  );
};

export default Fixtures;