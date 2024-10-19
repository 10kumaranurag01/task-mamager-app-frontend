// src/AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

import { useTasks } from "./TaskContext";

declare global {
  interface Window {
    catalyst: any;
  }
}

interface UserDetails {
  firstName: string;
  lastName: string;
  mailId: string;
  timeZone: string;
  createdTime: string;
}

interface AuthResult {
  content: {
    first_name: string;
    last_name: string;
    email_id: string;
    time_zone: string;
    created_time: string;
  };
}

const AuthContext = createContext({
  isUserAuthenticated: false,
  userDetails: {} as UserDetails,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    mailId: "",
    timeZone: "",
    createdTime: "",
  });
  const { emptyTasks } = useTasks();

  const logout = useCallback(() => {
    const redirectURL = "/";
    emptyTasks();
    window.catalyst.auth.signOut(redirectURL);
  }, [emptyTasks]);

  useEffect(() => {
    window.catalyst.auth
      .isUserAuthenticated()
      .then((result: AuthResult) => {
        let userDetails: UserDetails = {
          firstName: result.content.first_name,
          lastName: result.content.last_name,
          mailId: result.content.email_id,
          timeZone: result.content.time_zone,
          createdTime: result.content.created_time,
        };
        setUserDetails(userDetails);
        setIsUserAuthenticated(true);
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, userDetails, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
