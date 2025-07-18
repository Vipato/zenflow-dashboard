# ZenFlow Dashboard

A personal focus and productivity dashboard, designed to create a tranquil digital environment to help you achieve "deep work". Built with React and Vite, ZenFlow runs 100% in your browser and requires no backend or API keys.

## ✨ Key Features

- **Pomodoro Timer:** Easily switch between **Focus**, **Short Break**, and **Long Break** modes with customizable durations.
- **Smart Focus List:** Create your to-do list for the current focus session.
- **"AI" Suggestions:** Get simulated task suggestions for your main goal. This feature is **simulated locally** to work without an API key.
- **Brain Dump:** A handy notepad to quickly jot down distracting thoughts and ideas, which can be formatted into a clean list with one click.
- **Personalization & Persistence:** The app greets you by name, supports multiple languages (Português 🇧🇷 & English 🇬🇧), and saves all your tasks, settings, and session history in your browser.
- **Session History:** Review your completed focus sessions.
- **Responsive Design:** A clean, modern, and distraction-free UI that works on both desktop and mobile.

## 🚀 Technologies Used

This project uses a modern, build-tool-based approach for web development.

- **Build Tool:** **Vite** - A blazing-fast frontend tool that provides a rapid development experience and bundles the code for production.
- **Framework:** **React** (`v19`) - For building the reactive, component-based user interface.
- **Language:** **TypeScript** - For static typing, making the code more robust and easier to maintain.
- **Styling:** **Tailwind CSS** - A utility-first CSS framework for rapidly building modern designs. The final CSS is optimized and purged of unused styles during the build process.
- **Icons:** **Lucide React** - A lightweight and customizable SVG icon library.
- **Local Storage:** The browser's `localStorage` is used to persist user data (name, settings, tasks, history, and language) across sessions.

## ⚙️ Development Setup

**Prerequisites:** You need to have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
    cd YOUR-REPO-NAME
    ```

2.  **Install dependencies:**
    This command reads the `package.json` file and installs all the necessary libraries (React, Vite, etc.).
    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start a local development server with Hot-Module-Replacement (HMR), meaning your browser will automatically update as you make changes to the code.
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## ☁️ How to Deploy to GitHub Pages

1.  **Build the project:**
    Run the build script. This command uses Vite to compile and bundle all your code into a `dist` folder, which contains the optimized, static files ready for production.
    ```bash
    npm run build
    ```

2.  **Commit and Push:**
    Commit all your changes, including the newly created `dist` folder.
    ```bash
    git add .
    git commit -m "Build project for deployment"
    git push
    ```

3.  **Configure GitHub Pages:**
    -   In your GitHub repository, go to the **Settings** tab.
    -   In the left sidebar, click on **Pages**.
    -   Under "Build and deployment", for the **Source**, select **"Deploy from a branch"**.
    -   For the **Branch**, choose your main branch (e.g., `main`) and select the **`/dist`** folder from the dropdown.
    -   Click **Save**.

4.  **Wait and Visit:**
    Wait a few minutes for GitHub to deploy your site. You will see the live URL on the same page. It will look like: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

Your ZenFlow Dashboard is now live and accessible to everyone!
