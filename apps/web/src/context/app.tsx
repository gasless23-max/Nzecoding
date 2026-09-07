import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AppContextType { isAuthenticated: boolean; user: { id: string; email: string; name: string } | null; login: (email: string, password: string) => Promise<void>; logout: () => void; }
const AppContext = createContext<AppContextType | undefined>(undefined);
export function useApp(): AppContextType { const context = useContext(AppContext); if (!context) throw new Error("useApp must be used within AppProvider"); return context; }
export function AppProvider({ children }: { children: ReactNode }): JSX.Element { const [user, setUser] = useState<AppContextType["user"]>({ id: "dev-user", email: "alex@buildandcode.dev", name: "Alex Chen" }); const value = useMemo(() => ({ isAuthenticated: Boolean(user), user, login: async (email: string) => setUser({ id: "dev-user", email, name: email.split("@")[0] || "Developer" }), logout: () => setUser(null) }), [user]); return <AppContext.Provider value={value}>{children}</AppContext.Provider>; }
