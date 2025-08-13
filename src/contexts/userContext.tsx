import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/apiUsers";


type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const CurrentUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("CurrentUser must be used within UserProvider");
  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, CurrentUser };
