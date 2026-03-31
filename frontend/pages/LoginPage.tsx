"use client";

import { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, PenTool } from 'lucide-react';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
    const { mutate, isPending, isError, error } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        mutate(
            { email, password, rememberMe },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                },
            }
        );
    }
    const wobblyBorder = "rounded-[20px_15px_40px_10px/15px_35px_10px_25px]";
    return (
        <div className="h-dvh bg-[#fdfbf7] flex items-center justify-center p-6 font-serif relative overflow-hidden">

            <div className="absolute top-10 left-10 opacity-5 rotate-12 select-none pointer-events-none">
                <span className="text-[150px] font-handwriting">Notes.</span>
            </div>
            <div className="absolute bottom-20 right-20 opacity-10 -rotate-12 select-none pointer-events-none">
                <PenTool size={120} />
            </div>

            <div className={`relative w-full max-w-md bg-white border-2 border-slate-900/10 p-10 shadow-xl ${wobblyBorder}`}>

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-indigo-100/60 -rotate-1 border-x border-indigo-200/50 shadow-sm" />

                <div className="text-center mb-10">
                    <h1 className="relative inline-block text-4xl font-handwriting text-slate-800">
                        <span className="absolute -top-1 -left-3 -right-3 h-10 bg-yellow-200/60 z-0 -rotate-1 skew-x-[-12deg]"></span>
                        <span className="relative z-10">Create Your Planify Account</span>
                    </h1>
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
                        <label className="block font-handwriting text-xl text-slate-600 ml-1">Your Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="pen@paper.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-400 font-mono text-sm transition-all rounded-t-lg"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block font-handwriting text-xl text-slate-600 ml-1">Your Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-400 font-mono text-sm transition-all rounded-t-lg"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-handwriting text-lg text-slate-500 px-1">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} className="accent-indigo-500" />
                            <span>Remember me</span>
                        </label>

                        <button className="hover:text-indigo-600 transition-colors cursor-pointer underline decoration-dotted underline-offset-4">
                            Lost the key?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#1e293b] text-white py-2 rounded-xl cursor-pointer font-handwriting text-lg shadow-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Login
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-dashed border-slate-200 text-center">
                    <p className="font-handwriting text-lg text-slate-500">
                        Don't have an account yet?
                        <Link href="/register" className="ml-2 text-indigo-600 hover:underline decoration-wavy">
                            Get one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage