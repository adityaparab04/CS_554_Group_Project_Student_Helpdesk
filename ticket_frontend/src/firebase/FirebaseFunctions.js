import firebaseApp from "./Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

async function doCreateUserWithEmailAndPassword(email, password, diplayName) {
    await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, { displayName: diplayName });
    console.log("User Created having UID:", auth.currentUser.uid)
}

async function doSignInWithEmailAndPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
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