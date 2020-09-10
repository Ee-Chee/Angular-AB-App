import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    createUserAddress(value) {
        return this.db.collection('user-addresses').add({
            firstname: value.firstname,
            lastname: value.lastname,
            gender: value.gender,
            birthday: value.birthday,
            address: value.address
        }); //add method returns Promise. However, methods from DocumentChangeAction like snapshotChanges() return Observable of data. 
    }

    getUserAddresses() {
        return this.db.collection('user-addresses').snapshotChanges();
    }

    updateUserInfo(value) {
        return this.db.collection('user-addresses').doc(value.id).set(value);
    }

    deleteUserAddress(userKey) {
        return this.db.collection('user-addresses').doc(userKey).delete();
    }
}
