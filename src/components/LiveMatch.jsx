import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Button, Chip, Divider,
  CircularProgress, Alert, Snackbar, Avatar
} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import Footer from './Footer';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

// ─── Data ────────────────────────────────────────────────────────────────────
const ALL_TEAMS = [
  { id: 'dark-knights', name: 'Dark Knights', pool: 'B' },
  { id: 'hellfire-clan', name: 'Hellfire Clan', pool: 'A' },
  { id: 'The Black Mambas', name: 'The Black Mambas', pool: 'B' },
  { id: 'real-slim-shadys', name: "The Real Slim Shady's", pool: 'A' },
  { id: 'skull-scorchers', name: 'Skull Scorchers', pool: 'B' },
  { id: 'beast-bulls', name: 'Beast Bulls', pool: 'B' },
  { id: 'small-bois-squad', name: 'Small Bois Squad', pool: 'A' },
  { id: '420-ballers', name: '420 Ballers', pool: 'A' },
];

const POOLS = ['A', 'B'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const teamTotal = (scores) => Object.values(scores).reduce((s, v) => s + v, 0);

const rankColor = (rank) => {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  return '#ff2a2a';
};

// ─── Sub-components ──────────────────────────────────────────────────────────

// Small card on the team-selection grid
function TeamSelectionCard({ team, role, selected, disabled, onClick }) {
  const isA = role === 'A';
  const accent = isA ? '#ff2a2a' : '#2a8fff';
  const glow = isA ? 'rgba(255,42,42,0.25)' : 'rgba(42,143,255,0.25)';
  return (
    <Paper
      elevation={0}
      onClick={!disabled ? onClick : undefined}
      sx={{
        p: { xs: 1.5, sm: 2.5 },
        backgroundColor: selected ? `rgba(${isA ? '255,42,42' : '42,143,255'},0.12)` : '#0a0a0a',
        border: selected
          ? `2px solid ${accent}`
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        textAlign: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.25s ease',
        height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 1,
        opacity: disabled ? 0.4 : 1,
        '&:hover': !disabled ? {
          border: `2px solid ${accent}`,
          boxShadow: `0 6px 20px ${glow}`,
          transform: 'translateY(-3px)',
        } : {},
      }}
    >
      <Box sx={{
        width: 44, height: 44, borderRadius: '50%',
        background: `linear-gradient(135deg, ${accent}33, ${accent}66)`,
        border: `1px solid ${accent}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected
          ? <CheckCircleIcon sx={{ color: accent, fontSize: 22 }} />
          : <ShieldIcon sx={{ color: accent, fontSize: 22 }} />}
      </Box>
      <Typography sx={{
        color: '#fff', fontFamily: "'Poppins', sans-serif",
        fontWeight: 700, fontSize: { xs: '0.78rem', sm: '0.9rem' }, lineHeight: 1.3,
      }}>
        {team.name}
      </Typography>
      {selected && (
        <Chip
          label={`Team ${role}`}
          size="small"
          sx={{
            backgroundColor: `${accent}22`, color: accent,
            border: `1px solid ${accent}66`,
            fontWeight: 700, fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem',
          }}
        />
      )}
    </Paper>
  );
}

// Single player scoring row
function PlayerRow({ name, matchScore, existingScore, onAdd, teamColor }) {
  const total = (existingScore || 0) + (matchScore || 0);
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 },
      px: { xs: 1.5, sm: 2 }, py: 1.5, mb: 1,
      backgroundColor: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      border: matchScore > 0 ? `1px solid ${teamColor}44` : '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.2s ease',
    }}>
      {/* Score badges */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0, minWidth: 52 }}>
        {/* Total score — big */}
        <Box sx={{
          width: 48, height: 36, borderRadius: '9px',
          backgroundColor: total > 0 ? `${teamColor}22` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${total > 0 ? teamColor + '66' : 'rgba(255,255,255,0.08)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography sx={{
            color: total > 0 ? teamColor : 'rgba(255,255,255,0.25)',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '1rem',
            lineHeight: 1,
          }}>
            {total}
          </Typography>
        </Box>
        {/* Sub-labels: match / existing */}
        <Box sx={{ display: 'flex', gap: '3px' }}>
          <Typography sx={{
            color: matchScore > 0 ? teamColor : 'rgba(255,255,255,0.2)',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.6rem',
          }}>
            +{matchScore || 0}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem' }}>|</Typography>
          <Typography sx={{
            color: 'rgba(255,255,255,0.3)',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '0.6rem',
          }}>
            {existingScore || 0}
          </Typography>
        </Box>
      </Box>

      {/* Name */}
      <Typography sx={{
        color: '#fff', fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600, fontSize: { xs: '0.78rem', sm: '0.88rem' }, flex: 1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {name}
      </Typography>

      {/* Point buttons */}
      {[1, 2, 3].map((pts) => (
        <Button
          key={pts}
          variant="outlined"
          size="small"
          onClick={() => onAdd(name, pts)}
          sx={{
            minWidth: 0, px: { xs: '6px', sm: '10px' }, py: '4px',
            borderColor: `${teamColor}55`,
            color: teamColor,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800, fontSize: { xs: '0.7rem', sm: '0.75rem' },
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: `${teamColor}22`,
              borderColor: teamColor,
              transform: 'scale(1.05)',
            },
            transition: 'all 0.15s ease',
          }}
        >
          +{pts}
        </Button>
      ))}
    </Box>
  );
}

// Team scoring column
function TeamScoreColumn({ team, members, scores, existingScores, onAdd, loading, color }) {
  const matchTotal = teamTotal(scores);
  return (
    <Box sx={{ flex: 1 }}>
      {/* Team header */}
      <Box sx={{
        p: { xs: 2, sm: 2.5 }, mb: 2,
        backgroundColor: '#0a0a0a',
        border: `2px solid ${color}44`,
        borderRadius: '16px',
        textAlign: 'center',
      }}>
        <Typography sx={{
          color: 'rgba(255,255,255,0.5)', fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', mb: 0.5,
        }}>
          {team.pool === 'A' ? 'Team A' : 'Team B'}
        </Typography>
        <Typography sx={{
          color: '#fff', fontFamily: "'Poppins', sans-serif",
          fontWeight: 800, fontSize: { xs: '1rem', sm: '1.2rem' }, mb: 1,
        }}>
          {team.name}
        </Typography>
        <Typography sx={{
          color, fontFamily: "'Poppins', sans-serif",
          fontWeight: 900, fontSize: { xs: '2.2rem', sm: '2.8rem' }, lineHeight: 1,
        }}>
          {matchTotal}
        </Typography>
        <Typography sx={{
          color: 'rgba(255,255,255,0.35)', fontFamily: "'Montserrat', sans-serif",
          fontSize: '0.75rem',
        }}>
          match points
        </Typography>
      </Box>

      {/* Column legend */}
      {members.length > 0 && !loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 1, gap: 1 }}>
          <Box sx={{ minWidth: 52, textAlign: 'center' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              TOTAL
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem', fontFamily: "'Montserrat', sans-serif" }}>
              +match | prev
            </Typography>
          </Box>
          <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', fontFamily: "'Montserrat', sans-serif", flex: 1 }}>
            PLAYER
          </Typography>
        </Box>
      )}

      {/* Players */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color }} size={28} />
        </Box>
      ) : members.length === 0 ? (
        <Typography sx={{
          color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif",
          textAlign: 'center', py: 3, fontSize: '0.85rem',
        }}>
          No players registered
        </Typography>
      ) : (
        members.map((name) => (
          <PlayerRow
            key={name}
            name={name}
            matchScore={scores[name] || 0}
            existingScore={existingScores[name] || 0}
            onAdd={onAdd}
            teamColor={color}
          />
        ))
      )}
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LiveMatch() {
  // Phase: 'select' | 'scoring' | 'summary'
  const [phase, setPhase] = useState('select');

  // Team selection
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

  // Members
  const [membersA, setMembersA] = useState([]);
  const [membersB, setMembersB] = useState([]);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  // Scores: { [playerName]: points } — match only
  const [scoresA, setScoresA] = useState({});
  const [scoresB, setScoresB] = useState({});

  // Existing Firestore scores fetched at match start: { [playerName]: number }
  const [existingScoresA, setExistingScoresA] = useState({});
  const [existingScoresB, setExistingScoresB] = useState({});

  // Save state
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Summary data
  const [matchSummary, setMatchSummary] = useState(null);

  // ── Fetch team members + existing scores ───────────────────────────────
  const fetchMembers = useCallback(async (teamId, setMembers, setLoading, setExisting) => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, 'teams', teamId));
      const members = snap.exists() ? (snap.data().members || []) : [];
      setMembers(members);
      // Fetch existing stats for all members in parallel
      const statSnaps = await Promise.all(
        members.map((name) => getDoc(doc(db, 'stats', name)))
      );
      const existing = {};
      statSnaps.forEach((s, i) => {
        if (s.exists()) existing[members[i]] = s.data().score || 0;
        else existing[members[i]] = 0;
      });
      setExisting(existing);
    } catch {
      setMembers([]);
      setExisting({});
    }
    setLoading(false);
  }, []);

  // ── Start match ──────────────────────────────────────────────────────────
  const handleStartMatch = async () => {
    if (!teamA || !teamB) return;
    setScoresA({});
    setScoresB({});
    setPhase('scoring');
    await Promise.all([
      fetchMembers(teamA.id, setMembersA, setLoadingA, setExistingScoresA),
      fetchMembers(teamB.id, setMembersB, setLoadingB, setExistingScoresB),
    ]);
  };

  // ── Add points ───────────────────────────────────────────────────────────
  const addPoints = useCallback((team, name, pts) => {
    if (team === 'A') {
      setScoresA(prev => ({ ...prev, [name]: (prev[name] || 0) + pts }));
    } else {
      setScoresB(prev => ({ ...prev, [name]: (prev[name] || 0) + pts }));
    }
  }, []);

  // ── Finish & Save ────────────────────────────────────────────────────────
  const handleFinish = async () => {
    setSaving(true);
    try {
      const totalA = teamTotal(scoresA);
      const totalB = teamTotal(scoresB);
      const diff = totalA - totalB; // positive = A wins, negative = B wins, 0 = tie

      // ── 1. Update player stats (/stats/{name}) ──────────────────────────
      const allScored = [
        ...Object.entries(scoresA).filter(([, v]) => v > 0).map(([name, pts]) => ({ name, pts, team: teamA.name })),
        ...Object.entries(scoresB).filter(([, v]) => v > 0).map(([name, pts]) => ({ name, pts, team: teamB.name })),
      ];

      await Promise.all(allScored.map(async ({ name, pts, team }) => {
        const ref = doc(db, 'stats', name);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, { score: increment(pts) });
        } else {
          await setDoc(ref, { name, team, score: pts });
        }
      }));

      // ── 2. Update points table (/pointsTable/{teamId}) ──────────────────
      // Win = 2 pts, Tie = 1 pt each, Loss = 0 pts
      const upsertTeamPoints = async (team, scored, conceded) => {
        const isWin = scored > conceded;
        const isLoss = scored < conceded;
        const ref = doc(db, 'pointsTable', team.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            played: increment(1),
            won: increment(isWin ? 1 : 0),
            lost: increment(isLoss ? 1 : 0),
            points: increment(isWin ? 2 : isLoss ? 0 : 1),
            pointDiff: increment(scored - conceded),
          });
        } else {
          // Create the record if it doesn't exist yet
          await setDoc(ref, {
            team: team.name,
            pool: team.pool,
            played: 1,
            won: isWin ? 1 : 0,
            lost: isLoss ? 1 : 0,
            points: isWin ? 2 : isLoss ? 0 : 1,
            pointDiff: scored - conceded,
          });
        }
      };

      await Promise.all([
        upsertTeamPoints(teamA, totalA, totalB),
        upsertTeamPoints(teamB, totalB, totalA),
      ]);

      // ── 3. Build summary ────────────────────────────────────────────────
      const topMatch = [...allScored]
        .sort((a, b) => b.pts - a.pts)
        .slice(0, 5);

      setMatchSummary({
        teamA: { team: teamA, total: totalA },
        teamB: { team: teamB, total: totalB },
        top5: topMatch,
      });
      setPhase('summary');
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to save scores. Try again.', severity: 'error' });
    }
    setSaving(false);
  };

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setPhase('select');
    setTeamA(null);
    setTeamB(null);
    setMembersA([]);
    setMembersB([]);
    setScoresA({});
    setScoresB({});
    setExistingScoresA({});
    setExistingScoresB({});
    setMatchSummary(null);
  };

  // ── Handle team card click in selection ─────────────────────────────────
  const handleTeamClick = (team) => {
    if (teamA?.id === team.id) { setTeamA(null); return; }
    if (teamB?.id === team.id) { setTeamB(null); return; }
    if (!teamA) { setTeamA(team); return; }
    if (!teamB) { setTeamB(team); return; }
  };

  const getRole = (team) => {
    if (teamA?.id === team.id) return 'A';
    if (teamB?.id === team.id) return 'B';
    return null;
  };

  const bothSelected = teamA && teamB;

  // ════════════════════════════════════════════════════════════════════════
  // PHASE: SELECTION
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'select') {
    return (
      <>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
          <Box sx={{
            p: { xs: 2, sm: 4 }, backgroundColor: '#000',
            borderRadius: '30px', border: '1px solid rgba(255,42,42,0.2)',
          }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff2a2a, #880000)',
                boxShadow: '0 0 28px rgba(255,42,42,0.4)', mb: 2,
              }}>
                <SportsCricketIcon sx={{ color: '#fff', fontSize: 32 }} />
              </Box>
              <Typography sx={{
                color: '#fff', fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.5rem' },
                textTransform: 'uppercase', letterSpacing: 2,
              }}>
                <span style={{ color: '#ff2a2a' }}>Live</span> Match
              </Typography>
              <Typography sx={{
                color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif",
                fontSize: { xs: '0.85rem', sm: '1rem' }, mt: 0.5,
              }}>
                Select two teams to start scoring
              </Typography>
            </Box>

            {/* Selected teams bar */}
            {(teamA || teamB) && (
              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 2, mb: 4, flexWrap: 'wrap',
              }}>
                <Chip
                  label={teamA ? teamA.name : '— Pick Team A —'}
                  icon={<ShieldIcon sx={{ color: '#ff2a2a !important', fontSize: '16px !important' }} />}
                  sx={{
                    backgroundColor: teamA ? 'rgba(255,42,42,0.15)' : 'rgba(255,255,255,0.05)',
                    color: teamA ? '#ff2a2a' : 'rgba(255,255,255,0.3)',
                    border: `1px solid ${teamA ? 'rgba(255,42,42,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    fontWeight: 700, fontFamily: "'Montserrat', sans-serif",
                  }}
                />
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 800 }}>VS</Typography>
                <Chip
                  label={teamB ? teamB.name : '— Pick Team B —'}
                  icon={<ShieldIcon sx={{ color: '#2a8fff !important', fontSize: '16px !important' }} />}
                  sx={{
                    backgroundColor: teamB ? 'rgba(42,143,255,0.15)' : 'rgba(255,255,255,0.05)',
                    color: teamB ? '#2a8fff' : 'rgba(255,255,255,0.3)',
                    border: `1px solid ${teamB ? 'rgba(42,143,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    fontWeight: 700, fontFamily: "'Montserrat', sans-serif",
                  }}
                />
              </Box>
            )}

            {/* Pool grids */}
            {POOLS.map((pool) => (
              <Box key={pool} sx={{ mb: 4 }}>
                <Typography sx={{
                  color: '#ff2a2a', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700, fontSize: { xs: '0.85rem', sm: '1rem' },
                  textTransform: 'uppercase', letterSpacing: 3, mb: 2,
                  borderBottom: '1px solid rgba(255,42,42,0.2)', pb: 1,
                }}>
                  Pool {pool}
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  {ALL_TEAMS.filter(t => t.pool === pool).map((team) => {
                    const role = getRole(team);
                    const isOtherSelected = (teamA && teamA.id !== team.id && teamB && teamB.id !== team.id);
                    return (
                      <Grid item xs={6} sm={6} md={3} key={team.id}>
                        <TeamSelectionCard
                          team={team}
                          role={role}
                          selected={!!role}
                          disabled={isOtherSelected && !role && bothSelected}
                          onClick={() => handleTeamClick(team)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}

            {/* Start button */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                disabled={!bothSelected}
                onClick={handleStartMatch}
                size="large"
                startIcon={<SportsCricketIcon />}
                sx={{
                  background: bothSelected ? 'linear-gradient(135deg, #ff2a2a, #cc0000)' : undefined,
                  fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  borderRadius: '14px', px: 5, py: 1.5,
                  boxShadow: bothSelected ? '0 6px 24px rgba(255,42,42,0.4)' : undefined,
                  '&:hover': { background: 'linear-gradient(135deg, #ff4444, #ff2a2a)', boxShadow: '0 8px 28px rgba(255,42,42,0.55)' },
                  '&:disabled': { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' },
                }}
              >
                {bothSelected ? `Start: ${teamA.name} vs ${teamB.name}` : 'Select 2 Teams to Start'}
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // PHASE: SCORING
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'scoring') {
    const totalA = teamTotal(scoresA);
    const totalB = teamTotal(scoresB);
    const anyScored = totalA > 0 || totalB > 0;

    return (
      <>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6, px: { xs: 1.5, sm: 3 } }}>
          {/* Match header bar */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 2, mb: 4,
            p: { xs: 2, sm: 3 },
            background: 'linear-gradient(135deg, rgba(255,42,42,0.08), rgba(42,143,255,0.08))',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SportsCricketIcon sx={{ color: '#ff2a2a', fontSize: 28 }} />
              <Box>
                <Typography sx={{
                  color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 2,
                }}>Live Match</Typography>
                <Typography sx={{
                  color: '#fff', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800, fontSize: { xs: '1rem', sm: '1.2rem' },
                }}>
                  <span style={{ color: '#ff2a2a' }}>{teamA.name}</span>
                  {' '}vs{' '}
                  <span style={{ color: '#2a8fff' }}>{teamB.name}</span>
                </Typography>
              </Box>
            </Box>

            {/* Scoreboard */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 2,
              background: 'rgba(0,0,0,0.4)', borderRadius: '14px', px: 3, py: 1.5,
            }}>
              <Typography sx={{ color: '#ff2a2a', fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '1.8rem' }}>
                {totalA}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '1.2rem' }}>—</Typography>
              <Typography sx={{ color: '#2a8fff', fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: '1.8rem' }}>
                {totalB}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={handleReset}
              sx={{
                borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)',
                borderRadius: '10px',
                '&:hover': { borderColor: '#ff2a2a', color: '#ff2a2a' },
              }}
            >
              Cancel
            </Button>
          </Box>

          {/* Scoring columns */}
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 3 }, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start' }}>
            <TeamScoreColumn
              team={teamA}
              members={membersA}
              scores={scoresA}
              existingScores={existingScoresA}
              onAdd={(name, pts) => addPoints('A', name, pts)}
              loading={loadingA}
              color="#ff2a2a"
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: 'rgba(255,255,255,0.08)',
                display: { xs: 'none', md: 'block' },
              }}
            />

            <TeamScoreColumn
              team={teamB}
              members={membersB}
              scores={scoresB}
              existingScores={existingScoresB}
              onAdd={(name, pts) => addPoints('B', name, pts)}
              loading={loadingB}
              color="#2a8fff"
            />
          </Box>

          {/* Finish button */}
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleFinish}
              disabled={saving || !anyScored}
              startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <EmojiEventsIcon />}
              sx={{
                background: 'linear-gradient(135deg, #ff2a2a, #cc0000)',
                fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                borderRadius: '14px', px: 5, py: 1.5,
                boxShadow: '0 6px 24px rgba(255,42,42,0.4)',
                '&:hover': { background: 'linear-gradient(135deg, #ff4444, #ff2a2a)', boxShadow: '0 8px 28px rgba(255,42,42,0.55)' },
                '&:disabled': { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' },
              }}
            >
              {saving ? 'Saving…' : 'Finish & Save Match'}
            </Button>
            {!anyScored && (
              <Typography sx={{
                color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.8rem', mt: 1,
              }}>
                Add at least one point to finish
              </Typography>
            )}
          </Box>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ borderRadius: '12px' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <Footer />
      </>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // PHASE: SUMMARY
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'summary' && matchSummary) {
    const { teamA: sumA, teamB: sumB, top5 } = matchSummary;
    const winner = sumA.total > sumB.total ? sumA.team : sumB.total > sumA.total ? sumB.team : null;

    return (
      <>
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Box sx={{
            p: { xs: 2, sm: 4 },
            backgroundColor: '#000', borderRadius: '30px',
            border: '1px solid rgba(255,42,42,0.2)',
          }}>
            {/* Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: 56, mb: 1 }} />
              <Typography sx={{
                color: '#fff', fontFamily: "'Poppins', sans-serif",
                fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.4rem' },
                textTransform: 'uppercase', letterSpacing: 2,
              }}>
                Match Complete
              </Typography>
              {winner ? (
                <Typography sx={{
                  color: '#FFD700', fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: '1.05rem', mt: 0.5,
                }}>
                  🏆 {winner.name} wins!
                </Typography>
              ) : (
                <Typography sx={{
                  color: 'rgba(255,255,255,0.5)', fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600, mt: 0.5,
                }}>
                  It's a tie!
                </Typography>
              )}
            </Box>

            {/* Final score */}
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: { xs: 2, sm: 4 }, mb: 5, flexWrap: 'wrap',
            }}>
              {[
                { team: sumA.team, total: sumA.total, color: '#ff2a2a', label: 'Team A' },
                { team: sumB.team, total: sumB.total, color: '#2a8fff', label: 'Team B' },
              ].map(({ team, total, color, label }, i) => (
                <React.Fragment key={team.id}>
                  {i === 1 && (
                    <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontWeight: 900, fontSize: '2rem' }}>VS</Typography>
                  )}
                  <Box sx={{
                    textAlign: 'center', p: { xs: 2.5, sm: 3.5 },
                    backgroundColor: '#0a0a0a',
                    border: `2px solid ${color}44`,
                    borderRadius: '20px', minWidth: 140,
                  }}>
                    <Typography sx={{
                      color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 2, mb: 0.5,
                    }}>
                      {label}
                    </Typography>
                    <Typography sx={{
                      color: '#fff', fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1.05rem' }, mb: 1,
                    }}>
                      {team.name}
                    </Typography>
                    <Typography sx={{
                      color, fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900, fontSize: { xs: '2.5rem', sm: '3rem' }, lineHeight: 1,
                    }}>
                      {total}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>pts</Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 4 }} />

            {/* Top 5 scorers */}
            <Typography sx={{
              color: '#fff', fontFamily: "'Poppins', sans-serif",
              fontWeight: 800, fontSize: '1.2rem', mb: 3, textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
            }}>
              <EmojiEventsIcon sx={{ color: '#FFD700' }} /> Top Scorers This Match
            </Typography>

            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              {top5.length === 0 ? (
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontFamily: "'Montserrat', sans-serif" }}>
                  No scores recorded
                </Typography>
              ) : (
                top5.map(({ name, pts, team: teamName }, idx) => (
                  <Box key={name} sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    px: 2.5, py: 1.8, mb: 1.5,
                    backgroundColor: '#0a0a0a',
                    border: `1px solid ${idx === 0 ? '#FFD70044' : idx === 1 ? '#C0C0C044' : idx === 2 ? '#CD7F3244' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '14px',
                  }}>
                    <Avatar sx={{
                      width: 36, height: 36,
                      backgroundColor: rankColor(idx + 1) + '22',
                      color: rankColor(idx + 1),
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 900, fontSize: '0.85rem',
                      border: `1px solid ${rankColor(idx + 1)}55`,
                    }}>
                      {idx + 1}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{
                        color: '#fff', fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700, fontSize: '0.95rem',
                      }}>
                        {name}
                      </Typography>
                      <Typography sx={{
                        color: 'rgba(255,255,255,0.35)', fontFamily: "'Montserrat', sans-serif",
                        fontSize: '0.75rem',
                      }}>
                        {teamName}
                      </Typography>
                    </Box>
                    <Box sx={{
                      backgroundColor: rankColor(idx + 1) + '22',
                      border: `1px solid ${rankColor(idx + 1)}55`,
                      borderRadius: '10px', px: 1.5, py: 0.5,
                    }}>
                      <Typography sx={{
                        color: rankColor(idx + 1), fontFamily: "'Poppins', sans-serif",
                        fontWeight: 900, fontSize: '1.1rem',
                      }}>
                        {pts} <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>pts</span>
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            {/* New match */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleReset}
                startIcon={<RefreshIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #ff2a2a, #cc0000)',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 800,
                  borderRadius: '14px', px: 5, py: 1.5,
                  boxShadow: '0 6px 24px rgba(255,42,42,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #ff4444, #ff2a2a)' },
                }}
              >
                Start New Match
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  return null;
}
