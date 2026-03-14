/**
 * Firestore Seed Script — IBL Captain Dashboard
 * 
 * This script seeds the Firestore `teams` collection with 8 team documents.
 * Each document stores the team's name, pool, captain password, and empty members array.
 * 
 * Usage (run once from the IBL project root):
 *   node scripts/seedTeams.js
 * 
 * Prerequisites:
 *   npm install firebase  (already installed as a project dependency)
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCykJUQJtLWo4b0ZZSYLLqaqCuc2Qj9W4",
  authDomain: "ibl-web-app.firebaseapp.com",
  projectId: "ibl-web-app",
  storageBucket: "ibl-web-app.firebasestorage.app",
  messagingSenderId: "241731526930",
  appId: "1:241731526930:web:affcea25a447d1631e53cb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Default password for ALL 8 captains is "ibl2025".
// CHANGE EACH TEAM'S PASSWORD IN FIREBASE CONSOLE AFTER RUNNING THIS SCRIPT.
const teams = [
  { id: 'dark-knights',     name: 'Dark Knights',          pool: 'A', password: 'ibl2025' },
  { id: 'hellfire-clan',    name: 'Hellfire Clan',         pool: 'A', password: 'ibl2025' },
  { id: 'akatsuki',         name: 'Akatsuki',              pool: 'A', password: 'ibl2025' },
  { id: 'real-slim-shadys', name: "The Real Slim Shady's", pool: 'A', password: 'ibl2025' },
  { id: 'skull-scorchers',  name: 'Skull Scorchers',       pool: 'B', password: 'ibl2025' },
  { id: 'beast-bulls',      name: 'Beast Bulls',           pool: 'B', password: 'ibl2025' },
  { id: 'small-bois-squad', name: 'Small Bois Squad',      pool: 'B', password: 'ibl2025' },
  { id: '420-ballers',      name: '420 Ballers',           pool: 'B', password: 'ibl2025' },
];

async function seed() {
  console.log('Seeding Firestore teams collection...\n');
  for (const team of teams) {
    await setDoc(doc(db, 'teams', team.id), {
      name: team.name,
      pool: team.pool,
      password: team.password,
      members: [],
    }, { merge: true }); // merge: true so existing members are NOT wiped if re-run
    console.log(`✓ ${team.name} (${team.id})`);
  }
  console.log('\nDone! All 8 teams seeded with default password: ibl2025');
  console.log('Remember to change each team\'s password in Firebase Console → Firestore → teams → {teamId} → password');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding:', err);
  process.exit(1);
});
