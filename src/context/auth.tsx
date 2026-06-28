"use client";

import type { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSupabase, isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const fetchProfile = useCallback(async (userId: string) => {
    const client = getSupabase();
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    setProfile(data as Profile | null);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    void supabase.auth.getSession().then(async ({ data, error }) => {
      if (!active) return;
      if (error) {
        setLoading(false);
        return;
      }
      setSession(data.session);
      if (data.session?.user) {
        try {
          await fetchProfile(data.session.user.id);
        } catch {
          setProfile(null);
        }
      }
      if (active) setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user) {
        void fetchProfile(nextSession.user.id).catch(() => setProfile(null));
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const client = getSupabase();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (error) throw error;

      if (data.session && data.user) {
        const { error: profileError } = await client.from("profiles").upsert(
          { user_id: data.user.id, full_name: name.trim() },
          { onConflict: "user_id" },
        );
        if (profileError) throw profileError;
        await fetchProfile(data.user.id);
      }

      return !data.session;
    },
    [fetchProfile],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;
    setSession(null);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });
    if (error) throw error;
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<Profile>) => {
      if (!session?.user) throw new Error("Faça login para atualizar o perfil.");
      const { error } = await getSupabase()
        .from("profiles")
        .upsert({ ...data, user_id: session.user.id }, { onConflict: "user_id" });
      if (error) throw error;
      setProfile((current) => (current ? { ...current, ...data } : current));
    },
    [session],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      profile,
      session,
      loading,
      configured: isSupabaseConfigured,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updateProfile,
    }),
    [session, profile, loading, signUp, signIn, signOut, resetPassword, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
