"import { useEffect, useState } from \"react\";
import { useParams, useNavigate, Link } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { Button } from \"@/components/ui/button\";
import { toast } from \"sonner\";
import { ArrowRight, ArrowLeft, Volume2, Eye, EyeOff } from \"lucide-react\";
import { motion, AnimatePresence } from \"framer-motion\";
import { useAuth } from \"@/context/AuthContext\";

export default function LessonViewer() {
    const { langId, type } = useParams();
    const { setUser, user } = useAuth();
    const [lang, setLang] = useState(null);
    const [idx, setIdx] = useState(0);
    const [showTranslit, setShowTranslit] = useState(true);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/languages/${langId}`).then((r) => setLang(r.data));
    }, [langId]);

    if (!lang) return <div className=\"p-10 text-center\">Loading…</div>;

    const items = lang[type] || [];
    if (!items.length) return <div className=\"p-10 text-center\">No content.</div>;

    const item = items[idx];
    const isLast = idx === items.length - 1;
    const progress = ((idx + 1) / items.length) * 100;

    const speak = (text) => {
        try {
            const utter = new SpeechSynthesisUtterance(text);
            const langMap = { hindi: \"hi-IN\", tamil: \"ta-IN\", telugu: \"te-IN\", bengali: \"bn-IN\", marathi: \"mr-IN\" };
            utter.lang = langMap[langId] || \"hi-IN\";
            utter.rate = 0.85;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utter);
        } catch {
            toast.error(\"Speech not supported in this browser.\");
        }
    };

    const completeLesson = async () => {
        if (completed) return;
        setCompleted(true);
        if (user) {
            try {
                const { data } = await api.post(\"/progress/complete\", {
                    language: langId,
                    lesson_type: type,
                    xp_gained: 10,
                });
                setUser({ ...user, xp: data.xp, streak: data.streak });
                toast.success(`+10 XP! Streak: ${data.streak} 🔥`);
            } catch {}
        }
    };

    const next = () => {
        if (isLast) {
            completeLesson();
            navigate(`/language/${langId}`);
        } else {
            setIdx(idx + 1);
        }
    };

    return (
        <div className=\"min-h-screen bg-cotton\" data-testid=\"lesson-viewer\">
            <Navbar />
            <div className=\"mx-auto max-w-3xl px-6 py-12\">
                <Link to={`/language/${langId}`} className=\"text-sm text-textMuted underline underline-offset-4\" data-testid=\"back-to-lang\">
                    ← Back to {lang.meta.name}
                </Link>

                <div className=\"mt-6 flex items-center justify-between\">
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">
                        {lang.meta.name} — {type}
                    </p>
                    <span className=\"text-sm text-textMuted\" data-testid=\"lesson-progress-text\">
                        {idx + 1} / {items.length}
                    </span>
                </div>

                <div className=\"mt-3 h-1.5 w-full overflow-hidden rounded-full bg-borderWarm\">
                    <div className=\"h-full bg-terracotta transition-all duration-500\" style={{ width: `${progress}%` }} />
                </div>

                <div className=\"mt-16\">
                    <AnimatePresence mode=\"wait\">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className=\"glass rounded-[2rem] p-14 text-center\"
                            data-testid=\"lesson-card\"
                        >
                            <div
                                className=\"font-native text-[110px] leading-none\"
                                style={{ color: lang.meta.accent }}
                                data-testid=\"lesson-native-text\"
                            >
                                {item.char || item.native}
                            </div>
                            {showTranslit && (
                                <p className=\"mt-6 font-serif-display text-3xl text-indigoDeep\" data-testid=\"lesson-translit\">
                                    {item.transliteration}
                                </p>
                            )}
                            <p className=\"mt-3 text-lg text-textMuted\" data-testid=\"lesson-english\">
                                {item.english || item.sound}
                            </p>

                            <div className=\"mt-10 flex justify-center gap-4\">
                                <Button
                                    variant=\"outline\"
                                    onClick={() => speak(item.char || item.native)}
                                    className=\"rounded-full border-indigoDeep text-indigoDeep hover:bg-indigoDeep hover:text-cotton\"
                                    data-testid=\"play-audio-btn\"
                                >
                                    <Volume2 className=\"mr-2 h-4 w-4\" /> Play
                                </Button>
                                <Button
                                    variant=\"ghost\"
                                    onClick={() => setShowTranslit((s) => !s)}
                                    className=\"rounded-full text-textMuted\"
                                    data-testid=\"toggle-translit-btn\"
                                >
                                    {showTranslit ? <EyeOff className=\"mr-2 h-4 w-4\" /> : <Eye className=\"mr-2 h-4 w-4\" />}
                                    Transliteration
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className=\"mt-8 flex items-center justify-between\">
                        <Button
                            variant=\"ghost\"
                            disabled={idx === 0}
                            onClick={() => setIdx((i) => Math.max(0, i - 1))}
                            className=\"rounded-full\"
                            data-testid=\"prev-lesson-btn\"
                        >
                            <ArrowLeft className=\"mr-2 h-4 w-4\" /> Previous
                        </Button>
                        <Button
                            onClick={next}
                            className=\"rounded-full bg-terracotta px-8 text-cotton hover:bg-terracottaHover\"
                            data-testid=\"next-lesson-btn\"
                        >
                            {isLast ? \"Finish (+10 XP)\" : \"Next\"} <ArrowRight className=\"ml-2 h-4 w-4\" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
"
