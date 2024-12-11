# INFRA SETUP

### BASIC SETUP

- [x] create github repo
  - Super simple, a few clicks. For now, don't add license, .gitignore, or README from github GUI
  - Copy & pase these commands to push to repo & start a remote:

```
  git remote add origin https://github.com/OlisDevSpot/next-feature-testing-convex.git
  git branch -M main
  git push -u origin main
```

- [x] tailwind custom layers (base, components, utilities)
  - Set up tailwind's custom styles for basic app theme & look
  - Set up tailwind body, html, :root height width to 100%
  - Example: set up different font for h1, h2, h3, ... elements in the base layer

### DATABASES & BACKEND

- [x] install Convex backend
      [next-js docs](https://docs.convex.dev/quickstart/nextjs)

  1. Need a GitHub repo to connect convex
  2. npm install convex
  3. npx convex dev (should be opened at times of development for realtime functionality just like npm run dev)
     First time you init a convex project it will ask you to log into your convex account & select which project
  4. create your first table (named it "convexGUI") & add some mock data
  5. create ConvexContextProvider component
  6. wrap the <body> in layout.tsx in ConvexContextProvider component
  7. create your first query in the `convex/` folder called getMockData from the convexGUI table
  8. in a client component, call the query with useQuery(api.convexGUI.getMockData)

- [x] Optional: extend the default import alias (@) to inlcude convex folder
  - '@' refers to ./src/_ -> convex is outside the src folder. Extend it by including @convex/_ in the tsconfig file

### AUTH

- [x] install Clerk

  1. create new clerk app
  2. npm install @clerk/nextjs
  3. set up env variables in .env.local
  4. create a middleware.ts and copy the script
  5. create a ClerkProvider component (if not using Convex)

- [x] connect Clerk to Convex backend

  - looks complicated at first but really isn't.. just make sure you pay attention to these pointers:
    - Followed WebDev Cody's thumbnail SaaS video -> great but uses a prev version of Clerk
    - Only differnece is middleware.ts file -> instead of `authMiddleware`, we're importing `clerkMiddleware` from @clerk/nextjs/server
    - Both the Clerk's docs for integrating with Convex, and the Convex docs for integrating with Clerk tell you to use the package `@clerk/ clerk-react. THIS PACKAGE IS DOWNLOADED WHEN USING @clerk/nextjs. So can follow docs all the same
  - create a `Providers.tsx` file which will wrap your entire <html>. Inside the Providers.tsx file specify everything from the docs
    - middleware.ts file helps you protect the routes that you specify. By default, all routes are PUBLIC. When a route is protected, it will prompt the user to login before continuing

- [x] implement Google OAuth
- [x] implement email login
- [x] implement authorization routes for signed-out & signed-in
  - need clerkMiddleware() function in middleware.ts in the src/ directory
  - Set up public routes with createRouteMatcher() along with auth.protect()

---

# UI SETUP

### BASIC HTML SETUP

- [x] change favicon to svg or png of your choice
      light & dark mode: need 2 icons in public directory
      can use nextjs & tailwind's `dark:` selector to dynamically switch

- [x] change app name & description
- [x] apply at least 2 fonts
  - Use layout page, assign both Nunito & Syne to variables.
  - For default font, pass in nunito.className into <body>
  - For additional fonts, pass in syne.variable into <body> and implement it in the CSS using font-family: var(--font-syne);

### COMPONENT LIBRARY

- [x] install shadcn/ui
  - npx shadcn@latest init -d
  - add button: npx shadcn@latest add button
- [ ] use framer motion for animations

### STATE MANAGEMENT

- [ ] client-state management library (Zustand)
- [x] server-state management library (react-query)

---

# ROUTING SETUP

### CLIENT ROUTES

- [ ] landing page
- [ ] app pages
- [ ] user settings
- [ ] account management

### API ROUTES

---

# WORKFLOW

- [ ] work mobile-first

# FEATURES

### OTHER FEATURES

- [ ] comments system
- [ ] stripe integration
