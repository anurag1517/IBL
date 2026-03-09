import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialTeamStandings = [
    { team: 'Dark Knights', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'A' },
    { team: 'Hellfire Clan', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'A' },
    { team: 'Akatsuki', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'A' },
    { team: "The Real Slim Shady's", played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'A' },
    { team: 'Skull Scorchers', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'B' },
    { team: 'Beast Bulls', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'B' },
    { team: '420 Ballers', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'B' },
    { team: 'Small Bois Squad', played: 0, won: 0, lost: 0, points: 0, pointDiff: 0, pool: 'B' }
];
const initialTeamStandingsWithIds = initialTeamStandings.map((t, i) => ({ id: `team-${Date.now()}-${i}`, ...t }));

async function resetPoints() {
    console.log("Fetching existing points standings...");
    const snapshot = await getDocs(collection(db, 'pointsTable'));

    console.log(`Found ${snapshot.docs.length} documents. Deleting them...`);
    for (const document of snapshot.docs) {
        await deleteDoc(doc(db, 'pointsTable', document.id));
    }

    console.log("Writing new zeroed standings...");
    for (const team of initialTeamStandingsWithIds) {
        await setDoc(doc(db, 'pointsTable', team.id), team);
    }

    console.log("Reset successful.");
    process.exit(0);
}

resetPoints().catch(console.error);
