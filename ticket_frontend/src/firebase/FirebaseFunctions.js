import firebaseApp from "./Firebase";
import firebaseApp2 from "./Firebase2";
import axios from 'axios';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut,
    reauthenticateWithCredential,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail, 
    EmailAuthProvider, 
    updateEmail, 
    deleteUser
} from "firebase/auth";

import { 
    createUser, 
    getUserInfo, 
    updateUserEmail, 
    updateUserInformation, 
    updateProfilePhoto, 
    deleteUserProfile
} from './DataBase';

const auth = getAuth(firebaseApp);
const auth2 = getAuth(firebaseApp2);

async function doCreateUserWithEmailAndPassword(email, password, firstName, lastName, phoneNumber, url, role) {
    let displayName = firstName + ' ' + lastName
    await createUserWithEmailAndPassword(auth2, email, password);
    const res = await axios.post("/email", {
        email: email
    });
    console.log(res);
    await updateProfile(auth2.currentUser, { displayName: displayName, photoURL: url });
    await createUser(auth2.currentUser, firstName, lastName, displayName, phoneNumber, role);
    await signOut(auth2);
}

async function updatePhotoUrl(url){
    await updateProfile(auth.currentUser, { photoURL: url });
    await updateProfilePhoto(auth.currentUser.uid, url);
    console.log('profile pic changed in auth');
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
    await createUser(auth.currentUser, firstName, lastName, displayName, auth.currentUser.phoneNumber, 'client');
    await axios.post("/social", {
        email: auth.currentUser.email
    });
}

async function doPasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

async function doDeleteUser(email, password){
    const credential = EmailAuthProvider.credential(
        email,
        password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await deleteUserProfile(auth.currentUser.uid);
    await deleteUser(auth.currentUser);
    return("User Deleted from auth successfully");
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    doChangePassword,
    doChangeEmail,
    doGoogleSignIn,
    doPasswordReset,
    doUpdateUser,
    updatePhotoUrl,
    doDeleteUser
}