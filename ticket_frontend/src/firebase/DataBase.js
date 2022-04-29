/* eslint-disable no-unused-vars */
import { getFirestore } from "firebase/firestore";
import firebaseApp from './Firebase';
import { collection, addDoc } from "firebase/firestore"; 
const db = getFirestore(firebaseApp);

async function getUserInfo(userID){

}

async function userResolveTicket(ticketID){

}

async function userUpdateTicket(ticketID, newText){

}

async function userAddTicket(title, text){
    
    const docRef = await addDoc(collection(db, "Tickets"), {
        ClientID: "",
        StaffID: "",
        TicketContent: [{author: "username", text: text}],
        TicketTitle: title,
        isAssigned: false,
        isResolved: false,
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

}

async function listTicketsByStaffID(staffID){

}

async function listTicketsByClientID(staffID){

}
export {
    userAddTicket
}