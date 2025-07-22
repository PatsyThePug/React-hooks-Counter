# React Seconds Counter

Contador educativo de React con hooks básicos.

## 🚀 GitHub Ready

Usa estos archivos limpios:
- `package.json.clean`
- `package-lock.json.clean`

Sin licencias. Tu código listo.

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