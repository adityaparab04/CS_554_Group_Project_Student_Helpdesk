import firebaseApp from "./Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut,reauthenticateWithCredential,updatePassword,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup,sendPasswordResetEmail, EmailAuthProvider, updateEmail, EmailAuthCredential } from "firebase/auth";
import { createUser, getUserInfo, updateUserInformation } from './DataBase';
const auth = getAuth(firebaseApp);

async function doCreateUserWithEmailAndPassword(email, password, firstName, lastName) {
    let displayName = firstName + ' ' + lastName
    // console.log(firstName, lastName, displayName);
    await createUserWithEmailAndPassword(auth, email, password);
    await createUser(auth.currentUser, firstName, lastName, displayName, email);
    updateProfile(auth.currentUser, { displayName: displayName });
    console.log("User Created having UID:", auth.currentUser);
}

async function doSignInWithEmailAndPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    await getUserInfo(auth.currentUser.uid);
    console.log("User Signed-In having UID:", auth.currentUser.uid);
}

async function doSignOut() {
    await signOut(auth);
    console.log("User Signed-Out")
}

async function doChangePassword(email, oldPassword, newPassword) {
    let credential = EmailAuthProvider.credential(
        email,
        oldPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
    await doSignOut();
}

async function doUpdateUser(email, newEmail, newFirstName, newLastName, newDisplayName, password){
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, newEmail);
    updateProfile(auth.currentUser, { displayName: newDisplayName });
    await updateUserInformation(auth.currentUser.uid, newEmail, newFirstName, newLastName, newDisplayName);
}

async function doGoogleSignIn() {
    let socialProvider = null;
        socialProvider = new GoogleAuthProvider(auth);
        console.log(socialProvider);
    await signInWithPopup(auth, socialProvider);
}

async function doPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    doChangePassword,
    doGoogleSignIn,
    doPasswordReset,
    doUpdateUser
}