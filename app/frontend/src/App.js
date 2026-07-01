"import \"@/App.css\";
import { BrowserRouter, Routes, Route, Navigate } from \"react-router-dom\";
import { AuthProvider, useAuth } from \"@/context/AuthContext\";
import { Toaster } from \"sonner\";

import Landing from \"@/pages/Landing\";
import Login from \"@/pages/Login\";
import Register from \"@/pages/Register\";
import LanguageList from \"@/pages/LanguageList\";
import LanguageDetail from \"@/pages/LanguageDetail\";
import LessonViewer from \"@/pages/LessonViewer\";
import Quiz from \"@/pages/Quiz\";
import ChatTutor from \"@/pages/ChatTutor\";
import ProgressPage from \"@/pages/ProgressPage\";

function Protected({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div className=\"p-10 text-center\">Loading…</div>;
    if (!user) return <Navigate to=\"/login\" replace />;
    return children;
}

function App() {
    return (
        <div className=\"App\">
            <AuthProvider>
                <BrowserRouter>
                    <Toaster position=\"top-right\" richColors />
                    <Routes>
                        <Route path=\"/\" element={<Landing />} />
                        <Route path=\"/login\" element={<Login />} />
                        <Route path=\"/register\" element={<Register />} />
                        <Route path=\"/languages\" element={<LanguageList />} />
                        <Route path=\"/language/:langId\" element={<LanguageDetail />} />
                        <Route path=\"/lesson/:langId/:type\" element={<LessonViewer />} />
                        <Route path=\"/quiz/:langId\" element={<Quiz />} />
                        <Route
                            path=\"/chat/:langId\"
                            element={
                                <Protected>
                                    <ChatTutor />
                                </Protected>
                            }
                        />
                        <Route
                            path=\"/progress\"
                            element={
                                <Protected>
                                    <ProgressPage />
                                </Protected>
                            }
                        />
                        <Route path=\"*\" element={<Navigate to=\"/\" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
"
