import React, { createContext, useContext, ReactNode } from "react";
import { create } from "zustand";

interface AppContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state] = React.useState<AppContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => {
      // Placeholder
    },
    logout: () => {
      // Placeholder
    },
  });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
