import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Tabs, Tab, TextField, Button, IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { db } from '../../firebase';
import { doc, setDoc, deleteDoc, onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
import LiveMatch from '../LiveMatch';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = ({ fixtures, pointsTable, stats, galleryData, archives }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAdmin') === 'true'
  );
  const [passwordInput, setPasswordInput] = useState('');

  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const [activeMatches, setActiveMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  // --- Active Matches Listener ---
  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(
      collection(db, 'matches'),
      where('status', '==', 'live'),
      orderBy('startedAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setActiveMatches(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoadingMatches(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // --- Delete a live match ---
  const handleDeleteMatch = async (matchId) => {
    if (window.confirm('Are you sure you want to permanently delete this match? This cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'matches', matchId));
      } catch (error) {
        console.error('Error deleting match:', error);
        alert('Failed to delete match.');
      }
    }
  };

  // Fixture states
  const [openFixtureDialog, setOpenFixtureDialog] = useState(false);
  const [editingFixture, setEditingFixture] = useState(null);

  // Points states
  const [openPointsDialog, setOpenPointsDialog] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  // Stats states
  const [openStatsDialog, setOpenStatsDialog] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

  // Gallery states
  const [openGalleryDialog, setOpenGalleryDialog] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);

  // Archive states
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false);
  const [editingArchive, setEditingArchive] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', minWidth: '300px' }}>
          <Typography variant="h5" fontWeight="bold">Admin Access</Typography>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <TextField
              type="password"
              label="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}>Login</Button>
          </form>
        </Paper>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // --- Fixtures Logic ---
  const handleOpenFixture = (fixture = null) => {
    if (fixture) {
      setEditingFixture(fixture);
    } else {
      setEditingFixture({
        id: `fixture-${Date.now()}`,
        date: '',
        time: '',
        team1: '',
        team2: '',
        venue: 'Basketball Court',
        status: 'Upcoming'
      });
    }
    setOpenFixtureDialog(true);
  };

  const handleSaveFixture = async () => {
    try {
      await setDoc(doc(db, 'fixtures', editingFixture.id), editingFixture);
      setOpenFixtureDialog(false);
    } catch (error) {
      console.error("Error saving fixture: ", error);
      alert("Failed to save fixture");
    }
  };

  const handleDeleteFixture = async (id) => {
    if (window.confirm("Are you sure you want to delete this fixture?")) {
      try {
        await deleteDoc(doc(db, 'fixtures', id));
      } catch (error) {
        console.error("Error deleting fixture: ", error);
        alert("Failed to delete fixture");
      }
    }
  };

  const handleDeleteAllFixtures = async () => {
    if (window.confirm("WARNING: This will permanently delete ALL fixtures. Are you absolutely sure?")) {
      try {
        for (const fixture of fixtures) {
          await deleteDoc(doc(db, 'fixtures', fixture.id));
        }
        alert("All fixtures have been successfully deleted.");
      } catch (error) {
        console.error("Error deleting all fixtures: ", error);
        alert("Failed to delete all fixtures");
      }
    }
  };

  // --- Stats Logic ---
  const handleOpenStat = (stat = null) => {
    if (stat) {
      setEditingStat(stat);
    } else {
      setEditingStat({
        id: `stat-${Date.now()}`,
        name: '',
        team: '',
        score: 0
      });
    }
    setOpenStatsDialog(true);
  };

  const handleSaveStat = async () => {
    try {
      await setDoc(doc(db, 'stats', editingStat.id), editingStat);
      setOpenStatsDialog(false);
    } catch (error) {
      console.error("Error saving stat: ", error);
      alert("Failed to save stat");
    }
  };

  const handleDeleteStat = async (id) => {
    if (window.confirm("Are you sure you want to delete this player's stats?")) {
      try {
        await deleteDoc(doc(db, 'stats', id));
      } catch (error) {
        console.error("Error deleting stat: ", error);
        alert("Failed to delete stat");
      }
    }
  };

  // --- Points Table Logic ---
  const handleOpenPoints = (team = null) => {
    if (team) {
      setEditingTeam(team);
    } else {
      setEditingTeam({
        id: `team-${Date.now()}`,
        team: '',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'A'
      });
    }
    setOpenPointsDialog(true);
  };

  const handleSavePoints = async () => {
    try {
      await setDoc(doc(db, 'pointsTable', editingTeam.id), editingTeam);
      setOpenPointsDialog(false);
    } catch (error) {
      console.error("Error saving points: ", error);
      alert("Failed to save points");
    }
  };

  const handleResetPoints = async () => {
    if (window.confirm("WARNING: This will reset ALL teams to 0 points AND permanently delete ALL match records and player stats. Are you absolutely sure?")) {
      try {
        // 1. Delete all match documents
        const matchesSnap = await getDocs(collection(db, 'matches'));
        await Promise.all(matchesSnap.docs.map(d => deleteDoc(d.ref)));

        // 2. Delete all player stat documents
        const statsSnap = await getDocs(collection(db, 'stats'));
        await Promise.all(statsSnap.docs.map(d => deleteDoc(d.ref)));

        // 3. Reset each team in the points table to 0
        for (const team of pointsTable) {
          await setDoc(doc(db, 'pointsTable', team.id), {
            ...team,
            played: 0,
            won: 0,
            lost: 0,
            points: 0,
            pointDiff: 0
          });
        }
        alert("All points, match records, and player stats have been reset.");
      } catch (error) {
        console.error("Error resetting points: ", error);
        alert("Failed to reset points");
      }
    }
  };

  const handleDeletePoints = async (id) => {
    if (window.confirm("Are you sure? This will also delete all matches involving this team and the stats of players on those rosters.")) {
      try {
        // 1. Find all matches involving this team
        const matchesQ = query(collection(db, 'matches'), where('teamIds', 'array-contains', id));
        const matchesSnap = await getDocs(matchesQ);

        // 2. Collect all player names that appeared in those matches
        const playerNames = new Set();
        matchesSnap.docs.forEach(d => {
          const data = d.data();
          (data.membersA || []).forEach(n => playerNames.add(n));
          (data.membersB || []).forEach(n => playerNames.add(n));
        });

        // 3. Delete those match documents
        await Promise.all(matchesSnap.docs.map(d => deleteDoc(d.ref)));

        // 4. Delete the stat documents for those players
        await Promise.all([...playerNames].map(name => deleteDoc(doc(db, 'stats', name))));

        // 5. Delete the team from the points table
        await deleteDoc(doc(db, 'pointsTable', id));
      } catch (error) {
        console.error("Error deleting team: ", error);
        alert("Failed to delete team");
      }
    }
  };

  // --- Gallery Logic ---
  const handleOpenGallery = () => {
    // Assuming galleryData is now an array from App.js based on the new structure
    setEditingGallery({ images: Array.isArray(galleryData) ? galleryData : [] });
    setOpenGalleryDialog(true);
  };

  const handleSaveGallery = async () => {
    try {
      await setDoc(doc(db, 'gallery', 'main'), {
        images: editingGallery.images
      });
      setOpenGalleryDialog(false);
    } catch (error) {
      console.error("Error saving gallery: ", error);
      alert("Failed to save gallery");
    }
  };

  // --- Archives Logic ---
  const handleOpenArchive = (archive = null) => {
    if (archive) {
      setEditingArchive(archive);
    } else {
      setEditingArchive({
        id: `archive-${Date.now()}`,
        Edition: '',
        winner: '',
        runnerUp: '',
        secondRunnerUp: '',
        topScorer: '',
        points: ''
      });
    }
    setOpenArchiveDialog(true);
  };

  const handleSaveArchive = async () => {
    try {
      await setDoc(doc(db, 'archives', editingArchive.id), editingArchive);
      setOpenArchiveDialog(false);
    } catch (error) {
      console.error("Error saving archive: ", error);
      alert("Failed to save archive");
    }
  };

  const handleDeleteArchive = async (id) => {
    if (window.confirm("Are you sure you want to delete this archive record?")) {
      try {
        await deleteDoc(doc(db, 'archives', id));
      } catch (error) {
        console.error("Error deleting archive: ", error);
        alert("Failed to delete archive");
      }
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: 'rgba(255,255,255,0.9)', minHeight: '80vh', m: { xs: 1, sm: 2 }, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Admin Portal
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Fixtures" />
          <Tab label="Points Table" />
          <Tab label="Stats" />
          <Tab label="Gallery" />
          <Tab label="Archives" />
          <Tab label="🔴 Live Match" />
        </Tabs>
      </Box>

      {/* FIXTURES TAB */}
      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenFixture()} sx={{ backgroundColor: 'black' }}>
            Add Fixture
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteAllFixtures}>
            Delete All Fixtures
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Teams</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fixtures.map((fixture) => (
                <TableRow key={fixture.id}>
                  <TableCell>{fixture.date}</TableCell>
                  <TableCell>{fixture.time}</TableCell>
                  <TableCell>{fixture.team1} vs {fixture.team2}</TableCell>
                  <TableCell>{fixture.status}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenFixture(fixture)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteFixture(fixture.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {fixtures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No fixtures available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* POINTS TABLE TAB */}
      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenPoints()} sx={{ backgroundColor: 'black' }}>
            Add New Team
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleResetPoints}>
            Reset All Points to 0
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableCell>Team</TableCell>
                <TableCell align="center">P</TableCell>
                <TableCell align="center">W</TableCell>
                <TableCell align="center">L</TableCell>
                <TableCell align="center">Pts</TableCell>
                <TableCell align="center">Diff</TableCell>
                <TableCell align="center">Pool</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pointsTable.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.team}</TableCell>
                  <TableCell align="center">{team.played}</TableCell>
                  <TableCell align="center">{team.won}</TableCell>
                  <TableCell align="center">{team.lost}</TableCell>
                  <TableCell align="center"><strong>{team.points}</strong></TableCell>
                  <TableCell align="center">{team.pointDiff > 0 ? `+${team.pointDiff}` : team.pointDiff}</TableCell>
                  <TableCell align="center">{team.pool}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenPoints(team)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeletePoints(team.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* STATS TAB */}
      <TabPanel value={tabIndex} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenStat()} sx={{ backgroundColor: 'black' }}>
            Add Player Stat
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((player) => (
                <TableRow key={player.id}>
                  <TableCell><strong>#{player.rank}</strong></TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell align="center"><strong>{player.score}</strong> pts</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenStat(player)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteStat(player.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {stats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No player stats available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* GALLERY TAB */}
      <TabPanel value={tabIndex} index={3}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => handleOpenGallery()} sx={{ backgroundColor: 'black' }}>
            Manage Gallery Images
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">Main Gallery</Typography>
                <IconButton size="small" onClick={() => handleOpenGallery()}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2">{Array.isArray(galleryData) ? galleryData.length : 0} Images</Typography>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* ARCHIVES TAB */}
      <TabPanel value={tabIndex} index={4}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenArchive()} sx={{ backgroundColor: 'black' }}>
            Add Archive Record
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                <TableCell>Edition</TableCell>
                <TableCell>Champions</TableCell>
                <TableCell>Runners Up</TableCell>
                <TableCell>Top Scorer</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...archives]
                .sort((a, b) => b.Edition.localeCompare(a.Edition, undefined, { numeric: true, sensitivity: 'base' }))
                .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell><strong>{record.Edition}</strong></TableCell>
                    <TableCell>{record.winner}</TableCell>
                    <TableCell>{record.runnerUp}</TableCell>
                    <TableCell>{record.topScorer}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleOpenArchive(record)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteArchive(record.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {archives.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No archives available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* FIXTURE DIALOG */}
      <Dialog open={openFixtureDialog} onClose={() => setOpenFixtureDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingFixture?.id?.startsWith('fixture-') && !editingFixture?.date ? 'Add Fixture' : 'Edit Fixture'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth label="Date (e.g., 05 Apr 2025)" value={editingFixture?.date || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, date: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth label="Time (e.g., 17:00)" value={editingFixture?.time || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, time: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Team 1" value={editingFixture?.team1 || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, team1: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Team 2" value={editingFixture?.team2 || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, team2: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Venue" value={editingFixture?.venue || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, venue: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Status (e.g., Upcoming / Winner name)" value={editingFixture?.status || ''}
                onChange={(e) => setEditingFixture({ ...editingFixture, status: e.target.value })}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFixtureDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveFixture} sx={{ backgroundColor: 'black' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* POINTS DIALOG */}
      <Dialog open={openPointsDialog} onClose={() => setOpenPointsDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Team Stats</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Team Name"
                value={editingTeam?.team || ''}
                onChange={(e) => setEditingTeam({ ...editingTeam, team: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Played" type="number"
                value={editingTeam?.played || 0}
                onChange={(e) => setEditingTeam({ ...editingTeam, played: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Won" type="number"
                value={editingTeam?.won || 0}
                onChange={(e) => setEditingTeam({ ...editingTeam, won: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Lost" type="number"
                value={editingTeam?.lost || 0}
                onChange={(e) => setEditingTeam({ ...editingTeam, lost: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Points" type="number"
                value={editingTeam?.points || 0}
                onChange={(e) => setEditingTeam({ ...editingTeam, points: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Point Diff" type="number"
                value={editingTeam?.pointDiff || 0}
                onChange={(e) => setEditingTeam({ ...editingTeam, pointDiff: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth label="Pool"
                value={editingTeam?.pool || ''}
                onChange={(e) => setEditingTeam({ ...editingTeam, pool: e.target.value })}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPointsDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePoints} sx={{ backgroundColor: 'black' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* STATS DIALOG */}
      <Dialog open={openStatsDialog} onClose={() => setOpenStatsDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Player Stats</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Player Name"
                value={editingStat?.name || ''}
                onChange={(e) => setEditingStat({ ...editingStat, name: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Team Name"
                value={editingStat?.team || ''}
                onChange={(e) => setEditingStat({ ...editingStat, team: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Total Score (Points)" type="number"
                value={editingStat?.score || 0}
                onChange={(e) => setEditingStat({ ...editingStat, score: parseInt(e.target.value) || 0 })}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatsDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveStat} sx={{ backgroundColor: 'black' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* GALLERY DIALOG */}
      <Dialog open={openGalleryDialog} onClose={() => setOpenGalleryDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Manage Gallery Images</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Image URLs (One per line). Admins can modify these to delete/reorder.</Typography>
              <TextField
                fullWidth multiline rows={10}
                value={editingGallery?.images?.join('\n') || ''}
                onChange={(e) => setEditingGallery({ ...editingGallery, images: e.target.value.split('\n').filter(url => url.trim() !== '') })}
                placeholder="https://imgur.com/example1.jpg&#10;https://imgur.com/example2.jpg"
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGalleryDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveGallery} sx={{ backgroundColor: 'black' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* ARCHIVE DIALOG */}
      <Dialog open={openArchiveDialog} onClose={() => setOpenArchiveDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingArchive?.id?.startsWith('archive-') && !editingArchive?.Edition ? 'Add Archive Record' : 'Edit Archive Record'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Edition (e.g. IBL 3.0)"
                value={editingArchive?.Edition || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, Edition: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Champions"
                value={editingArchive?.winner || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, winner: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Runners Up"
                value={editingArchive?.runnerUp || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, runnerUp: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="2nd Runners Up"
                value={editingArchive?.secondRunnerUp || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, secondRunnerUp: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth label="Top Scorer (e.g. Alex Horo (420 Hoopers))"
                value={editingArchive?.topScorer || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, topScorer: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Points"
                value={editingArchive?.points || ''}
                onChange={(e) => setEditingArchive({ ...editingArchive, points: e.target.value })}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenArchiveDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveArchive} sx={{ backgroundColor: 'black' }}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* LIVE MATCH TAB */}
      <TabPanel value={tabIndex} index={5}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#000', mb: 2, fontWeight: 'bold' }}>Ongoing Live Matches</Typography>
          {loadingMatches ? (
            <Typography>Loading matches...</Typography>
          ) : activeMatches.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
              <Typography color="textSecondary">No live matches currently running.</Typography>
            </Paper>
          ) : (
            <List>
              {activeMatches.map((match) => (
                <ListItem key={match.id} component={Paper} sx={{ mb: 2, p: 2, border: '1px solid #ff2a2a44' }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {match.teamAName} vs {match.teamBName}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="textSecondary">
                          Match ID: {match.id} | Started: {match.startedAt ? new Date(match.startedAt).toLocaleString() : 'N/A'}
                        </Typography>
                        <Chip 
                          label={`${match.totalA || 0} - ${match.totalB || 0}`} 
                          size="small" 
                          sx={{ mt: 1, backgroundColor: '#ff2a2a', color: '#fff', fontWeight: 'bold' }} 
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => navigate(`/admin/scoring/${match.id}`)}
                      sx={{ backgroundColor: '#2a8fff', '&:hover': { backgroundColor: '#1a76d2' } }}
                    >
                      Continue Scoring
                    </Button>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteMatch(match.id)}
                      title="Delete this match"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box>
          <Typography variant="h6" sx={{ color: '#000', mb: 2, fontWeight: 'bold' }}>Start a New Match</Typography>
          <Box sx={{ mx: -2, mt: -1 }}>
            <LiveMatch pointsTable={pointsTable} />
          </Box>
        </Box>
      </TabPanel>

    </Box>
  );
};

export default AdminDashboard;