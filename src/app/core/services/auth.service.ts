import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth) {
  }

  logIn(email: string, password: string): Observable<any> {
    return from(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logOut(): Observable<any> {
    return from(this.firebaseAuth.auth.signOut());
  }

  getAuth(): Observable<any> {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }
}
