 "import { useEffect, useState } from \"react\";
import { useParams, Link } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { Button } from \"@/components/ui/button\";
import { BookOpen, MessageCircle, Sparkles, Trophy } from \"lucide-react\";

export default function LanguageDetail() {
    const { langId } = useParams();
    const [lang, setLang] = useState(null);

    useEffect(() => {
        api.get(`/languages/${langId}`).then((r) => setLang(r.data)).catch(() => setLang(false));
    }, [langId]);

    if (lang === false) return <div className=\"p-10 text-center\">Language not found.</div>;
    if (!lang) return <div className=\"p-10 text-center\">Loading…</div>;

    const cards = [
        { key: \"alphabets\", label: \"Alphabets\", to: `/lesson/${langId}/alphabets`, icon: <BookOpen className=\"h-5 w-5\" />, count: lang.alphabets.length },
        { key: \"words\", label: \"Words\", to: `/lesson/${langId}/words`, icon: <Sparkles className=\"h-5 w-5\" />, count: lang.words.length },
        { key: \"phrases\", label: \"Phrases\", to: `/lesson/${langId}/phrases`, icon: <MessageCircle className=\"h-5 w-5\" />, count: lang.phrases.length },
        { key: \"quiz\", label: \"Quiz\", to: `/quiz/${langId}`, icon: <Trophy className=\"h-5 w-5\" />, count: lang.quiz.length },
    ];

    return (
        <div className=\"min-h-screen bg-cotton\" data-testid=\"language-detail-page\">
            <Navbar />
            <div className=\"mx-auto max-w-7xl px-6 py-16 sm:px-10\">
                <Link to=\"/languages\" className=\"text-sm text-textMuted underline underline-offset-4\" data-testid=\"back-to-languages\">
                    ← All languages
                </Link>
                <div className=\"mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2\">
                    <div>
                        <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">{lang.meta.script} script</p>
                        <h1 className=\"mt-3 font-serif-display text-6xl text-indigoDeep\">{lang.meta.name}</h1>
                        <div className=\"mt-4 font-native text-6xl\" style={{ color: lang.meta.accent }}>
                            {lang.meta.native_name}
                        </div>
                        <p className=\"mt-6 max-w-md text-textMuted\">
                            Spoken by {lang.meta.speakers} people. Start with the alphabet, work through everyday
                            words and phrases, then test yourself. Practice live in the chat any time.
                        </p>
                        <Link to={`/chat/${langId}`} data-testid=\"open-chat-tutor\">
                            <Button className=\"mt-8 rounded-full bg-indigoDeep px-8 py-6 text-cotton hover:bg-indigoDeep/90\">
                                <MessageCircle className=\"mr-2 h-4 w-4\" /> Talk to Guru now
                            </Button>
                        </Link>
                    </div>

                    <div className=\"grid grid-cols-1 gap-4 sm:grid-cols-2\">
                        {cards.map((c) => (
                            <Link
                                key={c.key}
                                to={c.to}
                                className=\"group rounded-3xl border border-borderWarm bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(211,84,0,0.1)]\"
                                data-testid={`section-card-${c.key}`}
                            >
                                <div className=\"flex items-center justify-between\">
                                    <div className=\"grid h-11 w-11 place-items-center rounded-full bg-terracotta/10 text-terracotta\">
                                        {c.icon}
                                    </div>
                                    <span className=\"text-xs uppercase tracking-widest text-textMuted\">{c.count} items</span>
                                </div>
                                <h3 className=\"mt-6 font-serif-display text-2xl text-indigoDeep\">{c.label}</h3>
                                <p className=\"mt-1 text-sm text-textMuted\">
                                    {c.key === \"quiz\" ? \"Test your recall\" : `Learn the ${c.label.toLowerCase()}`}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
"
