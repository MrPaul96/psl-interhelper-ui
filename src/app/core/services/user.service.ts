import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class UserService {

    constructor(private angularFireStore: AngularFirestore) { }

    getUserDocumentById(id: string): AngularFirestoreDocument<User> {
        return this.angularFireStore.doc<User>(`users/${id}`);
    }

    getUsersCollection(): AngularFirestoreCollection<User> {
        return this.angularFireStore.collection<User>('users');
    }

    getUserById(id: string): Observable<User> {
        const userDocument = this.getUserDocumentById(id);
        return userDocument
            .snapshotChanges()
            .pipe(map((action) => action.payload.data()));
    }

    getUsersByRole(role: string): Observable<User[]> {
        const userCollection = this.getUsersCollection();
        return userCollection
            .snapshotChanges()
            .pipe(map(changes => this.handleUserData(changes, role)));
    }

    handleUserData(changes, role) {
        return changes
            .map(action => this.getUserData(action))
            .filter((user: User) => this.verficateUserRole(user, role));
    }

    getUserData(action): User {
        return action.payload.doc.data() as User;
    }

    verficateUserRole(user: User, rol: string): User {
        if ( _.get(user, `role[${rol}]` )) {
            return user;
        }
    }
}
