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
      p: 3,
      m: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // More opaque background
      backdropFilter: 'blur(10px)',
      borderRadius: 2
    }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          color: 'black',
          textAlign: 'center',
          mb: 4
        }}
      >
        Match Fixtures
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(5px)',
          overflowX: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: 'black',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
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
                  '& td': {
                    color: 'black',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                  }
                }}
              >
                <TableCell>{match.date}</TableCell>
                <TableCell>{match.time}</TableCell>
                <TableCell>{match.team1}</TableCell>
                <TableCell align="center">VS</TableCell>
                <TableCell>{match.team2}</TableCell>
                <TableCell>{match.venue}</TableCell>
                <TableCell>{match.status}</TableCell>
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