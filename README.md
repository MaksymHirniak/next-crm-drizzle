# Full-Stack CRM Dashboard 📊

A robust, end-to-end CRM dashboard demonstrating modern full-stack web development. It features secure data handling, server-side pagination, and complex database relationships.

## 🚀 Tech Stack
- **Framework:** Next.js (App Router & Server Actions)
- **Database:** Serverless PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS

## 💡 Core Features
- Server-side data fetching and pagination for maximum performance.
- Secure database mutations using Next.js Server Actions.
- "Soft delete" implementation and complex state management.
- Type-safe database schema managed by Drizzle ORM.

## 🛠️ How to run locally
1. Clone the repository:
   `git clone <your-repo-url>`
2. Install dependencies:
   `npm install`
3. Create a `.env.local` file and add your PostgreSQL connection string:
   `DATABASE_URL=your_postgres_url_here`
4. Push the schema to your database:
   `npm run db:push` *(or your specific Drizzle script)*
5. Run the development server:
   `npm run dev`
