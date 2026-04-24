'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin/dashboard');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] rounded-full blur-[120px] opacity-20 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/50 rounded-full blur-[120px] opacity-20 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03] bg-repeat"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--color-primary)] to-red-500/50 mb-6 shadow-lg shadow-red-500/20 border border-white/10 ring-4 ring-[var(--color-primary)]/10">
              <ShieldCheck className="w-8 h-8 text-white stroke-[1.5]" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 heading-font uppercase">
              Admin Portal
            </h1>
            <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase">
              Tyreman24
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200 leading-snug">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5 focus-within:text-[var(--color-primary)] text-neutral-500 transition-colors">
              <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-neutral-400 pl-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-inherit transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-neutral-600 outline-none focus:border-[var(--color-primary)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5 focus-within:text-[var(--color-primary)] text-neutral-500 transition-colors">
              <div className="flex items-center justify-between pl-1">
                <label htmlFor="password" className="block text-xs font-bold tracking-widest uppercase text-neutral-400">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-inherit transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-neutral-600 outline-none focus:border-[var(--color-primary)] focus:bg-black/60 focus:ring-1 focus:ring-[var(--color-primary)] transition-all tracking-widest font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-3 py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-xl text-white bg-[var(--color-primary)] hover:bg-[#b30004] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A0B] focus:ring-offset-[var(--color-primary)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 shadow-lg shadow-[var(--color-primary)]/20"
            >
              {/* Button Hover Effect overlay */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

        </div>
        
        {/* Footer info text */}
        <p className="text-center text-xs font-bold tracking-widest text-neutral-700 uppercase mt-8">
          Authorized Personnel Only
        </p>
      </div>

    </div>
  );
}
