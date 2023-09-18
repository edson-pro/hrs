import { onIdTokenChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, firestore } from "../config/firebase";

interface ContextProps {
  loading?: boolean;
  user?: object;
  logout?: () => void;
  reloadAuth?: () => void;
  setLoading?: () => void;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        logout: auth.logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};

export const handleCancelSubscription = ({ userId }: any) => {
  return updateDoc(doc(firestore, "subscriptions", userId), {
    status: "expired",
  });
};

function useProvideAuth() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const setCurrentUser = async (user: any) => {
    if (user) {
      const restrant: any =
        user.email !== "mtnadmin@gmail.com"
          ? await getDocs(
              query(
                collection(firestore, "restorants"),
                where("email", "==", user.email)
              )
            ).then(({ docs }) => {
              if (docs[0]) {
                return { ...docs[0]?.data(), id: docs[0].id };
              }
            })
          : undefined;

      setUser({
        username: user.email.split("@")[0],
        name: restrant?.name,
        restorantId: restrant?.id,
        email: user.email,
        photoURL: user.photoURL,
        id: user.uid,
        role: user.email === "mtnadmin@gmail.com" ? "mtn-admin" : "admin",
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  const reloadAuth = async () => {
    await auth.currentUser.getIdToken(true);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (d) => setCurrentUser(d));
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    setLoading,
    logout,
    reloadAuth,
  };
}
