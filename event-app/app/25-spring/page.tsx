"use client";

import { useState } from "react";

export default function Page() {
    const [currentNum, setCurrentNum] = useState<number>(0);

    // 1～100の範囲でランダムな整数を生成する関数
    const getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleChangeNum = () => {
        const num = getRandomInt(1, 100);
        setCurrentNum(num);
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans bg-pink-50/85">
            <main className="flex flex-col items-center gap-6">
                <div className="w-64 h-40 flex items-center justify-center border-2 rounded-xl text-7xl sm:text-8xl md:text-9xl font-bold bg-white shadow-lg">
                    {currentNum}
                </div>

                <button
                    onClick={handleChangeNum}
                    className="w-64 py-3 text-lg sm:text-xl border-2 rounded-2xl bg-gray-200 hover:bg-gray-300 shadow-lg">
                    ボタン
                </button>
            </main>
        </div>
    );
}
