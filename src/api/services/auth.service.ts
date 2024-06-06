import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  sendPasswordResetEmail as _sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseService } from ".";
import { FirebaseError } from "firebase/app";

const firebaseService = new FirebaseService();

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

  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      console.log(result);
      console.log(this.auth.currentUser);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error signing up with email and password", error);
        throw new Error(error.message);
      } else {
        console.error("Unknown signing up with email and password", error);
        throw new Error("Unknown error signing up with email and password");
      }
    }
  }

  async logIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      console.log(result);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error logging in with email and password", error);
        throw new Error(error.message);
      } else {
        console.error("Unknown logging in with email and password", error);
        throw new Error("Unknown error logging in with email and password");
      }
    }
  }

  async logOut() {
    try {
      const result = await signOut(this.auth);

      console.log(result);
    } catch (error) {
      console.error("Error signing out with Google", error);
      throw new Error("Error signing out with Google");
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await _sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error("Error signing out with Google", error);
      throw new Error("Error signing out with Google");
    }
  }
}
