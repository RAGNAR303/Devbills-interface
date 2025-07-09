import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthState } from "../types/auth.ts";
import { signInWithPopup, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { fireBaseAuth, googleAuthProvider } from "../config/firebase";

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Authcontext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      fireBaseAuth,
      (user) => {

        if (user) {
          setAuthState({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            error: null,
            loading: false,
          });
        } else {
          setAuthState({
            user: null,
            error: null,
            loading: false,
          });
        }
      },
      (error) => {
        console.error("Erro na autenticação");
        setAuthState({
          user: null,
          error: error.message,
          loading: false,
        });
      },
    );

    return () => unsubscribe();
  }, []);

  const signWithGoogle = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signInWithPopup(fireBaseAuth, googleAuthProvider);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao tentar logar";

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      firebaseSignOut(fireBaseAuth);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao tentar logar";

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  return (
    <Authcontext.Provider value={{ authState, signWithGoogle, signOut }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
