import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import {
  Box, Typography, Paper, Grid, Container,
  Dialog, DialogTitle, DialogContent, IconButton,
  List, ListItem, ListItemText, CircularProgress, Chip, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
import ShieldIcon from '@mui/icons-material/Shield';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Team IDs must match those in CaptainDashboard.jsx
const TEAM_IDS = {
  'Dark Knights': 'dark-knights',
  'Hellfire Clan': 'hellfire-clan',
  "The Real Slim Shady's": 'real-slim-shadys',
  'Skull Scorchers': 'skull-scorchers',
  'Beast Bulls': 'beast-bulls',
  'Small Bois Squad': 'small-bois-squad',
  '420 Ballers': '420-ballers',
  'The Black Mambas': 'the-black-mambas'
};

const Teams = () => {
  const poolATeams = [
    '420 Ballers',
    'Hellfire Clan',
    "The Real Slim Shady's",
    "Small Bois Squad"
  ];

  const poolBTeams = [
    'Skull Scorchers',
    'Beast Bulls',
    'Dark Knights',
    'The Black Mambas'
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null); // team name string
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // Subscribe to real-time members when a team is selected
  useEffect(() => {
    if (!selectedTeam) return;
    const teamId = TEAM_IDS[selectedTeam];
    if (!teamId) return;

    setMembersLoading(true);
    const unsubscribe = onSnapshot(doc(db, 'teams', teamId), (snap) => {
      if (snap.exists()) {
        setMembers(snap.data().members || []);
      } else {
        setMembers([]);
      }
      setMembersLoading(false);
    });
    return () => unsubscribe();
  }, [selectedTeam]);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    setMembers([]);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedTeam(null);
    setMembers([]);
  };

  const renderTeamCard = (team, index) => (
    <Box
      key={index}
      onClick={() => handleTeamClick(team)}
      sx={{
        p: 2.5,
        mb: 2,
        color: '#ffffff',
        backgroundColor: 'rgba(25, 25, 25, 0.9)',
        textAlign: 'center',
        borderRadius: '15px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontSize: '1.1rem',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(255, 42, 42, 0.1)',
          border: '1px solid rgba(255, 42, 42, 0.5)',
          transform: 'translateY(-3px)',
          boxShadow: '0 5px 15px rgba(255, 42, 42, 0.2)'
        }
      }}
    >
      {team}
    </Box>
  );

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            backgroundColor: '#000000',
            borderRadius: '30px',
            border: '1px solid rgba(255, 42, 42, 0.2)',
            mx: 'auto',
            maxWidth: '1000px'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 5,
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              textTransform: 'uppercase',
              fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '2px'
            }}
          >
            <span style={{ color: '#ff2a2a' }}>IBL</span> Teams
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {/* Pool A */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: '#0a0a0a',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 42, 42, 0.15)',
                  height: '100%'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: '#ff2a2a',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontFamily: "'Poppins', sans-serif",
                    borderBottom: '2px solid rgba(255, 42, 42, 0.2)',
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.1rem' },
                    pb: 2
                  }}
                >
                  Pool A
                </Typography>
                {poolATeams.map((team, index) => renderTeamCard(team, index))}
              </Paper>
            </Grid>

            {/* Pool B */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: '#0a0a0a',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 42, 42, 0.15)',
                  height: '100%'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: '#ff2a2a',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontFamily: "'Poppins', sans-serif",
                    borderBottom: '2px solid rgba(255, 42, 42, 0.2)',
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.1rem' },
                    pb: 2
                  }}
                >
                  Pool B
                </Typography>
                {poolBTeams.map((team, index) => renderTeamCard(team, index))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />

      {/* Team Roster Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,42,42,0.3)',
            borderRadius: '20px',
            backgroundImage: 'none'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff2a2a, #880000)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShieldIcon sx={{ color: '#fff', fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{
                  color: '#ffffff', fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.2
                }}>
                  {selectedTeam}
                </Typography>
                <Typography sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem'
                }}>
                  Team Roster
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#ff2a2a' } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 0, pb: 3 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2 }} />

          {membersLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#ff2a2a' }} size={32} />
            </Box>
          ) : members.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <GroupsIcon sx={{ fontSize: 44, color: 'rgba(255,255,255,0.1)', mb: 1 }} />
              <Typography sx={{
                color: 'rgba(255,255,255,0.35)',
                fontFamily: "'Montserrat', sans-serif", fontSize: '0.9rem'
              }}>
                No members added yet
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
                <Chip
                  label={`${members.length} ${members.length === 1 ? 'Player' : 'Players'}`}
                  size="small"
                  icon={<GroupsIcon sx={{ fontSize: '14px !important', color: '#ff2a2a !important' }} />}
                  sx={{
                    backgroundColor: 'rgba(255,42,42,0.1)',
                    color: '#ff2a2a',
                    border: '1px solid rgba(255,42,42,0.3)',
                    fontWeight: 700, fontFamily: "'Montserrat', sans-serif"
                  }}
                />
              </Box>
              <List disablePadding>
                {members.map((name, index) => (
                  <ListItem
                    key={name}
                    sx={{
                      px: 2, py: 1.2, mb: 1,
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <Box sx={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: 'rgba(255,42,42,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mr: 1.5, flexShrink: 0
                    }}>
                      <Typography sx={{
                        color: '#ff2a2a', fontWeight: 800,
                        fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem'
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
                          fontWeight: 600, fontSize: '0.95rem'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Teams;