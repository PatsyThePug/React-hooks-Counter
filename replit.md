# React Timer/Counter Application

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) that implements a sophisticated timer/counter system. The application features both elapsed time tracking and countdown functionality with a modern, responsive UI built using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Fixed import issue in CounterDisplay component
✓ Added react-icons library for technology icons  
✓ Enhanced footer with technology badges (React, TypeScript, Tailwind CSS, Vite)
✓ Removed PostgreSQL dependency as requested - simplified to in-memory storage
✓ Added GitHub-ready banner and improved visual presentation
✓ Created simplified README.md in Spanish with essential information
✓ Simplified project files for clean GitHub repository
✓ Updated .gitignore with comprehensive patterns for Node.js projects
✓ Repositioned Patsy profile to bottom footer with complete GitHub-style card
✓ Updated profile text to "Mini dev en educación" for educational focus
✓ Enhanced visual layout with larger technology icons and stronger typography
✓ Project is now fully prepared for GitHub deployment - COMPLETED

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect) with custom hooks
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage for lightweight development
- **Development**: Hot reloading with tsx and Vite middleware integration
- **Session Management**: Memory-based session storage

### Key Components

#### Frontend Components
1. **SecondsCounter**: Main counter component that orchestrates the timer functionality
2. **CounterDisplay**: Visual display of the timer with status indicators and control buttons
3. **ControlButtons**: Play/pause/stop/reset controls with dynamic state-based rendering
4. **SettingsPanel**: Configuration panel for timer modes, targets, and preferences
5. **AlertNotification**: Toast-style notifications for user feedback

#### Custom Hooks
- **useCounter**: Comprehensive hook managing timer state, modes (elapsed/countdown), and session statistics
- **useToast**: Toast notification system for user feedback
- **useIsMobile**: Responsive design hook for mobile detection

#### Backend Structure
- **Storage Interface**: Abstracted storage layer with in-memory implementation (extensible to database)
- **Routes**: Express routes with middleware for logging and error handling
- **Database Schema**: User management schema using Drizzle ORM

## Data Flow

1. **Timer State Management**: The useCounter hook maintains all timer state including current time, running status, mode, and configuration
2. **User Interactions**: Control buttons trigger state changes through the hook's action methods
3. **Visual Updates**: Components react to state changes and update the UI accordingly
4. **Persistence**: Session statistics and user preferences are tracked in local state (database integration ready)
5. **Notifications**: Alert system provides feedback for user actions and timer events

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **UI Components**: Extensive Radix UI component library for accessible primitives
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon serverless database
- **Development**: Vite, TypeScript, ESBuild for production builds
- **Utilities**: date-fns for time formatting, clsx/cn for conditional styling

### Development Tools
- **Hot Reloading**: Vite with React plugin and runtime error overlay
- **Type Safety**: Full TypeScript configuration with strict mode
- **Database Migration**: Drizzle Kit for schema management
- **Code Quality**: ESM modules throughout the application

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to optimized static assets
2. **Backend Build**: ESBuild bundles Express server for production deployment
3. **Output Structure**: Frontend assets in `dist/public`, server bundle in `dist/`

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Sessions**: PostgreSQL-backed session storage for user state persistence
- **Development**: NODE_ENV-based configuration for development vs production modes

### Production Considerations
- **Static Serving**: Express serves built frontend assets in production
- **Database Migrations**: Drizzle migrations managed via npm scripts
- **Session Persistence**: Database-backed sessions for user state across deployments
- **Error Handling**: Comprehensive error middleware for API routes

The application is designed as a monorepo with clear separation between client and server code, shared TypeScript types, and a unified build process suitable for deployment on platforms supporting Node.js applications with PostgreSQL databases.