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
  auth: boolean;
  getAuth: (auth: boolean) => void;
  getAuthAdmin: (auth: boolean) => void;
  user: any;
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [authAdmin, setAuthAdmin] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState();

  const getAuth = (auth: boolean) => {
    setAuth(auth);
  };

  const getAuthAdmin = (auth: boolean) => {
    setAuthAdmin(auth);
  };

  const options = {
    method: "get",
  };

  useEffect(() => {
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
            setAuth(false);
          }
          setAuthAdmin(user.isAdmin === false ? false : true);
          setUser(user);
          setAuth(user.userId === null || false ? false : true);
        })
        .catch(function (err) {
          console.error(err);
        });
    };

    fetchAuth();
  });

  //console.log({ ADMINAUTH: authAdmin });

  return (
    <AuthContext.Provider
      value={{ auth, getAuth, authAdmin, getAuthAdmin, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hooks

// Using all in ProductContext
export const useAuthContext = () => useContext<Context>(AuthContext);
