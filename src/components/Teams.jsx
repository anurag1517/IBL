import React from 'react';
import Footer from './Footer';
import { Box, Typography, Paper, Grid, Container } from '@mui/material';

const Teams = () => {
    const poolATeams = [
        "Dark Knights",
        "Hellfire Clan",
        "Akatsuki",
        "The Real Slim Shady's",
    ];

    const poolBTeams = [
        "Skull Scorchers",
        "Beast Bulls",
        "Small Bois Squad",
        "420 Ballers",
    ];

    return (
        <><Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
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
                                    pb: 2
                                }}
                            >
                                Pool A
                            </Typography>
                            {poolATeams.map((team, index) => (
                                <Box
                                    key={index}
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
                            ))}
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
                                    pb: 2
                                }}
                            >
                                Pool B
                            </Typography>
                            {poolBTeams.map((team, index) => (
                                <Box
                                    key={index}
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
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
            <Footer /></>
    );
};

export default Teams;