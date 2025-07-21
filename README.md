# React Seconds Counter ⏱️

Una aplicación avanzada de contador de segundos construida con React y tecnologías web modernas. La aplicación incluye funcionalidades de cuenta regresiva, controles completos y notificaciones inteligentes.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

## ✨ Características

- **Contador Avanzado**: Cuenta tiempo transcurrido desde la carga de la página o cuenta regresiva desde un tiempo objetivo
- **Controles Completos**: Funciones de iniciar, parar, pausar, reanudar y reiniciar
- **Alertas Inteligentes**: Notificaciones visuales y sonoras cuando se alcanza un tiempo específico
- **Modos Flexibles**: 
  - **Modo Elapsed**: Cuenta hacia arriba desde cero
  - **Modo Countdown**: Cuenta regresiva desde un tiempo establecido
- **Configuración Avanzada**: Panel de configuración para personalizar alertas y objetivos
- **Estadísticas de Sesión**: Seguimiento del tiempo total, número de sesiones y alertas activadas
- **Diseño Responsivo**: Interfaz moderna que funciona en todos los dispositivos

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18+** con TypeScript para componentes modernos y type-safe
- **Wouter** para routing ligero del lado del cliente
- **shadcn/ui** componentes basados en Radix UI para accesibilidad
- **Tailwind CSS** para estilos modernos y responsive
- **TanStack Query** para manejo eficiente del estado del servidor
- **Vite** como bundler rápido para desarrollo

### Backend
- **Express.js** con TypeScript para APIs robustas
- **PostgreSQL** con Drizzle ORM para operaciones de base de datos type-safe
- **Neon Database** para PostgreSQL serverless
- **Session Management** con almacenamiento en PostgreSQL

### DevOps y Herramientas
- **Hot Reloading** con Vite y tsx
- **ESM Modules** en toda la aplicación
- **Configuración TypeScript** estricta para mayor calidad de código

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- PostgreSQL database (opcional para desarrollo local)

### Configuración Local

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd react-seconds-counter
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno** (opcional)
   ```bash
   # Para usar base de datos PostgreSQL
   DATABASE_URL=postgresql://username:password@localhost:5432/counter_app
   ```

4. **Ejecuta la aplicación en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   ```
   http://localhost:5000
   ```

## 📱 Uso

### Controles Básicos
- **Start**: Inicia el contador
- **Pause**: Pausa temporalmente el contador
- **Resume**: Reanuda desde donde se pausó
- **Stop**: Detiene completamente el contador
- **Reset**: Reinicia a cero o al tiempo objetivo

### Configuración de Alertas
1. Ve al panel de configuración
2. Establece un "Alert Time" en segundos
3. El sistema te notificará cuando se alcance ese tiempo
4. Las alertas incluyen sonido y notificación visual

### Modo Countdown
1. Selecciona "Countdown Mode" en configuración
2. Establece el "Target Time" en segundos
3. Haz clic en "Set Countdown"
4. El contador iniciará desde ese tiempo hacia cero

## 🏗️ Arquitectura del Proyecto

```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   │   ├── SecondsCounter.tsx    # Componente principal
│   │   │   ├── CounterDisplay.tsx    # Display del contador
│   │   │   ├── ControlButtons.tsx    # Botones de control
│   │   │   ├── SettingsPanel.tsx     # Panel de configuración
│   │   │   └── AlertNotification.tsx # Sistema de alertas
│   │   ├── hooks/        # Custom hooks
│   │   │   └── useCounter.ts         # Hook principal del contador
│   │   ├── pages/        # Páginas de la aplicación
│   │   └── lib/          # Utilidades y configuración
├── server/               # Backend Express
│   ├── index.ts         # Servidor principal
│   ├── routes.ts        # Rutas API
│   └── storage.ts       # Capa de persistencia
├── shared/              # Código compartido
│   └── schema.ts        # Esquemas de datos con Drizzle
└── components.json      # Configuración shadcn/ui
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia desarrollo con hot reloading
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la build de producción
- `npm run db:generate` - Genera migraciones de base de datos
- `npm run db:migrate` - Ejecuta migraciones de base de datos

## 🎯 Características Técnicas Destacadas

### Gestión de Estado Avanzada
- Hook personalizado `useCounter` que maneja todo el estado del timer
- Sincronización precisa con `setInterval()` y timestamps
- Manejo de estados complejos (running, paused, mode switching)

### Sistema de Alertas
- Web Audio API para sonidos de notificación
- Sistema de toast notifications
- Prevención de alertas duplicadas con referencias

### Persistencia de Datos
- Estadísticas de sesión en tiempo real
- Integración lista para base de datos PostgreSQL
- Session management para persistencia entre recargas

### Arquitectura Escalable
- Separación clara entre cliente y servidor
- Tipos TypeScript compartidos
- Interfaces abstraídas para fácil extensión

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🙏 Reconocimientos

- **shadcn/ui** por los componentes de interfaz elegantes
- **Radix UI** por los primitives accessibles
- **Tailwind CSS** por el sistema de estilos utility-first
- **Vite** por la experiencia de desarrollo increíble

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub!