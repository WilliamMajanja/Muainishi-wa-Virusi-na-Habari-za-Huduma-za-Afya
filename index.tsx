import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- STYLES ---
const styles = `
  :root {
    --primary-bg: #f8f9fa;
    --header-bg-start: #0d47a1;
    --header-bg-end: #1976d2;
    --card-bg: #ffffff;
    --text-color: #212529;
    --light-text-color: #ffffff;
    --primary-color: #1976d2;
    --primary-hover-color: #1565c0;
    --secondary-color: #26a69a;
    --border-color: #dee2e6;
    --shadow-soft: 0 2px 4px rgba(0,0,0,0.05);
    --shadow-medium: 0 4px 12px rgba(0,0,0,0.1);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--primary-bg);
    color: var(--text-color);
    line-height: 1.7;
    font-size: 16px;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .app-header {
    background: linear-gradient(90deg, var(--header-bg-start), var(--header-bg-end));
    color: var(--light-text-color);
    padding: 1.5rem 2rem;
    box-shadow: var(--shadow-medium);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .app-header .material-symbols-outlined {
    font-size: 2.5rem;
  }

  .app-header h1 {
    font-weight: 500;
    font-size: 1.8rem;
  }

  main {
    flex-grow: 1;
    padding: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  }

  .health-section {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--shadow-medium);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
  }
  
  .health-section:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }

  .health-section h2 {
    margin-bottom: 1.5rem;
    color: var(--header-bg-start);
    font-weight: 500;
    border-bottom: 2px solid var(--primary-bg);
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .input-group {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  input[type="text"] {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  input[type="text"]:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: var(--light-text-color);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  button:hover:not(:disabled) {
    background-color: var(--primary-hover-color);
    box-shadow: var(--shadow-soft);
    transform: translateY(-2px);
  }

  button:disabled {
    background-color: #a0c7ff;
    cursor: not-allowed;
  }
  
  button#fetch-news {
    background-color: var(--secondary-color);
  }
  
  button#fetch-news:hover:not(:disabled) {
    background-color: #219185;
  }
  
  .results-container {
    margin-top: 1rem;
    padding-top: 1rem;
    border-radius: 4px;
    background-color: var(--primary-bg);
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
  }
  
  .results-container p, .results-container ul, .results-container li {
    animation: fadeIn 0.5s ease-in-out;
  }

  .disease-info h3 {
    font-weight: 500;
    color: var(--header-bg-start);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .disease-info ul {
    list-style-position: inside;
    padding-left: 0.5rem;
  }
  
  .news-item {
    background: var(--card-bg);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-soft);
  }
  
  .news-item p {
    margin-bottom: 0.75rem;
  }
  
  .placeholder-text {
    color: #6c757d;
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
  }

  .error-message {
    color: #d9534f;
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    padding: 1rem;
    border-radius: 4px;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    height: 100%;
  }

  .loader-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  .sources-list {
    list-style-type: none;
    padding-left: 0;
  }

  .sources-list li a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    display: inline-block;
    word-break: break-all;
  }

  .sources-list li a:hover {
    text-decoration: underline;
  }
  
  .app-footer {
    background-color: #343a40;
    color: #adb5bd;
    text-align: center;
    padding: 1.5rem;
    margin-top: 2rem;
    font-size: 0.9rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 1200px) {
    main {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    body { font-size: 15px; }
    .app-header { padding: 1rem; }
    .app-header h1 { font-size: 1.5rem; }
    main { padding: 1.5rem; gap: 1.5rem; }
    .health-section { padding: 1.5rem; }
    .input-group { flex-direction: column; }
    button { width: 100%; }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// --- API CLIENT ---
let ai;
try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

// --- COMPONENTS ---
const LoadingSpinner = () => (
  <div className="loader" aria-label="Loading content">
    <div className="loader-spinner"></div>
  </div>
);

const Footer = () => (
  <footer className="app-footer">
    <p>&copy; {new Date().getFullYear()} Muainishi wa Virusi. All rights reserved. For informational purposes only.</p>
  </footer>
);

// Helper to format text with headings and lists
const formatDiseaseInfo = (text) => {
  if (!text) return null;
  
  const sections = text.split(/\n(?=- )/); // Split by lines that start with "- "
  
  return sections.map((section, index) => {
    const parts = section.replace(/^- /, '').split(/:\n/);
    const title = parts[0];
    const content = parts.length > 1 ? parts.slice(1).join(':\n') : '';
    const listItems = content.split('\n').filter(item => item.trim() !== '');

    return (
      <div key={index}>
        <h3>{title}</h3>
        <ul>
          {listItems.map((item, i) => (
            <li key={i}>{item.replace(/^\s*-\s*/, '')}</li>
          ))}
        </ul>
      </div>
    );
  });
};


const App = () => {
  const [diseaseQuery, setDiseaseQuery] = useState('');
  const [diseaseResult, setDiseaseResult] = useState('');
  const [newsResult, setNewsResult] = useState(null);
  const [diseaseLoading, setDiseaseLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [diseaseError, setDiseaseError] = useState('');
  const [newsError, setNewsError] = useState('');

  const handleFetchDiseaseInfo = async () => {
    if (!diseaseQuery.trim()) {
      setDiseaseError("Please enter a disease name.");
      return;
    }
    setDiseaseLoading(true);
    setDiseaseError('');
    setDiseaseResult('');

    try {
      const prompt = `Provide a concise but comprehensive summary of the infectious disease: "${diseaseQuery}". Use the following format strictly, with each section on a new line starting with a hyphen:
