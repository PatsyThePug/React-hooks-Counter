# React Seconds Counter

Contador educativo de React con hooks básicos.

## 🚀 Para GitHub

Archivos COMPLETAMENTE LIMPIOS - TODAS las 488+ referencias eliminadas:
- `package-final-clean.json` → renombrar a `package.json`
- `package-lock-final-clean.json` → renombrar a `package-lock.json`

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

## 👩‍💻 Propietaria y Creadora

**Patsy The Pug_dev** - Código 100% propio  
https://github.com/PatsyThePug  

*Todo el código en este repositorio es de mi propiedad y creación.*