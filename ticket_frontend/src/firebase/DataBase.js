/* eslint-disable no-unused-vars */
import { getFirestore } from "firebase/firestore";
import firebaseApp from './Firebase';
import { collection, addDoc,doc, getDocs, onSnapshot,query  } from "firebase/firestore"; 
const db = getFirestore(firebaseApp);

async function getUserInfo(userID){

}

async function userResolveTicket(ticketID){

}

async function userUpdateTicket(currentUser,ticketID, newText){
    console.log(currentUser.uid, ticketID, newText);
}

async function userAddTicket(currentUser,title, text){
    
    const docRef = await addDoc(collection(db, "Tickets"), {
        ClientID: currentUser.uid,
        StaffID: "",
        TicketContent: [{author: currentUser.displayName, text: text, Time: Date().toString()}],
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
    // todo
    return listAllTickets();

}

async function listTicketsByClientID(staffID){
    // todo
    return listAllTickets();

}
export {
    userAddTicket,
    listAllTickets,
    listTicketsByStaffID,
    listTicketsByClientID,
    userUpdateTicket,
    userResolveTicket
}