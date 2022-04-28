import firebaseApp from "./Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile, signOut  } from "firebase/auth";
const auth = getAuth(firebaseApp);

async function doCreateUserWithEmailAndPassword(email, password, diplayName){
    await createUserWithEmailAndPassword(auth,email, password);
    updateProfile(auth.currentUser, {displayName: diplayName});
    console.log("User Created having UID:", auth.currentUser.uid)
}

async function doSignInWithEmailAndPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User Signed-In having UID:", auth.currentUser.uid)
}

async function doSignOut(){
    await signOut(auth);
    console.log("User Signed-Out")
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
}