
"import { motion } from \"framer-motion\";
import { Link } from \"react-router-dom\";
import { useEffect, useState } from \"react\";
import { api } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { Button } from \"@/components/ui/button\";
import { ArrowRight, MessageCircle, Trophy, BookOpen } from \"lucide-react\";

const HERO_TEXTURE =
    \"https://images.unsplash.com/photo-1572915105668-d5b742cb5efd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBhcmNoaXRlY3R1cmUlMjBhYnN0cmFjdCUyMHBhdHRlcm58ZW58MHx8fHwxNzgyOTI2NDQwfDA&ixlib=rb-4.1.0&q=85\";
const HERO_LEARNER = \"https://images.pexels.com/photos/5908493/pexels-photo-5908493.jpeg\";

export default function Landing() {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        api.get(\"/languages\").then((r) => setLanguages(r.data)).catch(() => {});
    }, []);

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
    const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: \"easeOut\" } } };

    return (
        <div className=\"min-h-screen bg-cotton\">
            <Navbar />

            {/* HERO */}
            <section className=\"relative overflow-hidden\" data-testid=\"hero-section\">
                <div
                    className=\"pointer-events-none absolute inset-0 opacity-[0.08]\"
                    style={{
                        backgroundImage: `url(${HERO_TEXTURE})`,
                        backgroundSize: \"cover\",
                        backgroundPosition: \"center\",
                        mixBlendMode: \"multiply\",
                    }}
                />
                <div className=\"relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-12\">
                    <motion.div
                        className=\"lg:col-span-7\"
                        variants={container}
                        initial=\"hidden\"
                        animate=\"show\"
                    >
                        <motion.p variants={item} className=\"mb-6 text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">
                            Learn India — one script at a time
                        </motion.p>
                        <motion.h1
                            variants={item}
                            className=\"font-serif-display text-5xl leading-[1.02] tracking-tighter text-indigoDeep sm:text-6xl lg:text-7xl\"
                        >
                            Speak the languages
                            <br />
                            <em className=\"text-terracotta\">that speak</em> to you.
                        </motion.h1>
                        <motion.p variants={item} className=\"mt-6 max-w-xl text-lg leading-relaxed text-textMuted\">
                            Live conversations with an AI guru, bite-sized lessons in five living scripts, and streaks
                            that feel more like ritual than routine.
                        </motion.p>
                        <motion.div variants={item} className=\"mt-10 flex flex-wrap items-center gap-4\">
                            <Link to=\"/register\" data-testid=\"hero-cta-register\">
                                <Button className=\"rounded-full bg-terracotta px-8 py-6 text-base font-medium text-cotton hover:bg-terracottaHover\">
                                    Start learning free <ArrowRight className=\"ml-2 h-4 w-4\" />
                                </Button>
                            </Link>
                            <Link to=\"/languages\" data-testid=\"hero-cta-explore\">
                                <Button variant=\"outline\" className=\"rounded-full border-indigoDeep px-8 py-6 text-base font-medium text-indigoDeep hover:bg-indigoDeep hover:text-cotton\">
                                    Browse languages
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={item} className=\"mt-14 flex flex-wrap gap-8 text-sm text-textMuted\">
                            <span>5 languages</span>
                            <span className=\"text-borderWarm\">•</span>
                            <span>Real-time AI tutor</span>
                            <span className=\"text-borderWarm\">•</span>
                            <span>Native scripts</span>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className=\"relative lg:col-span-5\"
                    >
                        <div className=\"relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] shadow-[0_30px_80px_rgba(211,84,0,0.15)]\">
                            <img src={HERO_LEARNER} alt=\"Learning\" className=\"h-full w-full object-cover\" />
                        </div>
                        <div className=\"glass absolute -bottom-6 -left-6 max-w-[240px] rounded-3xl p-5\" data-testid=\"hero-floating-card\">
                            <p className=\"text-xs uppercase tracking-widest text-terracotta\">Live tutor</p>
                            <p className=\"mt-1 font-native text-2xl text-indigoDeep\">नमस्ते 👋</p>
                            <p className=\"mt-1 text-sm text-textMuted\">Ask me anything — I reply in real time.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* LANGUAGES PREVIEW */}
            <section className=\"mx-auto max-w-7xl px-6 py-20 sm:px-10\" data-testid=\"languages-preview\">
                <div className=\"mb-12 flex items-end justify-between\">
                    <div>
                        <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Choose your path</p>
                        <h2 className=\"mt-3 font-serif-display text-4xl text-indigoDeep sm:text-5xl\">Five voices. One journey.</h2>
                    </div>
                    <Link to=\"/languages\" className=\"hidden text-sm text-indigoDeep underline underline-offset-4 md:inline\">
                        View all
                    </Link>
                </div>

                <div className=\"grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5\">
                    {languages.map((lang, i) => (
                        <motion.div
                            key={lang.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                        >
                            <Link
                                to={`/language/${lang.id}`}
                                className=\"group relative block overflow-hidden rounded-3xl border border-borderWarm bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(211,84,0,0.1)]\"
                                data-testid={`lang-preview-${lang.id}`}
                            >
                                <div className=\"flex flex-col justify-between h-40\">
                                    <div>
                                        <p className=\"text-xs uppercase tracking-widest text-textMuted\">{lang.script}</p>
                                        <p className=\"mt-2 font-serif-display text-3xl text-indigoDeep\">{lang.name}</p>
                                    </div>
                                    <div className=\"font-native text-4xl transition-all duration-500 group-hover:text-terracotta\" style={{ color: lang.accent }}>
                                        {lang.native_name}
                                    </div>
                                </div>
                                <p className=\"mt-3 text-xs text-textMuted\">{lang.speakers} speakers</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className=\"border-t border-borderWarm/60 bg-surface/60 py-20\" data-testid=\"features-section\">
                <div className=\"mx-auto max-w-7xl px-6 sm:px-10\">
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Why Bhashify</p>
                    <h2 className=\"mt-3 max-w-2xl font-serif-display text-4xl text-indigoDeep sm:text-5xl\">
                        Not another flashcard app. A <em>real</em> conversation.
                    </h2>

                    <div className=\"mt-12 grid grid-cols-1 gap-6 md:grid-cols-3\">
                        {[
                            {
                                icon: <MessageCircle className=\"h-6 w-6\" />,
                                title: \"Real-time AI tutor\",
                                body: \"Chat live with Guru — a Gemini-powered tutor that corrects, encourages, and never sleeps.\",
                            },
                            {
                                icon: <BookOpen className=\"h-6 w-6\" />,
                                title: \"Native script first\",
                                body: \"Learn Devanagari, Tamil, Telugu, Bengali as they are — with tasteful transliteration on demand.\",
                            },
                            {
                                icon: <Trophy className=\"h-6 w-6\" />,
                                title: \"Streaks that feel earned\",
                                body: \"Daily XP, gentle streaks, and quizzes that pull you forward without gamified anxiety.\",
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className=\"glass rounded-3xl p-8\"
                                data-testid={`feature-card-${i}`}
                            >
                                <div className=\"grid h-12 w-12 place-items-center rounded-full bg-terracotta/10 text-terracotta\">
                                    {f.icon}
                                </div>
                                <h3 className=\"mt-6 font-serif-display text-2xl text-indigoDeep\">{f.title}</h3>
                                <p className=\"mt-2 text-sm leading-relaxed text-textMuted\">{f.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className=\"mx-auto max-w-7xl px-6 py-24 sm:px-10\" data-testid=\"cta-section\">
                <div className=\"glass overflow-hidden rounded-[2.5rem] p-12 text-center sm:p-20\">
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Begin today</p>
                    <h2 className=\"mx-auto mt-4 max-w-2xl font-serif-display text-4xl text-indigoDeep sm:text-5xl\">
                        Your first lesson takes seven minutes. Your first sentence, less.
                    </h2>
                    <Link to=\"/register\" className=\"mt-10 inline-block\" data-testid=\"cta-register-button\">
                        <Button className=\"rounded-full bg-terracotta px-10 py-6 text-base text-cotton hover:bg-terracottaHover\">
                            Create free account
                        </Button>
                    </Link>
                </div>
            </section>

            <footer className=\"border-t border-borderWarm/60 py-8 text-center text-xs text-textMuted\">
                Made with warmth. © {new Date().getFullYear()} Bhashify.
            </footer>
        </div>
    );
}
"
