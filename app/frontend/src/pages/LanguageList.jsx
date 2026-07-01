"import { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { motion } from \"framer-motion\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";

export default function LanguageList() {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        api.get(\"/languages\").then((r) => setLanguages(r.data)).catch(() => {});
    }, []);

    return (
        <div className=\"min-h-screen bg-cotton\">
            <Navbar />
            <div className=\"mx-auto max-w-7xl px-6 py-16 sm:px-10\">
                <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Explore</p>
                <h1 className=\"mt-3 font-serif-display text-5xl text-indigoDeep sm:text-6xl\">Pick a language.</h1>
                <p className=\"mt-4 max-w-xl text-textMuted\">
                    Every script here is a doorway. Tap a card to open lessons, quizzes and a live AI tutor.
                </p>

                <div className=\"mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3\" data-testid=\"languages-grid\">
                    {languages.map((lang, i) => (
                        <motion.div
                            key={lang.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <Link
                                to={`/language/${lang.id}`}
                                className=\"group relative block overflow-hidden rounded-3xl border border-borderWarm bg-surface p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(211,84,0,0.1)]\"
                                data-testid={`language-card-${lang.id}`}
                            >
                                <div className=\"flex items-start justify-between\">
                                    <div>
                                        <p className=\"text-xs uppercase tracking-widest text-textMuted\">{lang.script} script</p>
                                        <h3 className=\"mt-2 font-serif-display text-4xl text-indigoDeep\">{lang.name}</h3>
                                    </div>
                                    <span className=\"rounded-full bg-white/60 px-3 py-1 text-xs text-textMuted\">
                                        {lang.speakers}
                                    </span>
                                </div>
                                <div
                                    className=\"mt-10 font-native text-5xl transition-transform duration-500 group-hover:scale-105\"
                                    style={{ color: lang.accent }}
                                >
                                    {lang.native_name}
                                </div>
                                <p className=\"mt-4 text-sm text-textMuted\">
                                    Say hello: <span className=\"font-native text-base\" style={{ color: lang.accent }}>{lang.greeting}</span>
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
"
