import React, { useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Container,
  Dialog, DialogTitle, DialogContent, IconButton,
  List, ListItem, Chip, CircularProgress, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Footer from './Footer';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// PointsTable receives pointsTable as a prop which contains { id, team, pool, ... }

const PointsTable = ({ pointsTable }) => {
  const teamStandings = pointsTable || [];

  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyTeam, setHistoryTeam] = useState(null);   // { name, id }
  const [matches, setMatches] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Open history dialog and load matches for this team
  const handleTeamClick = async (team) => {
    const teamId = team.id;
    setHistoryTeam({ name: team.team, id: teamId });
    setMatches([]);
    setHistoryOpen(true);

    if (!teamId) return; // unknown team id — show empty state
    setHistoryLoading(true);
    try {
      const q = query(
        collection(db, 'matches'),
        where('teamIds', 'array-contains', teamId)
      );
      const snap = await getDocs(q);
      const data = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          // live matches first, then most recent
          if (a.status === 'live' && b.status !== 'live') return -1;
          if (b.status === 'live' && a.status !== 'live') return 1;
          return (b.startedAt || '').localeCompare(a.startedAt || '');
        });
      setMatches(data);
    } catch (e) {
      console.error('Error loading match history:', e);
    }
    setHistoryLoading(false);
  };

  const handleClose = () => {
    setHistoryOpen(false);
    setHistoryTeam(null);
    setMatches([]);
  };

  // Sort teams by standings criteria
  const sortTeams = (teams) => {
    return [...teams].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.pointDiff !== a.pointDiff) return b.pointDiff - a.pointDiff;
      if (b.won !== a.won) return b.won - a.won;
      if (a.played !== b.played) return a.played - b.played;
      return (a.team || '').localeCompare(b.team || '');
    });
  };

  const poolATeams = sortTeams(teamStandings.filter(team => team.pool === 'A'));
  const poolBTeams = sortTeams(teamStandings.filter(team => team.pool === 'B'));

  const renderTable = (teams, poolName) => (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        sx={{
          color: '#ff2a2a', textAlign: 'center', mb: 3,
          fontWeight: 800, fontFamily: "'Poppins', sans-serif",
          textTransform: 'uppercase', letterSpacing: '1px'
        }}
      >
        Pool {poolName}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#0a0a0a', borderRadius: '20px',
          border: '1px solid rgba(255, 42, 42, 0.15)', overflow: 'auto'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              '& th': {
                color: '#ffffff', fontWeight: 'bold',
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
              <TableCell align="center" sx={{ minWidth: '100px' }}>Point Diff</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow
                key={team.team}
                sx={{
                  transition: 'all 0.3s ease', cursor: 'pointer',
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
                    : index === 1 ? 'rgba(192, 192, 192, 0.05)' : 'transparent'
                }}
                onClick={() => handleTeamClick(team)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: index < 2 ? 600 : 400, color: '#ffffff' }}>
                  {team.team}
                </TableCell>
                <TableCell align="center">{team.played}</TableCell>
                <TableCell align="center">{team.won}</TableCell>
                <TableCell align="center">{team.lost}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#ff2a2a' }}>
                  {team.points}
                </TableCell>
                <TableCell align="center" sx={{ color: team.pointDiff > 0 ? '#4caf50' : team.pointDiff < 0 ? '#ff2a2a' : '#aaaaaa', fontWeight: 600 }}>
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
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#000000', borderRadius: '30px', border: '1px solid rgba(255, 42, 42, 0.2)' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#ffffff', textAlign: 'center', mb: 2,
              fontWeight: 800, fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textTransform: 'uppercase', letterSpacing: '2px'
            }}
          >
            <span style={{ color: '#ff2a2a' }}>Points</span> Table
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem', mb: 5 }}>
            Click any team to view their match history
          </Typography>
          {renderTable(poolATeams, 'A')}
          {renderTable(poolBTeams, 'B')}
        </Box>
      </Container>
      <Footer />

      {/* Match History Dialog */}
      <Dialog
        open={historyOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,42,42,0.3)',
            borderRadius: '20px',
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ff2a2a, #880000)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SportsBasketballIcon sx={{ color: '#fff', fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ color: '#ffffff', fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.2 }}>
                  {historyTeam?.name}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem' }}>
                  Match History
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#ff2a2a' } }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 0, pb: 3 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

          {historyLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress sx={{ color: '#ff2a2a' }} size={32} />
            </Box>
          ) : matches.length === 0 ? (
            <Box sx={{ py: 5, textAlign: 'center' }}>
              <SportsBasketballIcon sx={{ fontSize: 44, color: 'rgba(255,255,255,0.1)', mb: 1 }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Montserrat', sans-serif", fontSize: '0.9rem' }}>
                No matches played yet
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {matches.map((match, index) => {
                const isLive = match.status === 'live';
                const myTeamIsA = match.teamAId === historyTeam?.id || match.teamAName === historyTeam?.name;
                const myScore = myTeamIsA ? (match.totalA ?? 0) : (match.totalB ?? 0);
                const oppScore = myTeamIsA ? (match.totalB ?? 0) : (match.totalA ?? 0);
                const oppName = myTeamIsA ? match.teamBName : match.teamAName;
                const myWon = !isLive && myScore > oppScore;
                const myLost = !isLive && myScore < oppScore;
                const date = match.startedAt ? new Date(match.startedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                const time = match.startedAt ? new Date(match.startedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';

                return (
                  <ListItem
                    key={match.id}
                    sx={{
                      px: 2, py: 1.5, mb: 1.5,
                      backgroundColor: isLive ? 'rgba(255,42,42,0.07)' : 'rgba(255,255,255,0.03)',
                      borderRadius: '14px',
                      border: isLive ? '1px solid rgba(255,42,42,0.4)' : '1px solid rgba(255,255,255,0.06)',
                      flexDirection: 'column', alignItems: 'stretch',
                    }}
                  >
                    {/* Top row: status + date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isLive ? (
                          <Chip label="🔴 LIVE" size="small" sx={{ backgroundColor: 'rgba(255,42,42,0.2)', color: '#ff2a2a', border: '1px solid rgba(255,42,42,0.5)', fontWeight: 800, fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', animation: 'pulse 1.5s infinite' }} />
                        ) : (
                          <Chip
                            label={myWon ? '✓ WIN' : myLost ? '✗ LOSS' : '= TIE'}
                            size="small"
                            sx={{
                              backgroundColor: myWon ? 'rgba(76,175,80,0.15)' : myLost ? 'rgba(255,42,42,0.1)' : 'rgba(255,255,255,0.05)',
                              color: myWon ? '#4caf50' : myLost ? '#ff2a2a' : '#aaa',
                              border: `1px solid ${myWon ? 'rgba(76,175,80,0.4)' : myLost ? 'rgba(255,42,42,0.3)' : 'rgba(255,255,255,0.1)'}`,
                              fontWeight: 800, fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem'
                            }}
                          />
                        )}
                        {match.winner && !isLive && match.winner === historyTeam?.name && (
                          <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: 16 }} />
                        )}
                      </Box>
                      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem' }}>
                        {date} {time}
                      </Typography>
                    </Box>

                    {/* Score row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.9rem', flex: 1 }}>
                        vs <span style={{ color: 'rgba(255,255,255,0.6)' }}>{oppName}</span>
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: myWon ? '#4caf50' : myLost ? '#ff6b6b' : '#aaa', fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '1.1rem' }}>
                          {myScore}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>—</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1rem' }}>
                          {oppScore}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
};

export default PointsTable;