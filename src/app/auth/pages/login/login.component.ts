import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Store} from '@ngrx/store';
import {AuthState} from '../../state/auth.state';
import * as actions from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(

  //   ){}
  constructor(
    public afAuth: AngularFireAuth,   //private router: Router,
    private store: Store<AuthState>
  ) {
  }

  ngOnInit() {
  }

  googleLogin() {
    // this.store.dispatch(
    //   new actions.LoginRequestedAction({user: {email: 't@t.nl', password: 'test123'}})
    // );

    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   this.afAuth.auth
    //   .signInWithPopup(provider)
    //   .then(res => {
    //     console.log("result",res)
    //     console.log("result",res.credential["idToken"])
    //     res.user.getIdToken().then((x)=>{
    //       console.log("id token is", x);
    //     })
    //     resolve(res);
    //   })
    // })
  }

  //
  // facebookLogin() {
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope('user_birthday');
  //
  //   firebase.auth().signInWithPopup(provider).then(function (result) {
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     var token = result.credential['accessToken'];
  //     var user = result.user;
  //     // ...
  //     console.log('user', user);
  //     console.log('user', user['ra']);
  //     console.log('user', result.credential);
  //   }).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.FacebookAuthProvider();
    //   provider.addScope('profile');
    //   this.afAuth.auth
    //   .signInWithPopup(provider)
    //   .then(res => {
    //     console.log("result",res)
    //     console.log("result",res.credential["idToken"])
    //     res.user.getIdToken().then((x)=>{
    //       console.log("fbid token is", x);
    //     })
    //     resolve(res);
    //   })
    // })
  // }
}
