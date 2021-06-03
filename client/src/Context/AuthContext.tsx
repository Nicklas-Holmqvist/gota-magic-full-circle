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
  user: any;
  fetchAuth: (data:{}) => void;
  logOut: () => void;
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<{}>();

  const fetchAuth = (data:{}) => {    
    setUser(data)
  }

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

  useEffect(() => {
    
      fetch("/auth", { method: 'GET'})
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
          console.log({userendpoint:user})
        })
        .catch(function (err) {
          console.error(err);
        });

  }, [setUser])

  return (
    <AuthContext.Provider
      value={{ user, logOut, fetchAuth }}
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
