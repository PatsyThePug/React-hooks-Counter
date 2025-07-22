# Contador de Segundos Vanilla JS - Proyecto Limpio

## Overview

Este es un contador de segundos educativo creado con **JavaScript puro** por **Patsy The Pug_dev**. Es un proyecto 100% libre de derechos de autor de terceros, sin frameworks ni dependencias externas. Demuestra conceptos básicos de JavaScript: DOM, eventos, temporizadores y clases ES6.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect) for local state
- **Query Management**: TanStack React Query for server state (though minimal server interaction in current implementation)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL configured with Drizzle ORM (Neon database)
- **Session Management**: Basic in-memory storage with extensible interface

### Component Structure
- **UI Components**: shadcn/ui based component library in `client/src/components/ui/`
- **Custom Components**: Counter-specific components in `client/src/components/`
- **Pages**: Simple page structure with routing in `client/src/pages/`

## Key Components

### Counter Implementation
- **SimpleCounter**: Main counter component with basic start/stop/reset functionality
- **SecondsCounter**: Enhanced version with additional features (appears to be in development)
- **CounterDisplay**: Reusable display component for counter UI
- **ControlButtons**: Button controls for counter operations

### State Management
- **useCounter Hook**: Custom hook for counter logic with support for elapsed/countdown modes
- **Local State**: React useState for simple counter operations
- **Session Stats**: Tracking runtime, sessions, and alerts

### UI Components
- Complete shadcn/ui component library integration
- Custom styling with Tailwind CSS variables
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables

## Data Flow

### Client-Side Flow
1. User interacts with counter controls (start/stop/reset buttons)
2. State updates trigger re-renders of counter display
3. Timer functionality managed through useEffect with setInterval
4. Component state manages counter value, running state, and pause state

### Server-Side Flow
- Express server configured but minimal API implementation
- Database schema defined for users table
- Extensible storage interface for future CRUD operations
- Development/production environment handling

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Libraries**: Radix UI primitives, Lucide React icons, React Icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: React Hook Form with Zod validation
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Build Tools**: Vite, TypeScript, ESBuild

### Development Dependencies
- Tailwind CSS plugins and Vite configuration
- TypeScript configuration with path mapping
- PostCSS for CSS processing

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle Kit for schema management and migrations

### Environment Configuration
- Development mode uses Vite dev server with HMR
- Production mode serves static files from Express
- Database connection via environment variable `DATABASE_URL`
- Replit-specific plugins for development environment

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

## Project Ownership

This project is **100% owned** by **Patsy The Pug_dev** as specified in the OWNERSHIP.md file. All code, design decisions, and implementation concepts are original work by the owner.