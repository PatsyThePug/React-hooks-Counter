# React Seconds Counter

Contador educativo de React con hooks básicos.

## 🚀 GitHub Ready

Descarga y usa directamente:
- `package.json.github` 
- `package-lock.json.github`

Sin referencias de licencia. Tu código, listo para subir.

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