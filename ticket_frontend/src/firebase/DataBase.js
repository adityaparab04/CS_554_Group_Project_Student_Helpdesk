/* eslint-disable no-unused-vars */
import { getFirestore } from "firebase/firestore";
import firebaseApp from './Firebase';
import { collection, addDoc,doc, getDocs, serverTimestamp  } from "firebase/firestore"; 
const db = getFirestore(firebaseApp);

async function getUserInfo(userID){

}

async function userResolveTicket(ticketID){

}

async function userUpdateTicket(ticketID, newText){

}

async function userAddTicket(currentUser,title, text){
    
    const docRef = await addDoc(collection(db, "Tickets"), {
        ClientID: currentUser.uid,
        StaffID: "",
        TicketContent: [{author: currentUser.displayName, text: text}],
        TicketTitle: title,
        isAssigned: false,
        isResolved: false,
        UpdateTime:serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
}

async function staffUpdateTicket(ticketID, newText){

}

async function adminAssignTicket(ticketID, staffID){

}

async function adminUnassignTicket(ticketID){

}

async function listAllTickets(){
    const querySnapshot = await getDocs(collection(db, "Tickets"));
    return querySnapshot.docs;
}

async function listTicketsByStaffID(staffID){

}

async function listTicketsByClientID(staffID){

}
export {
    userAddTicket,
    listAllTickets
}