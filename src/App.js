import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Check existing login status when the app loads
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // Listen for auth changes (sign in, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show a blank loader while checking if user is already logged in
  if (initializing) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#fac700] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {session ? (
        // User is authenticated -> show dashboard
        <AdminDashboard session={session} />
      ) : (
        // No user authenticated -> show login page
        <Login onLoginSuccess={(activeSession) => setSession(activeSession)} />
      )}
    </div>
  );
}
