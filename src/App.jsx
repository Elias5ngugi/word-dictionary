import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [error, setError] = useState("");

  const fetchWordMeaning = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data && data[0]?.meanings?.length > 0) {
        setMeanings(data[0].meanings); 
        setError("");
      } else {
        setMeanings([]);
        setError("Word not found. Try another word.");
      }
    } catch {
      setMeanings([]);
      setError("Failed to fetch the word.");
    }
  };

  return (
    <>
      <div className="container">
        <h3>By <a href="https://www.linkedin.com/in/elias-ngugi/" title="LinkedIn account" target="_blank" rel="noopener noreferrer">Elias Ngugi</a></h3>
        <h2>Type A Word to <strong>Find</strong> Its Meaning</h2>
        <div className="search-box">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word..."
          />
          <button onClick={fetchWordMeaning}>Search</button>
        </div>
      </div>

      {meanings.length > 0 && (
        <div className="result-box">
          {meanings.map((meaningObj, index) => (
            <div key={index} className="meaning">
              <h3>{meaningObj.partOfSpeech.toUpperCase()}</h3>
              <ul>
                {meaningObj.definitions.map((def, i) => (
                  <li key={i}>{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </>
  );
}

export default App;
