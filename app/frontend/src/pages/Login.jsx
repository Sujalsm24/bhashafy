 "import { useState } from \"react\";
import { useNavigate, Link } from \"react-router-dom\";
import { useAuth } from \"@/context/AuthContext\";
import { Button } from \"@/components/ui/button\";
import { Input } from \"@/components/ui/input\";
import { Label } from \"@/components/ui/label\";
import { toast } from \"sonner\";
import Navbar from \"@/components/Navbar\";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState(\"\");
    const [password, setPassword] = useState(\"\");
    const [error, setError] = useState(\"\");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError(\"\");
        setLoading(true);
        const r = await login(email, password);
        setLoading(false);
        if (r.ok) {
            toast.success(\"Welcome back!\");
            navigate(\"/languages\");
        } else {
            setError(r.error);
        }
    };

    return (
        <div className=\"min-h-screen bg-cotton\">
            <Navbar />
            <div className=\"mx-auto flex max-w-md flex-col justify-center px-6 py-20\">
                <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Welcome back</p>
                <h1 className=\"mt-3 font-serif-display text-4xl text-indigoDeep\">Sign in to keep the streak.</h1>

                <form onSubmit={submit} className=\"mt-10 space-y-5\" data-testid=\"login-form\">
                    <div>
                        <Label htmlFor=\"email\">Email</Label>
                        <Input
                            id=\"email\"
                            type=\"email\"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=\"mt-2 h-12 rounded-2xl border-borderWarm bg-white\"
                            data-testid=\"login-email-input\"
                        />
                    </div>
                    <div>
                        <Label htmlFor=\"password\">Password</Label>
                        <Input
                            id=\"password\"
                            type=\"password\"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=\"mt-2 h-12 rounded-2xl border-borderWarm bg-white\"
                            data-testid=\"login-password-input\"
                        />
                    </div>
                    {error && (
                        <div className=\"rounded-2xl bg-terracotta/10 px-4 py-3 text-sm text-terracottaHover\" data-testid=\"login-error\">
                            {error}
                        </div>
                    )}
                    <Button
                        type=\"submit\"
                        disabled={loading}
                        className=\"h-12 w-full rounded-full bg-terracotta text-cotton hover:bg-terracottaHover\"
                        data-testid=\"login-submit-button\"
                    >
                        {loading ? \"Signing in...\" : \"Sign in\"}
                    </Button>
                </form>

                <p className=\"mt-8 text-center text-sm text-textMuted\">
                    New here?{\" \"}
                    <Link to=\"/register\" className=\"text-indigoDeep underline underline-offset-4\" data-testid=\"login-to-register-link\">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
"
