# Muainishi wa Virusi na Habari za Huduma za Afya
*(Virus Classifier and Health Services News)*

A sophisticated, AI-powered web application designed to provide reliable, up-to-date information on infectious diseases and global health news. Built with React and powered by the Google Gemini API, this tool serves as an indispensable resource for healthcare professionals, researchers, and the general public.

![App Screenshot](https://storage.googleapis.com/aistudio-hosting/project-assets/21b5c46e-1d7d-4b2a-9e3c-74a613f9824c/app-screenshot.png)
*(Image: A preview of the clean and professional application dashboard.)*

---

## ✨ Key Features

-   **Disease Explorer**: Instantly access comprehensive, AI-generated summaries of infectious diseases. Simply enter a disease name to receive structured information on:
    -   Symptoms
    -   Transmission Methods
    -   Prevention Strategies
    -   Common Treatments
-   **Real-Time Global Health News**: Stay informed with the latest top headlines in global infectious diseases. This feature uses the Gemini API with Google Search grounding to ensure the news is current and relevant.
-   **Verifiable Sources**: To ensure credibility and trust, every news item is accompanied by a list of source links, allowing users to verify information and delve deeper into topics.
-   **Professional & Responsive UI/UX**: The application features a clean, clinical, and intuitive design that is fully responsive, providing a seamless experience on desktops, tablets, and mobile devices.
-   **Built for Performance & Accessibility**: Optimized for fast loading and designed with ARIA attributes to ensure it is accessible to all users.

---

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/)
-   **AI Model**: Google Gemini API (`gemini-2.5-flash`)
-   **Styling**: Modern CSS-in-JS (Dynamic Stylesheet)
-   **Icons**: [Google Material Symbols](https://fonts.google.com/icons)
-   **Fonts**: [Google Fonts](https://fonts.google.com/) (Roboto)
-   **Module Management**: ES Modules with `importmap` for dependency handling.

---

## 🚀 How It Works

The application is architected around two core functionalities powered by the Google Gemini API:

1.  **Disease Information Retrieval**: When a user searches for a disease, the application constructs a highly specific prompt asking the `gemini-2.5-flash` model for a structured summary. The model's text response is then parsed and elegantly formatted into distinct sections for readability.

2.  **News Aggregation with Grounding**: The "Fetch Latest News" feature leverages the `googleSearch` tool available in the Gemini API. This grounds the model's response in real-time search results from the web, allowing it to generate current and accurate news headlines. The application then extracts both the generated text and the `groundingChunks` (source URLs and titles) from the API response to present to the user.

---

## ⚙️ Getting Started

This project is designed to run in an environment where the Google Gemini API key is securely managed.

### Prerequisites

-   A valid Google Gemini API key set as an environment variable (`process.env.API_KEY`).
-   A modern web browser.

### Running the Application

1.  **No Installation Needed**: The project uses an `importmap` in `index.html` to load React and the `@google/genai` library directly from a CDN. There are no local `node_modules` to install.
2.  **Serve the Files**: Serve the `index.html` file using a simple local web server. A tool like `serve` or a VS Code extension like "Live Server" can be used.
3.  **Open in Browser**: Navigate to the local server's address in your web browser to use the application.

The application logic is contained entirely within `index.tsx`, which is loaded as an ES module by the `index.html` file.

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
