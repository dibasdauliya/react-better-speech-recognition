import React, { useEffect } from "react";
import { useSpeechRecognition } from "../src";

const SimpleExample: React.FC = () => {
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

  useEffect(() => {
    if (isListening) {
      console.log("Listening...");
    } else {
      console.log("Stopped listening.");
    }
  }, [isListening]);

  if (!isSupported) {
    return <p>Speech recognition is not supported in your browser.</p>;
  }

  return (
    <div>
      <h1>Simple Speech Recognition Example</h1>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div>
        <h2>Current Recognition:</h2>
        <p>{finalTranscript}</p>
        <p>
          <i>{interimTranscript}</i>
        </p>
      </div>

      <div>
        <h2>Complete Transcript:</h2>
        <p>{completeTranscript}</p>
      </div>
    </div>
  );
};

export default SimpleExample;
