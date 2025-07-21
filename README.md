# React Seconds Counter

A simple and educational React counter application demonstrating fundamental React hooks. Perfect for learning React concepts with hands-on examples and clean, readable code.

## 🚀 Features

### Simple Counter Functionality
- **Basic Timer**: Clean seconds counter with start/stop/reset controls
- **Visual Display**: Large, easy-to-read timer format (MM:SS)
- **Interactive Controls**: Simple buttons for timer management
- **Responsive Design**: Works on desktop and mobile devices

### Educational Content
- **React Hooks Demo**: Real-world examples of `useState` and `useEffect`
- **Clean Code**: Well-commented, beginner-friendly code structure
- **Learning Focus**: Demonstrates core React concepts without complexity
- **Code Examples**: Live code snippets showing hook implementation

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and development server
- **Shadcn/UI** - Beautiful, accessible components

## 🎯 Learning Objectives

This project demonstrates:

1. **useState Hook**: Managing component state for timer values and controls
2. **useEffect Hook**: Handling side effects like intervals and cleanup
3. **Component Structure**: Building reusable, maintainable components
4. **Event Handling**: Implementing user interactions with proper state updates
5. **Conditional Rendering**: Displaying different UI based on application state

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-seconds-counter.git
   cd react-seconds-counter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5000`

## 💻 Core Implementation

### useState Hook Example
```javascript
const [seconds, setSeconds] = useState(0);
const [isRunning, setIsRunning] = useState(false);
```

### useEffect Hook Example
```javascript
useEffect(() => {
  let interval = null;
  
  if (isRunning) {
    interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
  }

  return () => {
    if (interval) clearInterval(interval);
  };
}, [isRunning]);
```

## 📁 Project Structure

```
src/
├── components/
│   └── SimpleCounter.tsx    # Main counter component
├── pages/
│   └── counter.tsx         # Counter page
├── App.tsx                 # App router
└── main.tsx               # Entry point
```

## 🎨 Features in Detail

### Timer Controls
- **Start**: Begin counting seconds
- **Stop**: Pause the timer
- **Reset**: Reset counter to 00:00

### Educational Elements
- **Live Code Examples**: See the actual hooks code in action
- **Concept Explanations**: Understanding useState and useEffect
- **Clean Architecture**: Learn from well-structured React components

## 🌟 About the Creator

**Patsy Pugnerarian** - Mini dev en entrenamiento  
*Debuggeo emociones, rompo código, duermo en deploy. Caos con patitas.* 💻

Based in Ciudad de México, learning and building with modern web technologies.



## 🤝 Contributing

Contributions are welcome! This is an educational project perfect for:
- First-time contributors
- Learning React fundamentals  
- Practicing clean code principles
- Understanding modern development workflow

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

---

Made with ❤️ for learning React fundamentals