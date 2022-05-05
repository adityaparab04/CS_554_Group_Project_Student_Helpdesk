import firebaseApp from "./Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut,reauthenticateWithCredential,updatePassword,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup,sendPasswordResetEmail } from "firebase/auth";
import { createUser, getUserInfo } from './DataBase';
const auth = getAuth(firebaseApp);

async function doCreateUserWithEmailAndPassword(email, password, firstName, lastName) {
    let displayName = firstName + ' ' + lastName
    console.log(firstName, lastName, displayName);
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser(auth.currentUser, firstName, lastName);
    updateProfile(auth.currentUser, { displayName: displayName });
    console.log("User Created having UID:", auth.currentUser.uid)
}

async function doSignInWithEmailAndPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    await getUserInfo(auth.currentUser.uid);
    console.log("User Signed-In having UID:", auth.currentUser.uid)
}

async function doSignOut() {
    await signOut(auth);
    console.log("User Signed-Out")
}

async function doChangePassword(email, oldPassword, newPassword) {
    let credential = (auth.EmailAuthProvider.credential,
        email,
        oldPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    await doSignOut();
}

async function doSocialSignIn(provider) {
    let socialProvider = null;
    if (provider === 'google') {
        socialProvider = new GoogleAuthProvider(auth);
    } else if (provider === 'facebook') {
        socialProvider = new FacebookAuthProvider(auth);
    }
    await signInWithPopup(auth, socialProvider);
}

async function doPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

async function doPasswordUpdate(password) {
    await updatePassword(auth, password);
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    doChangePassword,
    doSocialSignIn,
    doPasswordUpdate,
    doPasswordReset
}