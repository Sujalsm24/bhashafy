 "import { Link, useNavigate } from \"react-router-dom\";
import { useAuth } from \"@/context/AuthContext\";
import { Button } from \"@/components/ui/button\";
import { Flame, Sparkles } from \"lucide-react\";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header
            className=\"sticky top-0 z-40 w-full border-b border-borderWarm/60 bg-cotton/70 backdrop-blur-xl\"
            data-testid=\"app-navbar\"
        >
            <div className=\"mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10\">
                <Link to=\"/\" className=\"flex items-center gap-2\" data-testid=\"nav-logo-link\">
                    <span className=\"grid h-9 w-9 place-items-center rounded-full bg-terracotta text-cotton font-serif text-xl\">
                        ब
                    </span>
                    <span className=\"font-serif-display text-2xl text-indigoDeep\">Bhashify</span>
                </Link>

                <nav className=\"hidden items-center gap-8 md:flex\">
                    <Link to=\"/languages\" className=\"text-sm text-textMuted hover:text-indigoDeep transition-colors\" data-testid=\"nav-languages-link\">
                        Languages
                    </Link>
                    {user && (
                        <Link to=\"/progress\" className=\"text-sm text-textMuted hover:text-indigoDeep transition-colors\" data-testid=\"nav-progress-link\">
                            Progress
                        </Link>
                    )}
                </nav>

                <div className=\"flex items-center gap-3\">
                    {user ? (
                        <>
                            <div className=\"hidden items-center gap-3 sm:flex\" data-testid=\"user-stats\">
                                <span className=\"flex items-center gap-1 text-sm text-terracotta font-medium\" data-testid=\"streak-badge\">
                                    <Flame className=\"h-4 w-4\" /> {user.streak}
                                </span>
                                <span className=\"flex items-center gap-1 text-sm text-indigoDeep font-medium\" data-testid=\"xp-badge\">
                                    <Sparkles className=\"h-4 w-4\" /> {user.xp} XP
                                </span>
                            </div>
                            <Button
                                variant=\"outline\"
                                className=\"rounded-full border-indigoDeep text-indigoDeep hover:bg-indigoDeep hover:text-cotton\"
                                onClick={async () => {
                                    await logout();
                                    navigate(\"/\");
                                }}
                                data-testid=\"logout-button\"
                            >
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to=\"/login\" data-testid=\"nav-login-link\">
                                <Button variant=\"ghost\" className=\"rounded-full text-indigoDeep\">
                                    Log in
                                </Button>
                            </Link>
                            <Link to=\"/register\" data-testid=\"nav-register-link\">
                                <Button className=\"rounded-full bg-terracotta text-cotton hover:bg-terracottaHover px-6\">
                                    Start free
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
"
