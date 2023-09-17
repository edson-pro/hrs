import {
  getIdToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

export class AuthServices {
  signIn = ({ email, password }: any) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

  getToken = () => {
    return getIdToken(auth.currentUser)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };


  logout = () => {
    return signOut(auth)
      .then((e) => e)
      .catch((error) => {
        throw Error(error.code);
      });
  };

}

const authServices = new AuthServices();

export default authServices