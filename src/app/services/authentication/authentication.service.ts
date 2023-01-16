import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
    private authFirebase: AngularFireAuth,
  ) {
    this.authFirebase.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.authFirebase.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.authFirebase.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        //this.router.navigate(['verify-email']);
      });
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  isEmailVerified(user): boolean {
    console.log('user', user);
    return user.emailVerified !== false ? true : false;
  }

  // Sign-out
  async SignOut() {
    await this.authFirebase.signOut();
    localStorage.clear();

    localStorage.setItem('user', null);
    window.location.reload();
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.authFirebase
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          console.log('User not found')
        } else {
          console.log('error', error);

        }
      });
  }
}
