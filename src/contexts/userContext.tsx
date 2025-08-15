import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/apiUsers";
import { ACCOUNT_STATUS } from "@/constants/accountStatus";


type UserContextType = {
  user: User | string;
  setUser: (user: User | string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UseUser must be used within UserProvider");
  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | string>(ACCOUNT_STATUS.UNAUTHORIZED);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UseUser };
