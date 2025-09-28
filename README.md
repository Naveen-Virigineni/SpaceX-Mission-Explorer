# Atmosly - SpaceX Mission Explorer

A sleek and responsive web application for exploring the history of SpaceX missions, built with a modern, scalable, and performant tech stack. This project fetches real-time data from the official SpaceX v4 API and provides a rich user experience for filtering and discovering launch information.

`![Atmosly Screenshot](assets/image.png)`

**Live Demo:** [https://naveen-virigineni.github.io/SpaceX-Mission-Explorer/]

---

## ✨ Core Features

- **🚀 Live SpaceX Data:** Fetches and displays up-to-date information from the official [SpaceX v4 API](https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4).
- **🔍 Powerful Server-Side Search & Filtering:** Instantly search by mission name and filter by launch year or success status, with all the heavy lifting done on the server for maximum performance.
- **⚡ Performant UI:** Implements a **debounced search** to ensure a smooth and responsive user experience without excessive API calls.
- **⭐ Favorites System:** Mark your favorite launches and filter to see only them. Your choices are saved locally in your browser using `localStorage`.
- **📄 Detailed Mission View:** Click on any mission to see a detailed modal with the mission patch, description, and links to Wikipedia and webcasts.
- **📱 Responsive Design:** A clean, mobile-first interface styled with Tailwind CSS that works beautifully on all screen sizes.
- **📖 Pagination:** Easily navigate through pages of launch results.

---

## 🛠️ Tech Stack & Choices

This project uses a modern, type-safe, and efficient technology stack chosen for scalability and developer experience.

| Technology | Rationale |
| :--- | :--- |
| **React** | A robust and popular library for building declarative and component-based user interfaces. |
| **TypeScript** | For static typing, which improves code quality, readability, and helps prevent common bugs during development. |
| **Vite** | A next-generation frontend tooling that provides an extremely fast development server and optimized build process. |
| **Tailwind CSS** | A utility-first CSS framework for rapidly building custom, responsive designs without leaving your HTML. |
| **Vitest** | A fast and modern testing framework that integrates seamlessly with Vite for a unified development environment. |

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher recommended)
- [npm](https://www.npmjs.com/)

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.


---

## 🚧 Known Limitations

- **Favorites are Browser-Specific:** The "Favorites" feature uses `localStorage`, meaning favorites are tied to the specific browser and device they are saved on. They are not synced across devices as there is no user authentication or backend database.
- **API Rate Limiting:** As a public client using the free SpaceX API, the application is subject to its rate limits. The debouncing mechanism helps mitigate this, but very rapid filtering could still potentially hit the limit.