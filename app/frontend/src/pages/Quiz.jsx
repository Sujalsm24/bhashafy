"import { useEffect, useState } from \"react\";
import { useParams, Link, useNavigate } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { Button } from \"@/components/ui/button\";
import { motion, AnimatePresence } from \"framer-motion\";
import { toast } from \"sonner\";
import { useAuth } from \"@/context/AuthContext\";
import { CheckCircle2, XCircle, Trophy } from \"lucide-react\";

export default function Quiz() {
    const { langId } = useParams();
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        api.get(`/languages/${langId}/quiz`).then((r) => setQuiz(r.data));
    }, [langId]);

    if (!quiz) return <div className=\"p-10 text-center\">Loading quiz…</div>;
    if (!quiz.questions.length) return <div className=\"p-10 text-center\">No quiz available.</div>;

    const q = quiz.questions[idx];
    const progress = ((idx + 1) / quiz.questions.length) * 100;

    const choose = (i) => {
        if (showResult) return;
        setSelected(i);
        setShowResult(true);
        if (i === q.answer_index) setScore((s) => s + 1);
    };

    const submitFinal = async (finalScore) => {
        if (!user) return;
        try {
            const { data } = await api.post(\"/progress/quiz\", {
                language: langId,
                score: finalScore,
                total: quiz.questions.length,
            });
            setUser({ ...user, xp: data.xp });
            toast.success(`+${data.xp_gained} XP!`);
        } catch {}
    };

    const next = () => {
        if (idx === quiz.questions.length - 1) {
            const final = score;
            setFinished(true);
            submitFinal(final);
        } else {
            setIdx(idx + 1);
            setSelected(null);
            setShowResult(false);
        }
    };

    if (finished) {
        const pct = Math.round((score / quiz.questions.length) * 100);
        return (
            <div className=\"min-h-screen bg-cotton\" data-testid=\"quiz-result\">
                <Navbar />
                <div className=\"mx-auto max-w-2xl px-6 py-20 text-center\">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <Trophy className=\"mx-auto h-20 w-20 text-terracotta\" />
                        <p className=\"mt-6 text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Well done</p>
                        <h1 className=\"mt-3 font-serif-display text-5xl text-indigoDeep\">
                            You scored {score} / {quiz.questions.length}
                        </h1>
                        <p className=\"mt-4 text-lg text-textMuted\">{pct}% — {pct >= 80 ? \"Beautifully done.\" : pct >= 50 ? \"Solid start. Try again?\" : \"Practice a little more, then retake.\"}</p>
                        <div className=\"mt-10 flex justify-center gap-4\">
                            <Button onClick={() => navigate(`/language/${langId}`)} variant=\"outline\" className=\"rounded-full border-indigoDeep text-indigoDeep\" data-testid=\"quiz-back-btn\">
                                Back to {quiz.language.name}
                            </Button>
                            <Button onClick={() => window.location.reload()} className=\"rounded-full bg-terracotta text-cotton hover:bg-terracottaHover\" data-testid=\"quiz-retry-btn\">
                                Try again
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className=\"min-h-screen bg-cotton\" data-testid=\"quiz-page\">
            <Navbar />
            <div className=\"mx-auto max-w-2xl px-6 py-12\">
                <Link to={`/language/${langId}`} className=\"text-sm text-textMuted underline underline-offset-4\">
                    ← Back
                </Link>

                <div className=\"mt-6 flex items-center justify-between\">
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">
                        {quiz.language.name} quiz
                    </p>
                    <span className=\"text-sm text-textMuted\" data-testid=\"quiz-progress-text\">
                        {idx + 1} / {quiz.questions.length}
                    </span>
                </div>

                <div className=\"mt-3 h-1.5 w-full overflow-hidden rounded-full bg-borderWarm\">
                    <div className=\"h-full bg-terracotta transition-all duration-500\" style={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence mode=\"wait\">
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className=\"mt-10 rounded-3xl border border-borderWarm bg-surface p-8 sm:p-10\"
                        data-testid=\"quiz-question-card\"
                    >
                        <h2 className=\"font-serif-display text-3xl leading-tight text-indigoDeep\">{q.question}</h2>
                        <div className=\"mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2\">
                            {q.options.map((opt, i) => {
                                const isCorrect = showResult && i === q.answer_index;
                                const isWrong = showResult && selected === i && i !== q.answer_index;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => choose(i)}
                                        disabled={showResult}
                                        className={`group relative flex items-center justify-between rounded-2xl border p-5 text-left transition-all
                                            ${isCorrect ? \"border-green-600 bg-green-50\" : \"\"}
                                            ${isWrong ? \"border-terracotta bg-terracotta/10\" : \"\"}
                                            ${!showResult ? \"border-borderWarm bg-white hover:-translate-y-0.5 hover:border-indigoDeep\" : \"\"}
                                        `}
                                        data-testid={`quiz-option-${i}`}
                                    >
                                        <span className=\"font-native text-lg text-indigoDeep\">{opt}</span>
                                        {isCorrect && <CheckCircle2 className=\"h-5 w-5 text-green-700\" />}
                                        {isWrong && <XCircle className=\"h-5 w-5 text-terracotta\" />}
                                    </button>
                                );
                            })}
                        </div>

                        {showResult && (
                            <div className=\"mt-6 rounded-2xl bg-cotton p-4 text-sm text-textMuted\" data-testid=\"quiz-explanation\">
                                {q.explanation}
                            </div>
                        )}

                        {showResult && (
                            <Button
                                onClick={next}
                                className=\"mt-6 w-full rounded-full bg-terracotta text-cotton hover:bg-terracottaHover\"
                                data-testid=\"quiz-next-btn\"
                            >
                                {idx === quiz.questions.length - 1 ? \"See results\" : \"Next question\"}
                            </Button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
"
