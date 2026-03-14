import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress,
  Chip, Divider, Alert, Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import ShieldIcon from '@mui/icons-material/Shield';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove
} from 'firebase/firestore';

// 8 teams with pool info — passwords are stored in Firestore
const TEAMS = [
  { id: 'dark-knights',       name: 'Dark Knights',           pool: 'A' },
  { id: 'hellfire-clan',      name: 'Hellfire Clan',          pool: 'A' },
  { id: 'akatsuki',           name: 'Akatsuki',               pool: 'A' },
  { id: 'real-slim-shadys',   name: "The Real Slim Shady's",  pool: 'A' },
  { id: 'skull-scorchers',    name: 'Skull Scorchers',        pool: 'B' },
  { id: 'beast-bulls',        name: 'Beast Bulls',            pool: 'B' },
  { id: 'small-bois-squad',   name: 'Small Bois Squad',       pool: 'B' },
  { id: '420-ballers',        name: '420 Ballers',            pool: 'B' },
];

const SESSION_PREFIX = 'ibl-captain-';

export default function CaptainDashboard() {
  // Which teamId is currently authenticated
  const [authedTeamId, setAuthedTeamId] = useState(() => {
    for (const team of TEAMS) {
      if (sessionStorage.getItem(SESSION_PREFIX + team.id) === 'true') {
        return team.id;
      }
    }
    return null;
  });

  // Login dialog state
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Captain dashboard state
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [savingMember, setSavingMember] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [membersLoading, setMembersLoading] = useState(false);

  const authedTeam = TEAMS.find(t => t.id === authedTeamId);

  // Real-time listener for members of the authenticated team
  useEffect(() => {
    if (!authedTeamId) return;
    setMembersLoading(true);
    const unsubscribe = onSnapshot(doc(db, 'teams', authedTeamId), (snap) => {
      if (snap.exists()) {
        setMembers(snap.data().members || []);
      } else {
        setMembers([]);
      }
      setMembersLoading(false);
    });
    return () => unsubscribe();
  }, [authedTeamId]);

  // Open login dialog for a team
  const handleOpenLogin = (team) => {
    setSelectedTeam(team);
    setPasswordInput('');
    setLoginError('');
    setLoginOpen(true);
  };

  // Attempt login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const snap = await getDoc(doc(db, 'teams', selectedTeam.id));
      if (!snap.exists()) {
        setLoginError('Team data not found. Please contact admin.');
        setLoginLoading(false);
        return;
      }
      const data = snap.data();
      if (data.password === passwordInput) {
        sessionStorage.setItem(SESSION_PREFIX + selectedTeam.id, 'true');
        setAuthedTeamId(selectedTeam.id);
        setLoginOpen(false);
      } else {
        setLoginError('Incorrect password. Try again.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Error connecting to server. Try again.');
    }
    setLoginLoading(false);
  };

  // Logout
  const handleLogout = () => {
    if (authedTeamId) {
      sessionStorage.removeItem(SESSION_PREFIX + authedTeamId);
    }
    setAuthedTeamId(null);
    setMembers([]);
    setNewMember('');
  };

  // Add member
  const handleAddMember = async () => {
    const name = newMember.trim();
    if (!name || !authedTeamId) return;
    if (members.includes(name)) {
      setSnackbar({ open: true, message: 'Member already exists!', severity: 'warning' });
      return;
    }
    setSavingMember(true);
    try {
      await updateDoc(doc(db, 'teams', authedTeamId), {
        members: arrayUnion(name)
      });
      setNewMember('');
      setSnackbar({ open: true, message: `${name} added to the team!`, severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to add member.', severity: 'error' });
    }
    setSavingMember(false);
  };

  // Remove member
  const handleRemoveMember = async (name) => {
    try {
      await updateDoc(doc(db, 'teams', authedTeamId), {
        members: arrayRemove(name)
      });
      setSnackbar({ open: true, message: `${name} removed.`, severity: 'info' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to remove member.', severity: 'error' });
    }
  };

  // ─── CAPTAIN DASHBOARD (authenticated) ───────────────────────────────────────
  if (authedTeamId && authedTeam) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#000', py: 6 }}>
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between', mb: 5, gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff2a2a, #880000)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255,42,42,0.4)'
              }}>
                <ShieldIcon sx={{ color: '#fff', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography sx={{
                  color: '#ff2a2a', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700, fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase'
                }}>
                  Captain Dashboard
                </Typography>
                <Typography sx={{
                  color: '#ffffff', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800, fontSize: { xs: '1.4rem', sm: '1.8rem' }
                }}>
                  {authedTeam.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`Pool ${authedTeam.pool}`}
                sx={{
                  backgroundColor: 'rgba(255,42,42,0.15)',
                  color: '#ff2a2a',
                  border: '1px solid rgba(255,42,42,0.4)',
                  fontWeight: 700, fontFamily: "'Montserrat', sans-serif"
                }}
              />
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)', color: '#aaa',
                  '&:hover': { borderColor: '#ff2a2a', color: '#ff2a2a', backgroundColor: 'rgba(255,42,42,0.08)' }
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          {/* Add Member */}
          <Paper sx={{
            p: 3, mb: 4, backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,42,42,0.2)', borderRadius: '20px'
          }}>
            <Typography sx={{
              color: '#fff', fontFamily: "'Poppins', sans-serif",
              fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1
            }}>
              <AddIcon sx={{ color: '#ff2a2a' }} /> Add Team Member
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                fullWidth
                placeholder="Enter player name…"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddMember(); }}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    fontFamily: "'Montserrat', sans-serif",
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,42,42,0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#ff2a2a' },
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    borderRadius: '12px'
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddMember}
                disabled={savingMember || !newMember.trim()}
                startIcon={savingMember ? <CircularProgress size={16} color="inherit" /> : <AddIcon />}
                sx={{
                  minWidth: 140,
                  background: 'linear-gradient(135deg, #ff2a2a, #cc0000)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(255,42,42,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg, #ff4444, #ff2a2a)', boxShadow: '0 4px 20px rgba(255,42,42,0.5)' },
                  '&:disabled': { background: 'rgba(255,42,42,0.3)', color: 'rgba(255,255,255,0.4)' }
                }}
              >
                Add
              </Button>
            </Box>
          </Paper>

          {/* Members List */}
          <Paper sx={{
            p: 3, backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,42,42,0.2)', borderRadius: '20px'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{
                color: '#fff', fontFamily: "'Poppins', sans-serif",
                fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1
              }}>
                <GroupsIcon sx={{ color: '#ff2a2a' }} /> Team Roster
              </Typography>
              <Chip
                label={`${members.length} ${members.length === 1 ? 'Player' : 'Players'}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,42,42,0.1)',
                  color: '#ff2a2a',
                  border: '1px solid rgba(255,42,42,0.3)',
                  fontWeight: 700, fontFamily: "'Montserrat', sans-serif"
                }}
              />
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

            {membersLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress sx={{ color: '#ff2a2a' }} />
              </Box>
            ) : members.length === 0 ? (
              <Box sx={{ py: 5, textAlign: 'center' }}>
                <GroupsIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.1)', mb: 1 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif" }}>
                  No members yet. Add your first player above!
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {members.map((name, index) => (
                  <ListItem
                    key={name}
                    sx={{
                      px: 2, py: 1.5, mb: 1,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255,42,42,0.06)',
                        border: '1px solid rgba(255,42,42,0.2)'
                      }
                    }}
                  >
                    <Box sx={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(255,42,42,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mr: 2, flexShrink: 0
                    }}>
                      <Typography sx={{
                        color: '#ff2a2a', fontWeight: 800,
                        fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem'
                      }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <ListItemText
                      primary={name}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#ffffff',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: '1rem'
                        }
                      }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveMember(name)}
                        sx={{
                          color: 'rgba(255,255,255,0.3)',
                          '&:hover': { color: '#ff2a2a', backgroundColor: 'rgba(255,42,42,0.1)' },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Container>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{ borderRadius: '12px', fontFamily: "'Montserrat', sans-serif" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  // ─── TEAM SELECTION + LOGIN PORTAL ───────────────────────────────────────────
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000', py: { xs: 4, sm: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: { xs: 54, sm: 70 }, height: { xs: 54, sm: 70 }, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff2a2a, #880000)',
            boxShadow: '0 0 30px rgba(255,42,42,0.4)',
            mb: { xs: 2, sm: 3 }
          }}>
            <ShieldIcon sx={{ color: '#fff', fontSize: { xs: 26, sm: 36 } }} />
          </Box>
          <Typography sx={{
            color: '#ffffff', fontFamily: "'Poppins', sans-serif",
            fontWeight: 800, mb: 1,
            textTransform: 'uppercase', letterSpacing: { xs: 1, sm: 2 },
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3rem' }
          }}>
            <span style={{ color: '#ff2a2a' }}>Captain</span> Portal
          </Typography>
          <Typography sx={{
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: { xs: '0.82rem', sm: '1rem' },
            px: { xs: 1, sm: 0 }
          }}>
            Select your team and authenticate to manage your roster
          </Typography>
        </Box>

        {/* Pool A */}
        <Typography sx={{
          color: '#ff2a2a', fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, fontSize: { xs: '0.85rem', sm: '1.1rem' }, mb: 2,
          textTransform: 'uppercase', letterSpacing: { xs: 2, sm: 3 },
          borderBottom: '1px solid rgba(255,42,42,0.2)', pb: 1
        }}>
          Pool A
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 5 } }}>
          {TEAMS.filter(t => t.pool === 'A').map((team) => (
            <Grid item xs={6} sm={6} md={3} key={team.id}>
              <TeamCard team={team} onLogin={handleOpenLogin} />
            </Grid>
          ))}
        </Grid>

        {/* Pool B */}
        <Typography sx={{
          color: '#ff2a2a', fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, fontSize: { xs: '0.85rem', sm: '1.1rem' }, mb: 2,
          textTransform: 'uppercase', letterSpacing: { xs: 2, sm: 3 },
          borderBottom: '1px solid rgba(255,42,42,0.2)', pb: 1
        }}>
          Pool B
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {TEAMS.filter(t => t.pool === 'B').map((team) => (
            <Grid item xs={6} sm={6} md={3} key={team.id}>
              <TeamCard team={team} onLogin={handleOpenLogin} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Login Dialog */}
      <Dialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        maxWidth="xs"
        fullWidth
        fullScreen={typeof window !== 'undefined' && window.innerWidth < 600}
        PaperProps={{
          sx: {
            backgroundColor: '#0a0a0a',
            border: { xs: 'none', sm: '1px solid rgba(255,42,42,0.3)' },
            borderRadius: { xs: 0, sm: '20px' },
            backgroundImage: 'none',
            m: { xs: 0, sm: 2 }
          }
        }}
      >
        <DialogTitle sx={{
          color: '#fff', fontFamily: "'Poppins', sans-serif",
          fontWeight: 800, pb: 0, pt: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LockIcon sx={{ color: '#ff2a2a' }} />
            Captain Login
          </Box>
          {selectedTeam && (
            <Typography sx={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 500, mt: 0.5
            }}>
              {selectedTeam.name}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <form onSubmit={handleLogin} id="captain-login-form">
            {loginError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '10px', fontFamily: "'Montserrat', sans-serif" }}>
                {loginError}
              </Alert>
            )}
            <TextField
              fullWidth
              type="password"
              label="Captain Password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setLoginError(''); }}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  fontFamily: "'Montserrat', sans-serif",
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,42,42,0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#ff2a2a' },
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px'
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#ff2a2a' },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setLoginOpen(false)}
            sx={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Montserrat', sans-serif" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="captain-login-form"
            variant="contained"
            disabled={loginLoading || !passwordInput.trim()}
            startIcon={loginLoading ? <CircularProgress size={16} color="inherit" /> : <LockIcon />}
            sx={{
              background: 'linear-gradient(135deg, #ff2a2a, #cc0000)',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              borderRadius: '10px',
              px: 3,
              '&:hover': { background: 'linear-gradient(135deg, #ff4444, #ff2a2a)' },
              '&:disabled': { background: 'rgba(255,42,42,0.3)', color: 'rgba(255,255,255,0.4)' }
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ─── Team Card sub-component ─────────────────────────────────────────────────
function TeamCard({ team, onLogin }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(255,42,42,0.15)',
        borderRadius: { xs: '14px', sm: '20px' },
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        gap: { xs: 1.5, sm: 0 },
        textAlign: { xs: 'left', sm: 'center' },
        '&:hover': {
          border: '1px solid rgba(255,42,42,0.5)',
          backgroundColor: 'rgba(255,42,42,0.05)',
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 25px rgba(255,42,42,0.2)'
        }
      }}
      onClick={() => onLogin(team)}
    >
      {/* Icon */}
      <Box sx={{
        width: { xs: 38, sm: 48 }, height: { xs: 38, sm: 48 },
        flexShrink: 0,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,42,42,0.2), rgba(136,0,0,0.2))',
        border: '1px solid rgba(255,42,42,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mx: { xs: 0, sm: 'auto' }, mb: { xs: 0, sm: 1.5 }
      }}>
        <ShieldIcon sx={{ color: '#ff2a2a', fontSize: { xs: 18, sm: 24 } }} />
      </Box>

      {/* Name */}
      <Typography sx={{
        color: '#fff', fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: { xs: '0.78rem', sm: '0.9rem', md: '0.95rem' },
        lineHeight: 1.3,
        flex: { xs: 1, sm: 'unset' },
        mb: { xs: 0, sm: 1.5 }
      }}>
        {team.name}
      </Typography>

      {/* Login button */}
      <Button
        variant="outlined"
        size="small"
        startIcon={<LockIcon fontSize="small" />}
        onClick={(e) => { e.stopPropagation(); onLogin(team); }}
        sx={{
          borderColor: 'rgba(255,42,42,0.4)', color: '#ff2a2a',
          fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
          borderRadius: '8px',
          fontSize: { xs: '0.65rem', sm: '0.75rem' },
          px: { xs: 1, sm: 1.5 },
          minWidth: 0,
          flexShrink: 0,
          '& .MuiButton-startIcon': { mr: { xs: 0.3, sm: 0.5 } },
          '&:hover': { borderColor: '#ff2a2a', backgroundColor: 'rgba(255,42,42,0.1)' }
        }}
      >
        Login
      </Button>
    </Paper>
  );
}
