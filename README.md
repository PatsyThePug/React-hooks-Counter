# React Seconds Counter

Contador educativo de React con hooks básicos.

## 🚀 Para GitHub

1. Renombra `package-github.json` a `package.json`
2. Sube los archivos:

```bash
git init
git add .
git commit -m "Contador React educativo"  
git remote add origin [tu-repo]
git push -u origin main
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