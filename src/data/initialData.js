export const initialFixtures = [
    {
        date: '05 Apr 2025',
        time: '17:00',
        team1: 'Skull Scorchers',
        team2: 'Beast Bulls',
        venue: 'Basketball Court',
        status: 'Beast Bulls'
    },
    {
        date: '05 Apr 2025',
        time: '17:30',
        team1: 'The Real Slim Shady`s',
        team2: 'Dark Knights',
        venue: 'Basketball Court',
        status: 'The Real Slim Shady`s'
    },
    {
        date: '05 Apr 2025',
        time: '18:00',
        team1: 'Beast Bulls',
        team2: '420 Ballers',
        venue: 'Basketball Court',
        status: 'Upcoming'
    },
    {
        date: '05 Apr 2025',
        time: '18:30',
        team1: 'Dark Knights',
        team2: ' Hellfire Clan',
        venue: 'Basketball Court',
        status: 'Upcoming'
    },
    {
        date: '05 Apr 2025',
        time: '19:00',
        team1: 'Small Bois Squad',
        team2: '420 Ballers',
        venue: 'Basketball Court',
        status: 'Small Bois Squad'
    },
    {
        date: '05 Apr 2025',
        time: '19:30',
        team1: 'Akatsuki',
        team2: 'Hellfire Clan',
        venue: 'Basketball Court',
        status: 'Upcoming'
    },
    {
        date: '05 Apr 2025',
        time: '20:00',
        team1: 'Skull Scorchers',
        team2: 'Small Bois Squad',
        venue: 'Basketball Court',
        status: 'Skull Scorchers'
    },
    {
        date: '05 Apr 2025',
        time: '20:30',
        team1: 'Akatsuki',
        team2: 'The Real Slim Shady`s',
        venue: 'Basketball Court',
        status: 'The Real Slim Shady`s'
    },
    {
        date: '06 Apr 2025',
        time: '08:00',
        team1: 'The Real Slim Shady`s',
        team2: 'Hellfire Clan',
        venue: 'Basketball Court',
        status: 'The Real Slim Shady`s'
    },
    {
        date: '06 Apr 2025',
        time: '08:30',
        team1: 'Skull Scorchers',
        team2: '420 Ballers',
        venue: 'Basketball Court',
        status: 'Skull Scorchers'
    },
    {
        date: '06 Apr 2025',
        time: '09:00',
        team1: 'Akatsuki',
        team2: 'Dark Knights',
        venue: 'Basketball Court',
        status: 'Upcoming'
    },
    {
        date: '06 Apr 2025',
        time: '09:30',
        team1: 'Beast Bull',
        team2: 'Small Bois Squad',
        venue: 'Basketball Court',
        status: 'Small Bois Squad'
    }
];

export const initialTeamStandings = [
    {
        team: 'Dark Knights',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'A'
    },
    {
        team: 'Hellfire Clan',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'A'
    },
    {
        team: 'Akatsuki',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'A'
    },
    {
        team: "The Real Slim Shady's",
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'A'
    },

    {
        team: 'Skull Scorchers',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'B'
    },
    {
        team: 'Beast Bulls',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'B'
    },
    {
        team: '420 Ballers',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'B'
    },
    {
        team: 'Small Bois Squad',
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointDiff: 0,
        pool: 'B'
    }
];

// Add unique ids to each fixture and points entry so it is easier to update/delete
export const initialFixturesWithIds = initialFixtures.map((f, i) => ({ id: `fixture-${Date.now()}-${i}`, ...f }));
export const initialTeamStandingsWithIds = initialTeamStandings.map((t, i) => ({ id: `team-${Date.now()}-${i}`, ...t }));
