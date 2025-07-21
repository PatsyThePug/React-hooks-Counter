import { useState, useEffect } from 'react';
import { Timer, Play, Square, RefreshCw, Code, Hourglass } from 'lucide-react';
import { SiReact, SiJavascript, SiTailwindcss, SiVite, SiGithub } from 'react-icons/si';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import patsyImage from '@assets/dev 3_1753127624549.png';

export default function SimpleCounter() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8 animate-in slide-in-from-top duration-500">
          <div className="mb-6">
            <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl border border-slate-300">
              <img 
                src={patsyImage} 
                alt="Patsy The Pug" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Aprendiendo con Patsy The Pug_dev</h2>
            <p className="text-base text-slate-700 font-semibold mb-3">Patsy Pugnerarian • she/her</p>
            <p className="text-sm text-slate-800 font-medium max-w-xs mx-auto">Patsy Pugnerarian, edición limitada con glitter. Debuggeo emociones, rompo código, duermo en deploy. Mini dev en entrenamiento, caos con patitas. 💻</p>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-3">
            <Timer className="inline-block h-12 w-12 text-blue-600 mr-3" />
            React Seconds Counter
          </h1>
          <p className="text-slate-800 text-xl font-semibold">
            Simple counter demonstrating React hooks
          </p>
        </header>

        {/* Simple Counter Display */}
        <div className="mb-8">
          <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-mono font-bold text-blue-600 mb-6">
                {formatTime(seconds)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleStart}
                  disabled={isRunning}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start
                </button>
                <button
                  onClick={handleStop}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* React Concepts Section */}
        <section className="mt-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-5">
              <Hourglass className="inline-block h-10 w-10 text-blue-600 mr-3" />
              Conceptos de React - Hooks useState y useEffect
            </h2>
            <p className="text-slate-800 text-xl font-semibold max-w-3xl mx-auto">
              Aprende cómo funcionan los hooks principales de React en este contador de segundos
            </p>
            <div className="inline-flex items-center gap-3 mt-4 bg-slate-50 px-6 py-3 rounded-lg border border-slate-200">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-300">
                <img 
                  src={patsyImage} 
                  alt="Patsy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-slate-800 text-base font-bold">Patsy explica: "¡Caos con patitas pero código limpio!"</span>
            </div>
          </div>



          {/* React Hooks Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black text-slate-900">
                  useState Hook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800 text-base font-semibold mb-4">
                  Maneja el estado del componente:
                </p>
                <ul className="text-slate-800 text-base font-medium space-y-2 list-disc pl-6">
                  <li><code className="bg-slate-200 px-2 py-1 rounded font-bold">seconds</code> - contador actual</li>
                  <li><code className="bg-slate-200 px-2 py-1 rounded font-bold">isRunning</code> - estado del timer</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-black text-slate-900">
                  useEffect Hook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-800 text-base font-semibold mb-4">
                  Maneja efectos secundarios:
                </p>
                <ul className="text-slate-800 text-base font-medium space-y-2 list-disc pl-6">
                  <li>Inicia/detiene el interval</li>
                  <li>Limpia recursos al desmontar</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <div className="border-t border-slate-200 pt-6">
            <p className="mb-6 text-slate-800 text-lg font-semibold">Built with React and modern web technologies</p>
            
            {/* Technology Icons - Larger and Stronger Colors */}
            <div className="flex justify-center items-center gap-12 mb-8">
              <div className="flex flex-col items-center gap-3 text-blue-500 hover:text-blue-400 transition-all duration-300 hover:scale-125 cursor-pointer">
                <SiReact className="h-16 w-16 drop-shadow-lg" />
                <span className="text-lg font-black text-slate-800">React</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-125 cursor-pointer">
                <SiJavascript className="h-16 w-16 drop-shadow-lg" />
                <span className="text-lg font-black text-slate-800">JavaScript</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-125 cursor-pointer">
                <SiTailwindcss className="h-16 w-16 drop-shadow-lg" />
                <span className="text-lg font-black text-slate-800">Tailwind</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-purple-500 hover:text-purple-400 transition-all duration-300 hover:scale-125 cursor-pointer">
                <SiVite className="h-16 w-16 drop-shadow-lg" />
                <span className="text-lg font-black text-slate-800">Vite</span>
              </div>
            </div>
            
            {/* GitHub Style Profile Card */}
            <Card className="max-w-md mx-auto mb-6 bg-white border-slate-300 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-lg">
                    <img 
                      src={patsyImage} 
                      alt="Patsy The Pug" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-2xl mb-2">Patsy The Pug_dev</h3>
                    <p className="text-slate-600 text-base font-semibold mb-4">@PatsyThePug</p>
                    <p className="text-slate-700 text-base leading-relaxed mb-6">
                      Patsy Pugnerarian, edición limitada con glitter. Debuggeo emociones, rompo código, duermo en deploy. Mini dev en entrenamiento, caos con patitas. 💻
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-slate-600 font-medium mb-3">
                      <span>📍 CIUDAD DE MEXICO</span>
                      <span>🔗 dev en entrenamiento</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Joined last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* GitHub Ready Banner */}
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <SiGithub className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">Ready for GitHub!</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}