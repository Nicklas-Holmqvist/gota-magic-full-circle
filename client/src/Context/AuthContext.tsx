import React, {
  useState,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
} from "react";

export const AuthContext = createContext<Context>(undefined!);

// Typing for items in ProductProvider
type Context = {
  authAdmin: boolean;
  // getAuth: (auth: boolean) => void;
  // getAuthAdmin: (auth: boolean) => void;
  fetchAuth: () => void;
  logOut: () => void;
  user: any;
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [authAdmin, setAuthAdmin] = useState<boolean>(false);
  // const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState();

  // const getAuth = (auth: boolean) => {
  //   setAuth(auth);
  // };

  // const getAuthAdmin = (auth: boolean) => {
  //   setAuthAdmin(auth);
  // };

  const options = {
    method: "get",
  };

    const fetchAuth = async () => {
      await fetch("/auth", options)
        .then(function (res) {
          if (res.status === 400) {
            return;
          }
          return res.json();
        })
        .then(function (data) {
          const user = data;
          if (user === undefined) {
            setAuthAdmin(false);
            // setAuth(false);
          }
          setAuthAdmin(user.isAdmin);
          setUser(user);
          // setAuth(user.userId);
        })
        .catch(function (err) {
          console.error(err);
        });
    };

    const logOut = async () => {
      fetch("/api/user/logout", { method: "POST" })
      .then((response) => {
        if (response.ok) {
          setAuthAdmin(false);
          setUser(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
    }

    

  //console.log({ ADMINAUTH: authAdmin });

  return (
    <AuthContext.Provider
      value={{ authAdmin, user, fetchAuth, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useAuthContext = () => useContext<Context>(AuthContext);
