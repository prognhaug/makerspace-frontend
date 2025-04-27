# Makerspace Frontend

A web application for managing Jæren Makerspace. This platform allows visitors to express interest in membership and check out what we've cooking!

## 📋 Features

- **Landing Page**: Information about the makerspace
- **Express Interest Form**: Collect potential member information
- **Contact Us**: Contact form for misc stuff
- **Makerspace Page**: Will be the place to check out what we provide. Machines, tools etc
- **Events**: Information about events

## 🚀 Technologies

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

## 🛠️ Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/prognhaug/makerspace-frontend.git
cd /makerspace-frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:3000

## 🎨 Design System

The application uses a consistent design system with:

- **Typography**: Custom font sizes and weights for headings and paragraphs
- **Colors**: Primary theme colors with various shades for different UI elements
- **Components**: Reusable UI components like buttons and form inputs

# 📂 Project Structure

```
makerspace-frontend/
├── src/
│ ├── app/
│ │ ├── (public)/
│ │ │ └── meld-interesse/ # Express interest page
│ │ └── globals.css # Global styles and design tokens
│ ├── components/
│ │ └── ui/
│ │ ├── Button.tsx # Button component
│ │ └── forms/
│ │ └── Input.tsx # Form input component
├── public/
├── tailwind.config.js # Tailwind configuration
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Built with ❤️ by the Jæren Makerspace Team
