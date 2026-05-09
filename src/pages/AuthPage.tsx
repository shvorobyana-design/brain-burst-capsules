import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { Brain, Sparkles, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const T = {
  ua: {
    welcome: "Ласкаво просимо до",
    subtitle: "Збережи прогрес, досягнення та продовжуй з будь-якого пристрою",
    signIn: "Увійти", signUp: "Зареєструватися",
    email: "Email", password: "Пароль", name: "Ім'я (як до тебе звертатися)",
    google: "Продовжити з Google", or: "або",
    guest: "Продовжити як гість",
    submitIn: "Увійти", submitUp: "Створити акаунт",
    haveAcc: "Вже є акаунт?", noAcc: "Немає акаунта?",
    successUp: "Акаунт створено! 🎉", successIn: "З поверненням! 👋",
    errInvalid: "Неправильний email або пароль",
    errPasswordMin: "Пароль має містити щонайменше 6 символів",
    errEmail: "Введи коректний email",
    backHome: "На головну",
  },
  en: {
    welcome: "Welcome to",
    subtitle: "Save your progress and achievements across all devices",
    signIn: "Sign in", signUp: "Sign up",
    email: "Email", password: "Password", name: "Your name",
    google: "Continue with Google", or: "or",
    guest: "Continue as guest",
    submitIn: "Sign in", submitUp: "Create account",
    haveAcc: "Already have an account?", noAcc: "No account yet?",
    successUp: "Account created! 🎉", successIn: "Welcome back! 👋",
    errInvalid: "Invalid email or password",
    errPasswordMin: "Password must be at least 6 characters",
    errEmail: "Enter a valid email",
    backHome: "Back home",
  },
};

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
  displayName: z.string().trim().max(60).optional(),
});

export default function AuthPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const nav = useNavigate();
  const { user, signIn, signUp, signInGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav("/", { replace: true }); }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, displayName: name || undefined });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const msg = issue.path[0] === "password" ? t.errPasswordMin
                : issue.path[0] === "email" ? t.errEmail
                : issue.message;
      toast({ title: msg, variant: "destructive" });
      return;
    }
    setBusy(true);
    const res = mode === "signin"
      ? await signIn(email, password)
      : await signUp(email, password, name || undefined);
    setBusy(false);
    if (res.error) {
      toast({ title: res.error.includes("Invalid") ? t.errInvalid : res.error, variant: "destructive" });
      return;
    }
    toast({ title: mode === "signin" ? t.successIn : t.successUp });
    nav("/");
  };

  const google = async () => {
    setBusy(true);
    const res = await signInGoogle();
    setBusy(false);
    if (res.error) toast({ title: res.error, variant: "destructive" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">Brain<span className="gradient-text">Capsule</span></span>
        </Link>

        <div className="bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.welcome} <span className="gradient-text">BrainCapsule</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">{t.subtitle}</p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-muted rounded-xl mb-5">
            {(["signup","signin"] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2 text-sm font-semibold rounded-lg transition-all ${mode === m ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
              >
                {m === "signup" ? t.signUp : t.signIn}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={name} onChange={e => setName(e.target.value)} maxLength={60}
                  placeholder={t.name}
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/40 border border-border focus:border-primary focus:bg-card outline-none transition-colors text-sm"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={255} required
                placeholder={t.email} autoComplete="email"
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/40 border border-border focus:border-primary focus:bg-card outline-none transition-colors text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} maxLength={72} required
                placeholder={t.password} autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted/40 border border-border focus:border-primary focus:bg-card outline-none transition-colors text-sm"
              />
            </div>
            <button
              type="submit" disabled={busy}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                {mode === "signup" ? t.submitUp : t.submitIn}
                <ArrowRight className="w-4 h-4" />
              </>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.or}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button" onClick={google} disabled={busy}
            className="w-full h-11 rounded-xl bg-card border border-border hover:bg-muted/40 transition-colors flex items-center justify-center gap-3 text-sm font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {t.google}
          </button>

          <Link
            to="/" className="mt-3 w-full h-11 rounded-xl border border-dashed border-border hover:bg-muted/30 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Sparkles className="w-4 h-4" />{t.guest}
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {mode === "signup" ? t.haveAcc : t.noAcc}{" "}
          <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="text-primary font-semibold hover:underline">
            {mode === "signup" ? t.signIn : t.signUp}
          </button>
        </p>
      </motion.div>
    </div>
  );
}