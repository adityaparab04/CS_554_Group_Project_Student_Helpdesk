import firebase from 'firebase/compat/app';


async function doCreateUserWithEmailAndPassword(email, password, diplayName){
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({displayName: diplayName});
    console.log("User Created having UID:", firebase.auth().currentUser.uid)
}

async function doSignInWithEmailAndPassword(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("User Signed-In having UID:", firebase.auth().currentUser.uid)
}

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword
}