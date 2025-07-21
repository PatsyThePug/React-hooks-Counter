# React Seconds Counter

Un contador educativo de React que demuestra los hooks fundamentales. Perfecto para aprender React con ejemplos prácticos y código limpio.

## ✨ Características

- **Contador Simple**: Cronómetro con controles start/stop/reset  
- **React Hooks**: Ejemplos reales de `useState` y `useEffect`
- **Diseño Responsivo**: Funciona en escritorio y móvil
- **Código Educativo**: Comentado y fácil de entender

## 🛠️ Tecnologías

- React 18 + TypeScript
- Tailwind CSS  
- Vite
- Shadcn/UI

## 🚀 Instalación

```bash
git clone [tu-repo]
cd react-seconds-counter
npm install
npm run dev
```

## 📝 Código Principal

```javascript
// useState para el estado
const [seconds, setSeconds] = useState(0);
const [isRunning, setIsRunning] = useState(false);

// useEffect para el timer
useEffect(() => {
  let interval = null;
  if (isRunning) {
    interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [isRunning]);
```

## 👩‍💻 Creado por

**Patsy The Pug_dev**  
GitHub: https://github.com/PatsyThePug  
Mini dev en educación - Ciudad de México

*Aprendiendo React con código limpio y caos con patitas* 💻