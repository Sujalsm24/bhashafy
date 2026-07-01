"import { useEffect, useRef, useState } from \"react\";
import { useParams, Link } from \"react-router-dom\";
import { api, API } from \"@/lib/api\";
import Navbar from \"@/components/Navbar\";
import { Button } from \"@/components/ui/button\";
import { Input } from \"@/components/ui/input\";
import { Send, Bot } from \"lucide-react\";
import { motion } from \"framer-motion\";

export default function ChatTutor() {
    const { langId } = useParams();
    const [lang, setLang] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState(\"\");
    const [streaming, setStreaming] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        api.get(`/languages/${langId}`).then((r) => setLang(r.data));
        api.get(`/chat/history?language=${langId}`).then((r) => {
            setMessages(r.data.messages || []);
        }).catch(() => {});
    }, [langId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: \"smooth\" });
    }, [messages, streaming]);

    const send = async () => {
        const text = input.trim();
        if (!text || streaming) return;
        setInput(\"\");
        setMessages((m) => [...m, { role: \"user\", content: text }]);
        setStreaming(true);

        // Add placeholder assistant message
        setMessages((m) => [...m, { role: \"assistant\", content: \"\" }]);

        try {
            const token = localStorage.getItem(\"token\");
            const response = await fetch(`${API}/chat/stream`, {
                method: \"POST\",
                credentials: \"include\",
                headers: {
                    \"Content-Type\": \"application/json\",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ language: langId, message: text }),
            });

            if (!response.ok || !response.body) {
                throw new Error(\"Chat request failed\");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = \"\";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                // Parse SSE — split by \n\n
                const parts = buffer.split(\"\n\n\");
                buffer = parts.pop() || \"\";
                for (const part of parts) {
                    const line = part.trim();
                    if (!line.startsWith(\"data:\")) continue;
                    const payload = line.slice(5).trimStart();
                    if (payload === \"[DONE]\") continue;
                    if (payload.startsWith(\"[error]\")) {
                        setMessages((m) => {
                            const arr = [...m];
                            arr[arr.length - 1] = { role: \"assistant\", content: \"Sorry, I hit a snag. Please try again.\" };
                            return arr;
                        });
                        continue;
                    }
                    setMessages((m) => {
                        const arr = [...m];
                        arr[arr.length - 1] = {
                            role: \"assistant\",
                            content: (arr[arr.length - 1].content || \"\") + payload,
                        };
                        return arr;
                    });
                }
            }
        } catch (e) {
            setMessages((m) => {
                const arr = [...m];
                arr[arr.length - 1] = { role: \"assistant\", content: \"Sorry, something went wrong. Please try again.\" };
                return arr;
            });
        } finally {
            setStreaming(false);
        }
    };

    if (!lang) return <div className=\"p-10 text-center\">Loading…</div>;

    const suggestions = [
        `Teach me how to greet in ${lang.meta.name}`,
        `Give me 3 basic sentences with translation`,
        `Quiz me on 5 words`,
    ];

    return (
        <div className=\"flex min-h-screen flex-col bg-cotton\" data-testid=\"chat-tutor-page\">
            <Navbar />
            <div className=\"mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6\">
                <div className=\"flex items-center justify-between\">
                    <Link to={`/language/${langId}`} className=\"text-sm text-textMuted underline underline-offset-4\" data-testid=\"chat-back-link\">
                        ← Back to {lang.meta.name}
                    </Link>
                    <div className=\"flex items-center gap-2 text-xs text-textMuted\">
                        <span className=\"h-2 w-2 rounded-full bg-green-500\" /> Guru is live
                    </div>
                </div>

                <div className=\"mt-6\">
                    <p className=\"text-xs font-bold uppercase tracking-[0.25em] text-terracotta\">Live tutor</p>
                    <h1 className=\"mt-2 font-serif-display text-4xl text-indigoDeep\">
                        Chat with Guru — <em>{lang.meta.name}</em>
                    </h1>
                </div>

                <div className=\"mt-6 flex-1 space-y-4 overflow-y-auto rounded-3xl border border-borderWarm bg-surface/50 p-6\" data-testid=\"chat-messages-container\">
                    {messages.length === 0 && !streaming && (
                        <div className=\"py-10 text-center\">
                            <div className=\"mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta/10 text-terracotta\">
                                <Bot className=\"h-6 w-6\" />
                            </div>
                            <p className=\"mt-4 font-serif-display text-2xl text-indigoDeep\">
                                {lang.meta.greeting} <span className=\"text-terracotta\">—</span> ready when you are.
                            </p>
                            <div className=\"mt-6 flex flex-wrap justify-center gap-2\">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(s)}
                                        className=\"rounded-full border border-borderWarm bg-white px-4 py-2 text-sm text-textMuted transition hover:border-indigoDeep hover:text-indigoDeep\"
                                        data-testid={`chat-suggestion-${i}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === \"user\" ? \"justify-end\" : \"justify-start\"}`}
                            data-testid={`chat-message-${m.role}-${i}`}
                        >
                            <div
                                className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-5 py-3 text-sm leading-relaxed
                                    ${m.role === \"user\"
                                        ? \"bg-indigoDeep text-cotton\"
                                        : \"bg-terracotta/10 text-textMain\"
                                    }`}
                            >
                                {m.content || (streaming && i === messages.length - 1 ? \"…\" : \"\")}
                            </div>
                        </motion.div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className=\"mt-4 flex gap-3\">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === \"Enter\" && !e.shiftKey) {
                                e.preventDefault();
                                send();
                            }
                        }}
                        placeholder={`Ask anything in ${lang.meta.name}…`}
                        className=\"h-12 flex-1 rounded-full border-borderWarm bg-white px-5\"
                        data-testid=\"chat-input\"
                    />
                    <Button
                        onClick={send}
                        disabled={streaming || !input.trim()}
                        className=\"h-12 rounded-full bg-terracotta px-6 text-cotton hover:bg-terracottaHover\"
                        data-testid=\"chat-send-button\"
                    >
                        <Send className=\"h-4 w-4\" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
"
