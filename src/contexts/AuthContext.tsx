import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useLanguage } from "./LanguageContext";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  language: "ua" | "en";
  xp: number;
}

interface AuthCtx {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<Pick<Profile, "display_name" | "avatar_url" | "language" | "xp">>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { setLang } = useLanguage();

  const loadProfile = useCallback(async (uid: string) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (data) {
      setProfile(data as Profile);
      if (data.language === "ua" || data.language === "en") setLang(data.language);
    }
  }, [setLang]);

  useEffect(() => {
    // 1. Set up listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // defer to avoid deadlock
        setTimeout(() => loadProfile(sess.user.id), 0);
      } else {
        setProfile(null);
      }
    });
    // 2. Then check existing session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) loadProfile(s.user.id);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const signUp: AuthCtx["signUp"] = async (email, password, displayName) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: displayName ? { display_name: displayName } : undefined,
      },
    });
    return error ? { error: error.message } : {};
  };

  const signIn: AuthCtx["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  };

  const signInGoogle: AuthCtx["signInGoogle"] = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) return { error: result.error instanceof Error ? result.error.message : String(result.error) };
    return {};
  };

  const signOut = async () => { await supabase.auth.signOut(); setProfile(null); };

  const updateProfile: AuthCtx["updateProfile"] = async (patch) => {
    if (!user) return;
    setProfile(prev => prev ? { ...prev, ...patch } as Profile : prev);
    await supabase.from("profiles").update(patch).eq("id", user.id);
  };

  const refreshProfile = async () => { if (user) await loadProfile(user.id); };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signUp, signIn, signInGoogle, signOut, updateProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}