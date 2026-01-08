"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Users, CheckCircle } from "lucide-react";

export default function NumberGameApp() {
  // --- State管理 ---
  // アプリの状態: 'setup' (人数入力), 'display' (1人ずつ表示), 'result' (一覧表示)
  const [phase, setPhase] = useState<'setup' | 'display' | 'result'>('setup');
  
  // 参加人数（入力値）
  const [participantCount, setParticipantCount] = useState<number | string>('');
  
  // 生成された番号のリスト
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);
  
  // 現在表示しているプレイヤーのインデックス (0始まり)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // リセット確認モーダルの表示状態
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // --- ロジック関数 ---

  // 1～100の範囲でランダムな整数を生成する関数
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // ゲーム開始処理
  const handleStart = () => {
    const count = Number(participantCount);
    if (!count || count <= 0) return;

    // 人数分だけランダムな数値を生成
    const newNumbers = Array.from({ length: count }, () => getRandomInt(1, 100));
    setGeneratedNumbers(newNumbers);
    setCurrentIndex(0);
    setPhase('display');
  };

  // 「戻る」ボタンの処理
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // 1人目の時に戻る場合、設定画面に戻るか確認（今回は簡易的に直接戻る）
      setPhase('setup');
      setGeneratedNumbers([]);
    }
  };

  // 「次へ」ボタンの処理
  const handleNext = () => {
    if (currentIndex < generatedNumbers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 全員表示し終わったら結果画面へ
      setPhase('result');
    }
  };

  // リセット処理
  const handleReset = () => {
    setShowResetConfirm(false);
    setParticipantCount('');
    setGeneratedNumbers([]);
    setCurrentIndex(0);
    setPhase('setup');
  };

  // --- UIコンポーネント ---

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800 font-sans">
      
      {/* ヘッダー (全画面共通) */}
      <header className="p-4 bg-white shadow-sm flex items-center justify-center sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded-md text-xs">GM用</span>
          番号管理アプリ
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto">
        
        {/* === フェーズ1: 人数入力画面 === */}
        {phase === 'setup' && (
          <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <Users className="w-16 h-16 mx-auto text-blue-500" />
              <h2 className="text-2xl font-bold">参加人数を入力</h2>
              <p className="text-gray-500 text-sm">人数分の番号(1-100)を生成します</p>
            </div>

            <div className="w-full max-w-xs">
              <input
                type="number"
                value={participantCount}
                onChange={(e) => setParticipantCount(e.target.value)}
                placeholder="例: 4"
                className="w-full text-center text-4xl py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white shadow-inner"
              />
            </div>

            <button
              onClick={handleStart}
              disabled={!participantCount || Number(participantCount) <= 0}
              className="w-full max-w-xs py-4 text-xl font-bold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              番号を生成する
            </button>
          </div>
        )}

        {/* === フェーズ2: 個別表示画面 === */}
        {phase === 'display' && (
          <div className="w-full flex flex-col h-full justify-between py-4 animate-in slide-in-from-right duration-300">
            
            {/* 上部ナビゲーション */}
            <div className="flex justify-between items-center w-full mb-8">
              <button 
                onClick={handleBack}
                className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-bold active:bg-gray-300 touch-manipulation"
              >
                <ChevronLeft size={20} />
                戻る
              </button>

              <div className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {currentIndex + 1} / {generatedNumbers.length} 人目
              </div>

              <button 
                onClick={handleNext}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-white shadow-md active:scale-95 transition-all touch-manipulation ${
                  currentIndex === generatedNumbers.length - 1 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {currentIndex === generatedNumbers.length - 1 ? '一覧へ' : '次へ'}
                <ChevronRight size={20} />
              </button>
            </div>

            {/* メイン番号表示エリア */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <span className="text-xl font-bold text-gray-500 block mb-2">
                  {currentIndex + 1}人目の番号
                </span>
                <div className="w-64 h-64 flex items-center justify-center border-4 border-blue-100 rounded-3xl bg-white shadow-xl">
                  <span className="text-9xl font-black text-blue-600">
                    {generatedNumbers[currentIndex]}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                ゲームマスターのみ確認してください
              </p>
            </div>
          </div>
        )}

        {/* === フェーズ3: 結果一覧画面 === */}
        {phase === 'result' && (
          <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
            <div className="text-center space-y-2">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
              <h2 className="text-2xl font-bold">全員の番号一覧</h2>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-2 bg-gray-100 p-3 font-bold text-gray-600 text-sm border-b">
                <div className="text-center">プレイヤー</div>
                <div className="text-center">番号</div>
              </div>
              <ul className="divide-y divide-gray-100">
                {generatedNumbers.map((num, idx) => (
                  <li key={idx} className="grid grid-cols-2 p-4 items-center hover:bg-gray-50">
                    <div className="text-center font-bold text-gray-500">
                      {idx + 1}人目
                    </div>
                    <div className="text-center text-2xl font-black text-gray-800">
                      {num}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* リセットボタンエリア */}
            <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 bg-red-50 text-red-600 border-2 border-red-100 px-6 py-3 rounded-full font-bold shadow-sm hover:bg-red-100 active:scale-95 transition-all"
              >
                <RotateCcw size={20} />
                最初からやり直す
              </button>
            </div>
          </div>
        )}
      </main>

      {/* リセット確認モーダル (Alertの代わり) */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-center">リセットしますか？</h3>
            <p className="text-gray-500 text-center text-sm">
              現在の番号データはすべて消去されます。
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600"
              >
                キャンセル
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-red-600 rounded-xl font-bold text-white shadow-md"
              >
                実行する
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}