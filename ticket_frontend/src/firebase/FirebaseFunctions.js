import firebaseApp from "./Firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut,reauthenticateWithCredential,updatePassword,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup,sendPasswordResetEmail, EmailAuthProvider, updateEmail, EmailAuthCredential } from "firebase/auth";
import { createUser, getUserInfo, updateUserEmail, updateUserInformation } from './DataBase';
const auth = getAuth(firebaseApp);

async function doCreateUserWithEmailAndPassword(email, password, firstName, lastName, phoneNumber, url) {
    let displayName = firstName + ' ' + lastName
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: displayName, photoURL: url });
    await createUser(auth.currentUser, firstName, lastName, displayName, phoneNumber);
    console.log(auth.currentUser);
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

async function doChangeEmail(oldEmail, newEmail, password) {
    let credential = EmailAuthProvider.credential(
        oldEmail,
        password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updateEmail(auth.currentUser, newEmail);
    await updateUserEmail(auth.currentUser.uid, newEmail);
    await doSignOut();
}

async function doUpdateUser(newFirstName, newLastName, newDisplayName, newPhoneNumber){
    updateProfile(auth.currentUser, { displayName: newDisplayName });
    await updateUserInformation(auth.currentUser.uid, newFirstName, newLastName, newDisplayName, newPhoneNumber);
}

async function doGoogleSignIn() {
    let socialProvider = null;
    socialProvider = new GoogleAuthProvider(auth);
    await signInWithPopup(auth, socialProvider);
    // console.log(auth.currentUser);
    const user = auth.currentUser;
    const displayName = user.displayName;
    const name = displayName.split(' ');
    const firstName = name[0];
    const lastName = name[1];
    await createUser(auth.currentUser, firstName, lastName, displayName, auth.currentUser.phoneNumber);
}

async function doPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    doChangePassword,
    doChangeEmail,
    doGoogleSignIn,
    doPasswordReset,
    doUpdateUser
}