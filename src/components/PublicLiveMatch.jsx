import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Paper, Chip, CircularProgress, Divider
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ShieldIcon from '@mui/icons-material/Shield';
import Footer from './Footer';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function PublicLiveMatch() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for all live matches
  useEffect(() => {
    const q = query(collection(db, 'matches'), where('status', '==', 'live'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLiveMatches(data);
      setLoading(false);
    }, (err) => {
      console.error('Live match listener error:', err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: '#000',
          borderRadius: '30px',
          border: '1px solid rgba(255,42,42,0.2)',
        }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff2a2a, #880000)',
              boxShadow: '0 0 28px rgba(255,42,42,0.4)', mb: 2,
            }}>
              <SportsBasketballIcon sx={{ color: '#fff', fontSize: 32 }} />
            </Box>
            <Typography sx={{
              color: '#fff', fontFamily: "'Poppins', sans-serif",
              fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.5rem' },
              textTransform: 'uppercase', letterSpacing: 2,
            }}>
              <span style={{ color: '#ff2a2a' }}>Live</span> Matches
            </Typography>
            <Typography sx={{
              color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif",
              fontSize: { xs: '0.85rem', sm: '1rem' }, mt: 0.5,
            }}>
              Live scores update in real-time
            </Typography>
          </Box>

          {/* Content */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#ff2a2a' }} />
            </Box>
          ) : liveMatches.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <SportsBasketballIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.08)', mb: 2 }} />
              <Typography sx={{
                color: 'rgba(255,255,255,0.3)', fontFamily: "'Poppins', sans-serif",
                fontWeight: 700, fontSize: '1.1rem',
              }}>
                No Live Match Right Now
              </Typography>
              <Typography sx={{
                color: 'rgba(255,255,255,0.2)', fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem', mt: 1,
              }}>
                Check back when a match is in progress
              </Typography>
            </Box>
          ) : (
            liveMatches.map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))
          )}
        </Box>
      </Container>
      <Footer />

      {/* Pulse animation */}
      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,42,42,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,42,42,0); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}

// ─── Live Match Card ─────────────────────────────────────────────────────────
function LiveMatchCard({ match }) {
  const totalA = computeTotal(match.scoresA || {});
  const totalB = computeTotal(match.scoresB || {});

  const scorersA = topScorers(match.scoresA || {}, 5);
  const scorersB = topScorers(match.scoresB || {}, 5);

  return (
    <Paper elevation={0} sx={{
      p: { xs: 2, sm: 3.5 }, mb: 3,
      backgroundColor: '#0a0a0a',
      border: '1px solid rgba(255,42,42,0.35)',
      borderRadius: '22px',
      animation: 'livePulse 2.5s infinite',
    }}>
      {/* Live badge + match id */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: '#ff2a2a',
            animation: 'dotBlink 1s infinite',
          }} />
          <Typography sx={{
            color: '#ff2a2a', fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase',
          }}>
            Live Now
          </Typography>
        </Box>
        <Typography sx={{
          color: 'rgba(255,255,255,0.2)', fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.7rem',
        }}>
          Match #{match.id?.split('-')[1]}
        </Typography>
      </Box>

      {/* Score board */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 2, mb: 3, flexWrap: 'wrap',
      }}>
        {/* Team A */}
        <TeamScoreBlock name={match.teamAName} score={totalA} color="#ff2a2a" />

        {/* VS */}
        <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
          <Typography sx={{
            color: 'rgba(255,255,255,0.15)', fontFamily: "'Poppins', sans-serif",
            fontWeight: 900, fontSize: { xs: '1.2rem', sm: '1.8rem' },
          }}>
            VS
          </Typography>
        </Box>

        {/* Team B */}
        <TeamScoreBlock name={match.teamBName} score={totalB} color="#2a8fff" />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />

      {/* Top scorers */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <ScorersList name={match.teamAName} scorers={scorersA} color="#ff2a2a" />
        <ScorersList name={match.teamBName} scorers={scorersB} color="#2a8fff" />
      </Box>
    </Paper>
  );
}

function TeamScoreBlock({ name, score, color }) {
  return (
    <Box sx={{
      flex: 1, minWidth: 120,
      textAlign: 'center',
      p: { xs: 2, sm: 2.5 },
      backgroundColor: `${color}0d`,
      border: `2px solid ${color}33`,
      borderRadius: '18px',
    }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1,
      }}>
        <ShieldIcon sx={{ color, fontSize: 16, opacity: 0.7 }} />
        <Typography sx={{
          color: 'rgba(255,255,255,0.7)', fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, fontSize: { xs: '0.85rem', sm: '0.95rem' },
          lineHeight: 1.3,
        }}>
          {name}
        </Typography>
      </Box>
      <Typography sx={{
        color, fontFamily: "'Poppins', sans-serif",
        fontWeight: 900, fontSize: { xs: '3rem', sm: '4rem' }, lineHeight: 1,
      }}>
        {score}
      </Typography>
      <Typography sx={{
        color: 'rgba(255,255,255,0.25)', fontFamily: "'Montserrat', sans-serif",
        fontSize: '0.7rem', mt: 0.5,
      }}>
        points
      </Typography>
    </Box>
  );
}

function ScorersList({ name, scorers, color }) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{
        color, fontFamily: "'Poppins', sans-serif",
        fontWeight: 700, fontSize: '0.78rem', letterSpacing: 1.5,
        textTransform: 'uppercase', mb: 1.5,
      }}>
        {name}
      </Typography>
      {scorers.length === 0 ? (
        <Typography sx={{
          color: 'rgba(255,255,255,0.2)', fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.8rem',
        }}>
          No points yet
        </Typography>
      ) : (
        scorers.map(({ name: player, pts }) => (
          <Box key={player} sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 1.5, py: 1, mb: 0.5,
            backgroundColor: 'rgba(255,255,255,0.03)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <Typography sx={{
              color: '#fff', fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600, fontSize: '0.85rem',
            }}>
              {player}
            </Typography>
            <Chip
              label={`${pts} pts`}
              size="small"
              sx={{
                backgroundColor: `${color}22`,
                color, border: `1px solid ${color}44`,
                fontWeight: 800, fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.65rem',
              }}
            />
          </Box>
        ))
      )}
    </Box>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeTotal(scores) {
  return Object.values(scores).reduce((s, v) => s + v, 0);
}

function topScorers(scores, n = 5) {
  return Object.entries(scores)
    .filter(([, pts]) => pts > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([name, pts]) => ({ name, pts }));
}
