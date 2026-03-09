import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function test() {
    const fixturesSnapshot = await getDocs(collection(db, 'fixtures'));
    console.log("Fixtures count:", fixturesSnapshot.size);

    fixturesSnapshot.forEach(doc => console.log(doc.id, doc.data()));

    process.exit();
}

test();
