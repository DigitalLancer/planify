"use client";
import { useState } from 'react';
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRegister } from '@/hooks/useAuth';

export default function RegisterPage() {
    const wobblyBorder = "rounded-[30px_20px_35px_15px/20px_35px_15px_30px]";
    const { mutate, isPending, isError, error } = useRegister();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        mutate({
            userName,
            email,
            password
        });
    }

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6 font-serif relative overflow-hidden">

            <div className="absolute top-20 right-10 opacity-5 rotate-[-12deg] select-none pointer-events-none">
                <span className="text-[120px] font-handwriting italic">New Chapter.</span>
            </div>
            <div className="absolute bottom-10 left-10 opacity-10 rotate-12 select-none pointer-events-none">
                <Sparkles size={100} className="text-amber-400" />
            </div>

            <div className={`relative w-full max-w-md bg-white border-2 border-slate-900/10 p-10 shadow-2xl ${wobblyBorder}`}>
                <div className="absolute -top-3 right-12 w-28 h-8 bg-rose-100/60 rotate-3 border-x border-rose-200/40 shadow-sm" />
                <div className="text-center mb-10">
                    <h1 className="relative inline-block text-4xl font-handwriting text-slate-800">
                        <span className="absolute -top-1 -left-4 -right-4 h-10 bg-rose-200/50 z-0 rotate-1 skew-x-[-10deg]"></span>
                        <span className="relative z-10">Create New User</span>
                    </h1>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-5">
                        Begin your personal archive
                    </p>
                </div>

                {isError && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-5">
                        {error instanceof Error
                            ? error.message
                            : "Login failed"}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="block font-handwriting text-lg text-slate-600 ml-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="MyUserName"
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-rose-400 font-mono text-sm transition-all rounded-t-lg"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="block font-handwriting text-lg text-slate-600 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hello@journal.com"
                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-rose-400 font-mono text-sm transition-all rounded-t-lg"
                            />
                        </div>
                    </div>

                    {/* Şifre */}
                    <div className="space-y-1">
                        <label className="block font-handwriting text-lg text-slate-600 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-rose-400 font-mono text-sm transition-all rounded-t-lg"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-4 bg-[#1e293b] text-white cursor-pointer py-2 rounded-xl font-handwriting text-lg shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Submit
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-dashed border-slate-200 text-center">
                    <p className="font-handwriting text-lg text-slate-500">
                        Already have an account?
                        <Link href="/login" className="ml-2 text-indigo-600 hover:underline decoration-wavy">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}