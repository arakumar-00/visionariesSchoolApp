# VisionariesSchoolApp - React Native Expo Project

A comprehensive school management mobile application built with React Native and Expo, featuring role-based authentication and multi-user interfaces.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Run on device/emulator:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks (useAuth, etc.)
├── mocks/           # Mock JSON data for development
├── navigation/      # Role-based navigation logic
├── screens/         # Screen components organized by feature
│   └── auth/        # Authentication screens
├── services/        # API abstraction layer
├── store/           # Zustand state management
├── types/           # TypeScript type definitions
└── utils/           # Helper functions and utilities

app/                 # Expo Router file-based routing
├── (tabs)/          # Tab navigation structure
├── auth/            # Authentication flow screens
├── _layout.tsx      # Root layout configuration
└── index.tsx        # App entry point with auth routing
```

## 🔄 Mock Data System

The app includes a comprehensive mock data system for rapid frontend development:

### Toggle Configuration
- **Location:** `src/services/api.ts`
- **Flag:** `API_CONFIG.USE_MOCK_DATA`
- **Default:** `true` (uses mock data)

### Mock Data Files
- `src/mocks/dashboard.json` - Dashboard metrics, wallet, events, notifications
- `src/mocks/userDirectory.json` - User listings by role
- `src/mocks/notifications.json` - Notification feed data
- `src/mocks/auth.json` - Authentication responses

### Adding New Mock Data
1. Create a new JSON file in `src/mocks/`
2. Define the data structure matching your TypeScript interfaces
3. Add corresponding API functions in `src/services/api.ts`
4. Include mock toggle logic similar to existing endpoints

## 🔐 Authentication System

### Features
- JWT-based authentication with secure token storage
- Role-based routing (student, teacher, parent, staff, driver, admin)
- Automatic token refresh
- Secure storage using Expo SecureStore

### Authentication Flow
1. **Login/Signup** - Email/password authentication
2. **Token Storage** - Secure storage of JWT tokens
3. **Role Routing** - Navigate to role-appropriate interface
4. **Auto Refresh** - Background token refresh to maintain session

### Supported User Roles
- **Student** - Access to assignments, grades, schedule
- **Teacher** - Class management, student grades, schedule
- **Parent** - Child monitoring, payments, communications
- **Staff** - Administrative functions, user management
- **Driver** - Route management, student tracking
- **Admin** - Full system access, analytics, settings

## 🧭 Navigation Architecture

### Primary Navigation: Tabs
All authenticated users access core features through bottom tab navigation:
- Dashboard
- Directory (User listings)
- Notifications
- Profile

### Role-Based Navigation
- Navigation routes are determined by user role after authentication
- Screen access is controlled via permission system
- Each role has a tailored interface and feature set

### Navigation Utilities
- `getNavigationRouteForRole(role)` - Get initial route for user role
- `hasPermission(userRole, screen)` - Check screen access permissions

## 🛠️ Development Guidelines

### State Management
- **Zustand** for client state (auth, app state)
- **React hooks** for component state
- **Secure storage** for sensitive data (tokens, user data)

### API Integration
- All API calls go through the service layer in `src/services/`
- Mock data toggle allows development without backend
- Type-safe API responses using TypeScript interfaces

### Adding New Features
1. Define TypeScript interfaces in `src/types/`
2. Create mock data in `src/mocks/`
3. Add API functions in `src/services/`
4. Build screen components in `src/screens/`
5. Add navigation routes as needed

### Code Organization
- **Single Responsibility** - Each file/component has one clear purpose
- **Modular Architecture** - Clean separation between features
- **Type Safety** - Comprehensive TypeScript coverage
- **Clean Imports** - Use absolute imports with `@/` prefix

## 🔧 Configuration

### Environment Variables
Create a `.env` file for configuration:

```env
# API Configuration
EXPO_PUBLIC_API_BASE_URL=https://api.visionariesschool.edu
EXPO_PUBLIC_USE_MOCK_DATA=true

# App Configuration
EXPO_PUBLIC_APP_NAME=VisionariesSchool
EXPO_PUBLIC_VERSION=1.0.0
```

### Build Configuration
- **Development:** `npm run dev` - Starts Expo development server
- **Web Build:** `npm run build:web` - Creates web production build
- **Linting:** `npm run lint` - Runs ESLint checks

## 📋 Next Steps (Phase 1 Implementation)

### Priority Tasks
1. **Authentication Implementation**
   - Complete login/signup form validation
   - Implement role selection during onboarding
   - Add biometric authentication option
   - Email verification flow

2. **Dashboard Enhancement**
   - Role-specific dashboard layouts
   - Real-time data updates
   - Interactive charts and metrics
   - Quick action buttons

3. **User Directory**
   - Search and filter functionality
   - User profile views
   - Contact integration
   - Role-based access controls

4. **Notifications System**
   - Push notification setup
   - In-app notification center
   - Notification preferences
   - Real-time updates

5. **Profile Management**
   - User profile editing
   - Settings and preferences
   - Security options
   - Account management

### Technical Improvements
- Add comprehensive error boundaries
- Implement offline data caching
- Add comprehensive test suite
- Performance optimization
- Accessibility enhancements

## 🏗️ Backend Integration Plan

When ready to connect to real backend:

1. **Update API Configuration**
   - Set `USE_MOCK_DATA: false` in `src/services/api.ts`
   - Configure production API URLs
   - Add authentication headers to API calls

2. **Django Backend Requirements**
   - JWT authentication endpoints
   - Role-based API permissions
   - Database models for all entities
   - OpenAPI documentation

3. **Security Considerations**
   - HTTPS for all API communications
   - Proper CORS configuration
   - Rate limiting and security headers
   - Input validation and sanitization

## 📱 Testing

### Manual Testing
- Test on both iOS and Android platforms
- Verify role-based navigation works correctly
- Test authentication flow completely
- Validate mock data toggle functionality

### Automated Testing (Future)
- Unit tests for utilities and services
- Integration tests for authentication flow
- E2E tests for critical user journeys
- Performance testing for large datasets

---

**Project Status:** Phase 0 Complete - Project bootstrapped with core architecture, mock data system, and authentication foundation ready for Phase 1 implementation.