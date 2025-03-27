# Modern Portfolio Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Database Schema](#database-schema)
6. [Authentication](#authentication)
7. [Installation](#installation)
8. [Development](#development)
9. [Deployment](#deployment)
10. [Environment Variables](#environment-variables)

## Overview
A modern portfolio website built with React, TypeScript, and Supabase. The application features a blog system, guestbook, 3D rendering, and multilingual support.

## Technology Stack
- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database & Authentication**: Supabase
- **3D Graphics**: Three.js with React Three Fiber
- **Internationalization**: i18next
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure
```
/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Page components
│   └── i18n.ts          # Internationalization configuration
├── supabase/
│   └── migrations/      # Database migrations
└── public/              # Static assets
```

## Features

### 1. Blog System
- Markdown support for post content
- Image upload functionality
- Post categories and tags
- Like system
- Comments section
- Reading time estimation

### 2. Guestbook
- Public message board
- Support for authenticated and anonymous messages
- Admin moderation capabilities

### 3. 3D Visualization
- Interactive 3D model rendering
- Optimized performance
- Responsive design integration

### 4. Authentication
- Email-based authentication
- Protected routes
- Admin privileges
- Profile management

### 5. Internationalization
- English and Spanish language support
- Easy language switching
- Consistent translations across components

### 6. Theme System
- Light/Dark mode support
- Custom color palette
- Persistent theme preference

## Database Schema

### Tables
1. **profiles**
   - id (uuid, PK)
   - full_name (text)
   - avatar_url (text)
   - display_name (text)
   - is_admin (boolean)

2. **posts**
   - id (uuid, PK)
   - title (text)
   - content (text)
   - markdown_content (text)
   - excerpt (text)
   - image_url (text)
   - video_url (text)
   - user_id (uuid, FK)
   - reading_time (integer)

3. **categories** & **tags**
   - id (uuid, PK)
   - name (text)
   - slug (text)

4. **comments**
   - id (uuid, PK)
   - post_id (uuid, FK)
   - content (text)
   - user_id (uuid, FK)
   - visitor_name (text)

5. **guestbook**
   - id (uuid, PK)
   - content (text)
   - user_id (uuid, FK)
   - visitor_name (text)

## Authentication

### User Roles
1. **Anonymous Users**
   - Read posts
   - View guestbook
   - Leave comments
   - Sign guestbook

2. **Authenticated Users**
   - All anonymous permissions
   - Like posts
   - Update profile

3. **Admin Users**
   - All authenticated permissions
   - Create/edit/delete posts
   - Moderate comments
   - Manage guestbook entries

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Run linting:
```bash
npm run lint
```

3. Build for production:
```bash
npm run build
```

## Deployment

The application is configured for deployment on Netlify:

1. Connect to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in Netlify dashboard

## Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Security Considerations

1. **Row Level Security (RLS)**
   - Enabled on all tables
   - Custom policies for each table
   - Role-based access control

2. **API Security**
   - Protected routes
   - Token-based authentication
   - Environment variable protection

3. **File Upload Security**
   - File type validation
   - Size limits
   - Secure storage policies

## Performance Optimization

1. **Code Splitting**
   - Route-based code splitting
   - Lazy loading of components
   - Dynamic imports for heavy features

2. **Asset Optimization**
   - Image optimization
   - 3D model optimization
   - Caching strategies

3. **State Management**
   - Efficient Zustand store
   - Optimized React context usage
   - Proper memoization

## Maintenance

1. **Database Migrations**
   - Located in `/supabase/migrations`
   - Version controlled
   - Documented changes

2. **Dependency Updates**
   - Regular security updates
   - Compatibility checking
   - Breaking change management

3. **Monitoring**
   - Error tracking
   - Performance monitoring
   - User analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details
