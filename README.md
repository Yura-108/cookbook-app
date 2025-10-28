# 🍳 cookbook-app

A full-stack open-source recipe management application built with **Next.js 15**, **TypeScript**, and **Prisma**.  
Users can register, log in, and browse a collection of recipes with photos — all displayed through a clean and responsive UI.

---

## 🚀 Tech Stack

| Layer | Technology                                                |
|-------|-----------------------------------------------------------|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, HeroUI |
| **State Management** | Zustand                                                   |
| **Validation** | Zod                                                       |
| **Backend** | NextAuth.js + bcryptjs                                    |
| **Database** | PostgreSQL + Prisma ORM                                   |
| **Deployment** | Vercel / Netlify                                          |

---

## ✨ Features

- 🔐 User authentication (registration & login)
- 📸 Add recipes with a dish photo
- 📖 Browse all available recipes
- ⚙️ Fully typed codebase with Zod validation
- 🧠 Global state management via Zustand

---

## 🧰 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cookbook-app.git
cd cookbook-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file and add:
```
DATABASE_URL=postgresql://user:password@localhost:5432/cookbook
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Prisma migrations
```bash
npx prisma migrate dev
```

### 5. Start the development server
```bash
npm run dev
```

---

## 🧪 Development Notes

- **Validation:** All form data is validated using Zod before database interaction.
- **Auth:** Custom credential provider via NextAuth using bcrypt for password hashing.
- **State:** UI and form state managed through lightweight Zustand stores.
- **UI:** Built with Tailwind and HeroUI components with dark/light theme support.

---

## 📜 License

MIT License © 2025 Your Name or GitHub Username

---

### 💡 Contributing

Contributions are welcome!  
Feel free to open issues or submit pull requests to improve functionality or UI.
