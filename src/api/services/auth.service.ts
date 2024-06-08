import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  sendPasswordResetEmail as _sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseService } from ".";
import { HandleErrors } from "../decorators";

const firebaseService = new FirebaseService();

@HandleErrors
export class AuthService {
  static instance: AuthService;

  public auth: Auth;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }

    this.auth = getAuth(firebaseService.app);

    AuthService.instance = this;
  }

  async isLoggedIn() {
    await this.auth.authStateReady();
    return !!this.auth.currentUser;
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logIn(email: string, password: string) {
    console.log(email, password);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return signOut(this.auth);
  }

  sendPasswordResetEmail(email: string) {
    return _sendPasswordResetEmail(this.auth, email);
  }
}
