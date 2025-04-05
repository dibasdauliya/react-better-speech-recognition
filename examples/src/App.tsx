import "./App.css";
import { useSpeechRecognition } from "../../src";

function App() {
  const {
    finalTranscript,
    completeTranscript,
    interimTranscript,
    isListening,
    error,
    startListening,
    stopListening,
    isSupported,
  } = useSpeechRecognition();

  if (!isSupported) {
    return <p>Speech recognition is not supported in your browser.</p>;
  }

  return (
    <div className="container">
      <h1>React Better Speech Recognition Demo</h1>

      <div className="controls">
        <button
          onClick={startListening}
          disabled={isListening}
          className={isListening ? "disabled" : "active"}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          className={!isListening ? "disabled" : "active"}
        >
          Stop Listening
        </button>
      </div>

      {error && <div className="error">Error: {error}</div>}

      <div className="transcript-container">
        <div className="transcript-box">
          <h2>Current Recognition</h2>
          <p className="final">{finalTranscript}</p>
          <p className="interim">{interimTranscript}</p>
        </div>

        <div className="transcript-box">
          <h2>Complete Transcript</h2>
          <p>{completeTranscript}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
