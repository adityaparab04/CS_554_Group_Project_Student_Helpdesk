import firebase from 'firebase/compat/app';


async function doCreateUserWithEmailAndPassword(email, password){
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // firebase.auth().currentUser.updateProfile({displayName: displayName});
}

async function doSignInWithEmailAndPassword(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

export {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword
}