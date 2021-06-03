import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
} from "react";

export const AuthContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  user: any;
  fetchAuth: () => void;
  logOut: () => void;
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState();

  const fetchAuth = async () => {
    await fetch("/auth", { method: 'GET'})
      .then(function (res) {
        if (res.status === 400) {
          return;
        }
        return res.json();
      })
      .then(function (data) {
        const user = data;
        if (user === undefined) {
         return
        }
        setUser(user);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const logOut = async () => {
    fetch("/api/user/logout", { method: "POST" })
    .then((response) => {
      if (response.ok) {
        setUser(undefined);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    
  }

  return (
    <AuthContext.Provider
      value={{ user, fetchAuth, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useAuthContext = () => useContext<Context>(AuthContext);

export const useAuth = () => {
  const auth = useAuthContext()
  return auth.user
}
