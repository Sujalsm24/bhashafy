 "import { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { useAuth } from \"@/context/AuthContext\";
import { Flame, Sparkles, BookOpen, Trophy } from \"lucide-react\";

const ACCENT_BANNER =
    \"https://images.unsplash.com/photo-1665441644195-25d7eb2ba212?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjAzMzl8MHwxfHNlYXJjaHwxfHx3YXJtJTIwdGVycmFjb3R0YSUyMGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODI5MjY0Mzl8MA&ixlib=rb-4.1.0&q=85\";

export default function ProgressPage() {
    const { user } = useAuth();
    const [progress, setProgress] = useState(null);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        api.get(\"/progress/me\").then((r) => setProgress(r.data)).catch(() => {});
        api.get(\"/languages\").then((r) => setLanguages(r.data));
    }, []);

    if (!user || !progress) return <div className=\"p-10 text-center\">Loading…</div>;

    return (
        <div className=\"min-h-screen bg-cotton\" data-testid=\"progress-page\">
            <Navbar />
            <div className=\"mx-auto max-w-7xl px-6 py-10 sm:px-10\">
                <div
                    className=\"relative overflow-hidden rounded-[2rem] p-10 sm:p-14\"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(211,84,0,0.75), rgba(26,35,126,0.55)), url(${ACCENT_BANNER})`,
                        backgroundSize: \"cover\",
                        backgroundPosition: \"center\",
                    }}
                    data-testid=\"progress-hero\"
                >
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-cotton/80\">Your journey</p>
                    <h1 className=\"mt-3 font-serif-display text-5xl text-cotton\">Hey, {user.name}.</h1>
                    <p className=\"mt-4 max-w-lg text-cotton/90\">
                        Small steps, said out loud, become a language. Here's how far you've walked.
                    </p>

                    <div className=\"mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3\">
                        <div className=\"glass rounded-2xl p-5\">
                            <div className=\"flex items-center gap-2 text-terracotta\"><Flame className=\"h-4 w-4\" /><span className=\"text-xs uppercase tracking-widest\">Streak</span></div>
                            <p className=\"mt-2 font-serif-display text-4xl text-indigoDeep\" data-testid=\"progress-streak\">{user.streak}</p>
                        </div>
                        <div className=\"glass rounded-2xl p-5\">
                            <div className=\"flex items-center gap-2 text-terracotta\"><Sparkles className=\"h-4 w-4\" /><span className=\"text-xs uppercase tracking-widest\">XP</span></div>
                            <p className=\"mt-2 font-serif-display text-4xl text-indigoDeep\" data-testid=\"progress-xp\">{user.xp}</p>
                        </div>
                        <div className=\"glass rounded-2xl p-5 col-span-2 sm:col-span-1\">
                            <div className=\"flex items-center gap-2 text-terracotta\"><BookOpen className=\"h-4 w-4\" /><span className=\"text-xs uppercase tracking-widest\">Languages</span></div>
                            <p className=\"mt-2 font-serif-display text-4xl text-indigoDeep\" data-testid=\"progress-langs\">{Object.keys(progress.by_language || {}).length}</p>
                        </div>
                    </div>
                </div>

                <h2 className=\"mt-16 font-serif-display text-3xl text-indigoDeep\">By language</h2>
                <div className=\"mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3\">
                    {languages.map((lang) => {
                        const p = progress.by_language[lang.id] || { alphabets: 0, words: 0, phrases: 0 };
                        const q = progress.quiz_by_language[lang.id];
                        return (
                            <Link
                                key={lang.id}
                                to={`/language/${lang.id}`}
                                className=\"rounded-3xl border border-borderWarm bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md\"
                                data-testid={`progress-lang-${lang.id}`}
                            >
                                <div className=\"flex items-center justify-between\">
                                    <span className=\"font-serif-display text-2xl text-indigoDeep\">{lang.name}</span>
                                    <span className=\"font-native text-2xl\" style={{ color: lang.accent }}>{lang.native_name}</span>
                                </div>
                                <div className=\"mt-5 space-y-2 text-sm text-textMuted\">
                                    <div className=\"flex justify-between\"><span>Alphabet lessons</span><span className=\"font-medium text-indigoDeep\">{p.alphabets}</span></div>
                                    <div className=\"flex justify-between\"><span>Word lessons</span><span className=\"font-medium text-indigoDeep\">{p.words}</span></div>
                                    <div className=\"flex justify-between\"><span>Phrase lessons</span><span className=\"font-medium text-indigoDeep\">{p.phrases}</span></div>
                                    <div className=\"flex justify-between border-t border-borderWarm pt-2\">
                                        <span className=\"flex items-center gap-1\"><Trophy className=\"h-3 w-3\" /> Best quiz</span>
                                        <span className=\"font-medium text-indigoDeep\">
                                            {q ? `${q.score} / ${q.total}` : \"—\"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
"
