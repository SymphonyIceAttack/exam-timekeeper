# ⏰ Exam Timekeeper

<div align="center">

**Never miss an important exam date again. Real-time countdowns for standardized tests.**

[Live Demo](https://exam-timekeeper.top) • [Features](#-key-features) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare)](https://pages.cloudflare.com)
[![Biome](https://img.shields.io/badge/Biome-2.2.4-60A5FA)](https://biomejs.dev)

</div>

---

## 🎯 What is Exam Timekeeper?

**Exam Timekeeper** is a modern, responsive web application that helps students track standardized exam dates with precision. It automatically fetches the latest exam schedules from official sources and displays them in an intuitive, real-time countdown interface.

Whether you're preparing for the SAT, ACT, GRE, TOEFL, or GMAT, Exam Timekeeper ensures you never miss important registration deadlines or test dates.

**🔗 Visit the live site: [https://exam-timekeeper.top](https://exam-timekeeper.top)** (configured via `NEXT_PUBLIC_SITE_URL`)

---

## ✨ Key Features

### 🔥 **Core Functionality**
- **📅 Real-time Countdowns** - Live countdown timers for all major standardized exams
- **🔄 Auto-updating Data** - Automatically fetches latest exam dates from official sources
- **🎯 Multi-Exam Support** - SAT, ACT, GRE, TOEFL, GMAT and more
- **⚡ Fast Performance** - Optimized for speed with instant loading

### 🎨 **User Experience**
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🌙 Dark/Light Theme** - Beautiful themes with smooth transitions
- **⭐ Favorites System** - Mark important exams and filter easily
- **🧠 Focus Mode** - Distraction-free studying interface
- **🕰️ Clock View** - Minimal countdown display for secondary monitors

### 🛠️ **Advanced Features**
- **➕ Custom Exams** - Add your own important dates and deadlines
- **📊 Smart Filtering** - Filter by favorites, categories, or view all
- **🔔 Visual Alerts** - Color-coded countdown for urgency levels
- **📖 Built-in Help** - Comprehensive FAQ and user guide
- **🎵 Audio Notifications** - Optional bell sounds for time alerts

### 🌐 **Data Sources**
- **College Board** - Official SAT test dates
- **ACT.org** - Official ACT examination schedules
- **ETS.org** - GRE and TOEFL test dates
- **mba.com** - GMAT examination periods

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **pnpm** (recommended package manager)
- Modern web browser with JavaScript enabled

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/symphoneiceattack/exam-timekeeper.git
cd exam-timekeeper
```

2. **Install dependencies (requires pnpm)**
```bash
pnpm install
```

⚠️ **Important**: This project uses pnpm as the package manager. Please install pnpm first:

```bash
npm install -g pnpm
```

3. **Configure environment variables**
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your configuration
```

4. **Start development server**
```bash
pnpm dev
```

5. **Open your browser**
```
http://localhost:3000
```

### Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://exam-timekeeper.top        # Your deployed site URL
NEXT_PUBLIC_SITE_NAME=Exam Timekeeper            # Site name

# Directus CMS Configuration (for blog functionality)
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus.com  # Optional
DIRECTUS_ACCESS_TOKEN=your_access_token          # Optional
```

**Note**: The `NEXT_PUBLIC_SITE_URL` environment variable should be set to your actual deployment URL for production deployments.

### Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Deployment
pnpm build:worker     # Build for Cloudflare Pages
pnpm preview          # Preview production build
pnpm deploy           # Deploy to Cloudflare Pages
```

---

## 🏗️ Technology Stack

### **Frontend**
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[React 19](https://react.dev)** - Modern React with hooks
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework

### **UI/UX**
- **[shadcn/ui](https://ui.shadcn.com)** - Modern component library
- **[Radix UI](https://www.radix-ui.com)** - Accessible UI primitives
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### **Backend & Data**
- **[Directus](https://directus.io)** - Headless CMS for blog content
- **Custom API Routes** - Real-time exam data fetching
- **Official APIs** - Direct integration with exam organizations

### **Development & Deployment**
- **[Biome](https://biomejs.dev)** - Fast linter and formatter
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Global CDN deployment
- **[pnpm](https://pnpm.io)** - Efficient package manager

---

## 🎨 Screenshots

<div align="center">

### Light Theme - Main Dashboard
![Exam Timekeeper Dashboard](https://via.placeholder.com/800x400/ffffff/1f2937?text=Main+Dashboard+with+Countdown)

### Dark Theme - Focus Mode
![Focus Mode](https://via.placeholder.com/800x400/1f2937/ffffff?text=Focus+Mode+Interface)

### Mobile Responsive Design
![Mobile View](https://via.placeholder.com/400x700/ffffff/1f2937?text=Mobile+Responsive+Design)

### Real-time Countdown Timer
![Countdown Timer](https://via.placeholder.com/800x300/3b82f6/ffffff?text=Real-time+Countdown+Display)

</div>

*Replace placeholder images with actual screenshots of your application*

---

## 🌍 Live Demo

**🔗 Experience the full application: [Live Site](https://exam-timekeeper.top)**

### Try these features:
- ✅ View real-time countdown for upcoming exams
- ✅ Switch between light and dark themes
- ✅ Test the responsive design on mobile
- ✅ Add custom exams and deadlines
- ✅ Explore focus mode and clock view
- ✅ Browse the built-in FAQ and help sections

---

## 📱 How It Works

1. **Automatic Data Fetching** - Every 30 minutes, the app fetches the latest exam schedules from official sources
2. **Real-time Updates** - Countdown timers update every second, showing exact time remaining
3. **Smart Filtering** - Automatically removes expired exam dates and shows only upcoming tests
4. **User Customization** - Add personal deadlines, favorite important exams, and customize your view
5. **Multi-device Sync** - Responsive design ensures consistent experience across all devices

---

## 🛠️ Project Structure

```
exam-timekeeper/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/               # API endpoints
│   ├── 📁 (pages)/           # Static pages
│   ├── 📁 posts/            # Blog functionality
│   └── 📄 page.tsx          # Main dashboard
├── 📁 components/           # React components
│   ├── 📁 ui/              # shadcn/ui components
│   └── 📁 *.tsx            # Feature components
├── 📁 lib/                  # Utilities
├── 📁 public/              # Static assets
└── 📄 configuration files
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Bug Reports** - Report issues you encounter
- 💡 **Feature Requests** - Suggest new features or improvements
- 🔧 **Code Contributions** - Submit pull requests
- 📖 **Documentation** - Improve guides and documentation
- 🌐 **Translations** - Help localize the application

### **Development Process**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run quality checks**
   ```bash
   pnpm lint && pnpm format && pnpm build
   ```
5. **Commit and push**
   ```bash
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```
6. **Submit a pull request**

### **Code Standards**
- Follow TypeScript strict mode
- Use Biome for linting and formatting
- Write descriptive commit messages
- Test changes in both light and dark themes
- Ensure mobile responsiveness

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **Data Sources**
- [College Board](https://satsuite.collegeboard.org) - SAT test information
- [ACT](https://www.act.org) - ACT examination details
- [ETS](https://www.ets.org) - GRE and TOEFL test schedules
- [GMAC](https://www.mba.com) - GMAT examination periods

### **Technologies & Tools**
- [Next.js](https://nextjs.org) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com) - Excellent utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Cloudflare](https://pages.cloudflare.com) - Reliable global deployment

---

## 📞 Support & Contact

### **Need Help?**
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/symphoneiceattack/exam-timekeeper/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/symphoneiceattack/exam-timekeeper/discussions)
- 📖 **Documentation**: Check the built-in help section at [Live Site](https://exam-timekeeper.top/help)

### **Connect with the Developer**
- 🌐 **Website**: [https://exam-timekeeper.top](https://exam-timekeeper.top)
- 📧 **Contact**: Available through the website contact form

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by **symphoneiceattack**

[🔗 Live Site](https://exam-timekeeper.top) • [📖 Documentation](https://exam-timekeeper.top/help) • [💬 Support](https://exam-timekeeper.top/contact)

</div>
