import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data?.session) {
        onLoginSuccess(data.session);
      }
    } catch (error) {
      setErrorMsg(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
      <div className="bg-[#111] border border-white/20 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        {/* Header - Replaced Lock Icon Container with your Shop Logo */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img
              src="/logo_uts.png"
              alt="UTS Studio Logo"
              className="w-20 h-20 object-contain rounded-full border-2 border-[#fac700]/20 p-1 bg-black/40 shadow-lg"
              onError={(e) => {
                // Fallback style tweak if the image fails to resolve path configurations
                e.target.style.display = "none";
              }}
            />
          </div>
          <h2 className="text-[#fac700] text-2xl font-black uppercase italic tracking-tighter">
            Studio Management
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">
            Restricted Admin Access
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-900/40 border border-red-500/40 text-red-200 text-xs font-bold p-4 rounded-2xl mb-4 text-center uppercase tracking-tight">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-white/40 ml-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-white/40" size={18} />
              <input
                type="email"
                required
                placeholder="admin@studio.com"
                className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#fac700] transition-colors text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-white/40 ml-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-white/40" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#fac700] transition-colors text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fac700] text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest mt-6 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
