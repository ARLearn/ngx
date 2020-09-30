import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../models/user';
import {auth} from 'firebase/app';
import {Store} from '@ngrx/store';
import {State} from 'src/app/core/reducers';
import * as firebase from 'firebase';
import {UserClaim} from '../state/auth.state';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(
        private store$: Store<State>,
        public af: AngularFireAuth) {
    }

    currentUser(): Observable<firebase.User> {

        return this.af.authState;
    }

    refreshToken(): Observable<string> {
        const user = this.af.authState.pipe(map(u => {
            const token = u.getIdToken(true);
            return token;
        }));
        return this.fromFirebaseAuthPromise(user);
    }

    // cachedToken: string;

    signIn(user: User, rememberMe: boolean = false): Observable<any> {
        const persistenceSetting = rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE;
        return this.fromFirebaseAuthPromise(this.af.auth.setPersistence(persistenceSetting).then(() => {
            return this.af.auth.signInWithEmailAndPassword(user.email, user.password).then((cred) => cred.user);
        }));
        // return this.fromFirebaseAuthPromise(
        //   this.af.auth.signInWithEmailAndPassword(user.email, user.password)
        // );
    }

    setPersistence() {
        this.af.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            // console.log('set persistence ok');
        });
    }

    reLogin(): Observable<any> {
        return this.af.user;
    }

    setDisplayName(name: string) {
        const user = this.af.auth.currentUser;

        user.updateProfile({
            displayName: name,
            photoURL: ""
        }).then(function () {
            console.log("SUCCESS");
        }).catch(function (error) {
            console.log("erro", error);
        });
    }


    // getToken(): string {
    //     return localStorage.getItem('token');
    // }

    signOut() {
        localStorage.clear();
        return this.fromFirebaseAuthPromise(
            this.af.auth.signOut()
        );
    }

    changeAccount(name: string): Observable<any> {
        return this.fromFirebaseAuthPromise(this.af.auth.currentUser.updateProfile({
            displayName: name
        }));
        // ;
        // console.log("in auth service about to change name", name);
        // return of({});
    }

    checkClaim(user: firebase.User): Observable<UserClaim> {
        if (!user) {
            return of();
        }
        // console.log("user is", user);
        if ((<any>user).user) {
            user = (<any>user).user;
        }

        // console.log("user is", user);
        return this.fromFirebaseAuthPromise(user.getIdTokenResult())
            .pipe(
                map((idTokenResult: firebase.auth.IdTokenResult) => {
                    return {
                        user: user,
                        isAdmin: !!idTokenResult.claims.admin,
                        isAdvanced: !!idTokenResult.claims.advanced,
                        isDistributor: !!idTokenResult.claims.distributor,
                        expirationDate: Number.parseInt(idTokenResult.claims.expirationDate, 10),
                    };
                })
            );
    }

    signInWithGoogle(): Observable<any> {
        return this.fromFirebaseAuthPromise(
            this.af.auth.signInWithPopup(new auth.GoogleAuthProvider())
        );
    }

//   signUp(user: User): Observable<FirebaseAuthState> {
//     return this.fromFirebaseAuthPromise(
//         this.af.auth.createUser({ ...user })
//     );
//   }

    private fromFirebaseAuthPromise(promise): Observable<any> {
        return from(<Promise<any>>promise);
    }
}
