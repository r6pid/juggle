"use client";

import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-white text-black">
            <header className="w-full flex justify-between items-center p-4">
            </header>
            <main className="flex flex-col items-center mt-8 p-4 rounded-md w-full max-w-full ml-40">
                <div className="flex flex-row w-full">
                    <div className="text-7xl font-bold mb-8 text-left w-1/2">
                        <p>Plan smart.</p>
                        <p>Balance better.</p>
                        <p>Stress less.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/2">
                        <div className="rounded-md p-16 mb-8">
                            <p className="text-xl text-blue-400">Pic of the site</p>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-2xl text-left">
                        Juggle helps students balance academics and extracurriculars.<br />
                        Stay organized, prioritize tasks,<br />
                        and manage your schedule with ease!
                    </p>
                </div>
            </main>
        </div>
    );
}
