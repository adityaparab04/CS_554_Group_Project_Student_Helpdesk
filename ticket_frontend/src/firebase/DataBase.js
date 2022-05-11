/* eslint-disable no-unused-vars */
import { getFirestore } from "firebase/firestore";
import firebaseApp from './Firebase';
import { collection, addDoc, setDoc, doc, getDoc, getDocs, updateDoc, onSnapshot, query, where, arrayUnion, arrayRemove  } from "firebase/firestore"; 
const db = getFirestore(firebaseApp);

async function createUser(user, firstName, lastName, displayName, phoneNumber){
    const newUser = await setDoc(doc(db, 'Users', user.uid), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        email: user.email,
        role: 'client',
        profilePhoto: user.photoURL,
        phoneNumber: phoneNumber,
        providerId: user.providerData[0].providerId
    });
    return newUser;
}

async function getAllClients(){
    const q = query(collection(db, "Users"), where("role", "==", "client"));
    const allClients = await getDocs(q);
    let clients = [];
    allClients.forEach((doc) => {
        clients.push({
            ...doc.data()
        })
    })
    return clients;
}

async function getAllStaff(){
    const q = query(collection(db, "Users"), where("role", "==", "staff"));
    const allStaff = await getDocs(q);
    let staff = [];
    allStaff.forEach((doc) => {
        staff.push({
            ...doc.data()
        })
    })
    return staff;
}

async function getAllAdmins(){
    const q = query(collection(db, "Users"), where("role", "==", "admins"));
    const allAdmins = await getDocs(q);
    let admins = [];
    allAdmins.forEach((doc) => {
        admins.push({
            ...doc.data()
        })
    })
    return admins;
}

async function getUserInfo(userID){
    const docRef = doc(db, "Users", userID)
    const user = await getDoc(docRef);
    if (user.exists()) {
        return user.data();
      } else {
        console.log("No such document!");
    }
}

async function userResolveTicket(ticketID){
    const getTicket = doc(db, "Tickets", ticketID);
    const resolvedTicket = await updateDoc(getTicket, {
        isResolved: true
    });
    return resolvedTicket;
}

async function userUnResolveTicket(ticketID){
    const getTicket = doc(db, "Tickets", ticketID);
    const unResolvedTicket = await updateDoc(getTicket, {
        isResolved: false
    });
    return unResolvedTicket;
}

async function userUpdateTicket(currentUser, ticketID, newText){
    // console.log(currentUser.displayName);
    const getTicket = doc(db, "Tickets", ticketID);
    const comment = {
        author: currentUser.firstName + ' '+currentUser.lastName,
        text: newText, 
        Time: Date().toString()
    }
    const addComment = await updateDoc(getTicket, {
        TicketContent: arrayUnion(comment)
    });
    return addComment;
}

async function userAddTicket(currentUser, title, text){
    
    const docRef = await addDoc(collection(db, "Tickets"), {
        ClientID: currentUser.uid,
        StaffID: "",
        TicketContent: [{author: currentUser.firstName + ' '+currentUser.lastName, text: text, Time: Date().toString()}],
        TicketTitle: title,
        isAssigned: false,
        isResolved: false,
      });
    console.log("Document written with ID: ", docRef.id);
    return docRef;
}

async function staffUpdateTicket(currentUser, ticketID, newText){
    const getTicket = doc(db, "Tickets", ticketID);
    const addComment = await updateDoc(getTicket, {
        TicketContent: arrayUnion({author: currentUser.firstName + ' ' + currentUser.lastName, text: newText, Time: Date().toString()})
    });
    return addComment;
}

async function adminAssignTicket(ticketID, staffID){
    const getTicket = doc(db, "Tickets", ticketID);
    const assignTicket = await updateDoc(getTicket, {
        isAssigned: true,
        StaffID: staffID
    })
    return assignTicket;
}

async function adminUnassignTicket(ticketID){
    const getTicket = doc(db, "Tickets", ticketID);
    const unAssignTicket = await updateDoc(getTicket, {
        isAssigned: false,
        StaffID: ""
    })
    return unAssignTicket;
}

async function listAllTickets(callback){
    // const querySnapshot = await getDocs(collection(db, "Tickets"));
    // return querySnapshot.docs;
    
    const q = query(collection(db, "Tickets"));
    
    onSnapshot(q,(querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({id: doc.id, data: doc.data()});
        });
        callback(data);
    });
    
}

async function listTicketsByStaffID(staffID){
    const q = query(collection(db, "Tickets"), where("StaffID", "==", staffID));
    const staffTickets = await getDocs(q);
    let tickets = [];
    staffTickets.forEach((doc) => {
        tickets.push({
            ...doc.data()
        })
    })
    return tickets;

}

async function listTicketsByClientID(clientID){
    const q = query(collection(db, "Tickets"), where("ClientID", "==", clientID));
    const clientTickets = await getDocs(q);
    let tickets = [];
    clientTickets.forEach((doc) => {
        tickets.push({
            ...doc.data()
        })
    })
    return tickets;
}

async function updateUserInformation(userId, newFirstName, newLastName, newDisplayName, newPhoneNumber){
    const getUser = doc(db, 'Users', userId);
    const updatedUser = await updateDoc(getUser, {
        firstName: newFirstName,
        lastName: newLastName,
        displayName: newDisplayName,
        phoneNumber: newPhoneNumber,
    });
    return updatedUser;
}

async function updateUserEmail(userId, newEmail){
    const getUser = doc(db, 'Users', userId);
    const updatedUser = await updateDoc(getUser, {
        email: newEmail,
    });
    return updatedUser;
}

export {
    createUser,
    getAllClients,
    getAllStaff,
    getAllAdmins,
    getUserInfo,
    userAddTicket,
    listAllTickets,
    listTicketsByStaffID,
    listTicketsByClientID,
    userUpdateTicket,
    userResolveTicket,
    userUnResolveTicket,
    adminAssignTicket,
    adminUnassignTicket,
    staffUpdateTicket,
    updateUserInformation,
    updateUserEmail
}