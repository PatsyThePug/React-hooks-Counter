# React Seconds Counter

Contador educativo de React con hooks básicos.

## 🚀 Usar

```bash
npm install
npm run dev
```

## 💻 Código

```javascript
// useState y useEffect en acción
const [seconds, setSeconds] = useState(0);
const [isRunning, setIsRunning] = useState(false);

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

## 👩‍💻 Por

**Patsy The Pug_dev**  
https://github.com/PatsyThePug