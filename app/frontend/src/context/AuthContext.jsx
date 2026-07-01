 "import { createContext, useContext, useEffect, useState, useCallback } from \"react\";
import { api, formatApiError } from \"@/lib/api\";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            const { data } = await api.get(\"/auth/me\");
            setUser(data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const login = async (email, password) => {
        try {
            const { data } = await api.post(\"/auth/login\", { email, password });
            if (data.token) localStorage.setItem(\"token\", data.token);
            setUser(data.user);
            return { ok: true };
        } catch (e) {
            return { ok: false, error: formatApiError(e) };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post(\"/auth/register\", { name, email, password });
            if (data.token) localStorage.setItem(\"token\", data.token);
            setUser(data.user);
            return { ok: true };
        } catch (e) {
            return { ok: false, error: formatApiError(e) };
        }
    };

    const logout = async () => {
       Backend works well. Let me fix the lint issues in my files:
 "        try {
            await api.post(\"/auth/logout\");
        } catch {}
        localStorage.removeItem(\"token\");" --new-str "        try {
            await api.post(\"/auth/logout\");
        } catch {
            // ignore logout errors
        }
        localStorage.removeItem(\"token\");"

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
"
