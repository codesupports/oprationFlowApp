
"use client";

import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-lg text-center">

                {/* 404 */}
                <div className="mb-6">
                    <h1 className="text-8xl font-extrabold tracking-tight text-blue-600 sm:text-9xl">
                        404
                    </h1>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Page not found
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                    Sorry, the page you are looking for doesn&apos;t exist or may have
                    been moved.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <button
                        onClick={() => router.back()}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                    >
                        <ArrowLeft size={17} />
                        Go Back
                    </button>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                        <Home size={17} />
                        Back to Home
                    </button>

                </div>
            </div>
        </main>
    );
}
