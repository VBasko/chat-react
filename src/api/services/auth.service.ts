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
import store from "src/redux/store";
import { clearUser, setUser } from "src/redux/features/userSlice";

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

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setUser(user));
      } else {
        store.dispatch(clearUser());
      }
    });

    AuthService.instance = this;
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return signOut(this.auth);
  }

  sendPasswordResetEmail(email: string) {
    return _sendPasswordResetEmail(this.auth, email);
  }
}