- Symptoms: [Bulleted list of symptoms]
- Transmission: [Bulleted list of transmission methods]
- Prevention: [Bulleted list of prevention strategies]
- Treatment: [Bulleted list of common treatments]`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setDiseaseResult(response.text);
    } catch (error) {
      console.error("Error fetching disease info:", error);
      setDiseaseError("Failed to fetch information. Please check your connection and try again.");
    } finally {
      setDiseaseLoading(false);
    }
  };
  
  const handleFetchNews = async () => {
    setNewsLoading(true);
    setNewsError('');
    setNewsResult(null);

    try {
      const prompt = "What are the latest top 5 news headlines in global infectious diseases? For each headline, provide a brief one or two-sentence summary. Number each item starting from 1.";
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
      });
      
      const newsText = response.text;
      const newsItems = newsText.split(/\n\d+\.\s/).filter(item => item.trim()).map(item => item.trim());

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setNewsResult({
        items: newsItems,
        sources: sources.map(chunk => chunk.web).filter(Boolean)
      });
      
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsError("Failed to fetch news. Please check your connection and try again.");
    } finally {
      setNewsLoading(false);
    }
  };

  return (
    <>
      <header className="app-header">
        <span className="material-symbols-outlined">health_and_safety</span>
        <h1>Muainishi wa Virusi na Habari za Huduma za Afya</h1>
      </header>
      <main>
        <section className="health-section" aria-labelledby="disease-explorer-title">
          <h2 id="disease-explorer-title"><span className="material-symbols-outlined">science</span>Disease Explorer</h2>
          <div className="input-group">
            <input
              type="text"
              value={diseaseQuery}
              onChange={(e) => setDiseaseQuery(e.target.value)}
              placeholder="e.g., Malaria, Tuberculosis..."
              aria-label="Enter disease name"
            />
            <button onClick={handleFetchDiseaseInfo} disabled={diseaseLoading}>
              <span className="material-symbols-outlined">search</span>
              {diseaseLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          <div className="results-container" aria-live="polite">
            {diseaseLoading && <LoadingSpinner />}
            {diseaseError && <p className="error-message">{diseaseError}</p>}
            {diseaseResult && <div className="disease-info">{formatDiseaseInfo(diseaseResult)}</div>}
            {!diseaseLoading && !diseaseError && !diseaseResult && (
              <p className="placeholder-text">Enter a disease name to get a detailed summary.</p>
            )}
          </div>
        </section>

        <section className="health-section" aria-labelledby="news-title">
          <h2 id="news-title"><span className="material-symbols-outlined">newspaper</span>Global Health News</h2>
          <button id="fetch-news" onClick={handleFetchNews} disabled={newsLoading}>
             <span className="material-symbols-outlined">refresh</span>
            {newsLoading ? 'Fetching...' : 'Fetch Latest News'}
          </button>
          <div className="results-container" aria-live="polite">
            {newsLoading && <LoadingSpinner />}
            {newsError && <p className="error-message">{newsError}</p>}
            {newsResult && (
              <>
                {newsResult.items.map((item, index) => (
                    <div className="news-item" key={index}>
                      <p>{item}</p>
                    </div>
                ))}
                {newsResult.sources.length > 0 && (
                  <div className="news-item">
                    <h3>Sources:</h3>
                    <ul className="sources-list">
                      {newsResult.sources.map((source, index) => (
                        <li key={index}>
                          <a href={source.uri} target="_blank" rel="noopener noreferrer">
                            {source.title || source.uri}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
            {!newsLoading && !newsError && !newsResult && (
              <p className="placeholder-text">Click the button to fetch top global health headlines.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const container = document.getElementById('root');
if (!ai) {
  container.innerHTML = `<div style="padding: 2rem; text-align: center; color: red; font-size: 1.2rem;">
    Error: The Gemini API client could not be initialized. Please ensure the API key is configured correctly.
  </div>`;
} else {
  const root = createRoot(container);
  root.render(<App />);
}