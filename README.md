# PUABO OS v2.0.0 - Creator Operating System

**Pull Up And Bounce Out Operating System**

The world's first browser-based Creator Operating System, empowering music artists, podcasters, digital entrepreneurs, and content creators to launch, manage, and grow their brand—all from one unified platform.

## 🚀 Features

### Core Operating System
- **Desktop Interface**: Full OS-like experience with app launcher and taskbar
- **Window Management**: Draggable, resizable windows with minimize/maximize controls
- **Role-Based Access**: Admin, Creator, and Viewer roles with appropriate permissions
- **User Authentication**: Secure login system with demo accounts

### Creator Apps
- **Creator Dashboard**: Analytics, content management, and monetization tracking
- **PUABO TV & Radio**: Streaming platform with media player and live streaming
- **Payments & Revenue**: Transaction history, revenue tracking, and payout management
- **BLAC ALT Lending**: Loan application system with calculator and approval workflow
- **Admin Panel**: User management, system settings, and broadcasting tools
- **User Profile**: Personal stats, social links, and account management

### Technical Features
- **Modern React**: Built with React 18, TypeScript, and Vite
- **Beautiful UI**: Tailwind CSS with shadcn/ui components
- **State Management**: Context-based state management for scalability
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Production Ready**: Clean, modular code with proper error handling

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn/pnpm

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/puabo-os-v2.git
   cd puabo-os-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Demo Accounts

Try PUABO OS with these demo accounts:

- **Admin**: `admin_demo` / `admin@puabo.com`
- **Creator**: `artist_mike` / `mike@puabo.com`  
- **Viewer**: `viewer_jane` / `jane@puabo.com`

## 📱 Available Apps

### For All Users
- **PUABO TV**: Stream audio/video content
- **Payments**: View transactions and revenue
- **BLAC Lending**: Apply for creator loans
- **Profile**: Manage personal information

### For Creators
- **Dashboard**: Analytics and content management
- **All viewer apps** with enhanced features

### For Admins
- **Admin Panel**: User management and system control
- **All creator and viewer apps**

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── apps/           # Application components
│   ├── ui/             # shadcn/ui components
│   ├── Desktop.tsx     # OS desktop interface
│   ├── LoginScreen.tsx # Authentication
│   ├── PuaboOS.tsx     # Main OS orchestrator
│   └── WindowManager.tsx # Window system
├── contexts/           # React contexts
├── types/              # TypeScript definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
```

## 🎨 Design Philosophy

PUABO OS is designed as the "Apple OS for Indie Creators" with core values:

- **Freedom for creators**: Open platform for creative expression
- **Simplicity in structure**: Clean, intuitive interface
- **Power in functionality**: Comprehensive creator tools
- **Speed and ease**: Fast, responsive user experience

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**PUABO OS v2.0.0** - Empowering the next generation of creators 🎵🎨🚀