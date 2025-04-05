import "./App.css";
import { useState, useRef, useEffect } from "react";
import { useSpeechRecognition } from "react-better-speech-recognition";

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
    setCompleteTranscript,
  } = useSpeechRecognition();

  const [editedTranscript, setEditedTranscript] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // When stopping, prepare for editing
  const handleStopListening = () => {
    stopListening();
    setEditedTranscript(completeTranscript);
  };

  // When editing is complete
  const saveEdit = () => {
    setCompleteTranscript(editedTranscript);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedTranscript(completeTranscript);
  }, [completeTranscript]);

  if (!isSupported) {
    return <p>Speech recognition is not supported in your browser.</p>;
  }

  return (
    <div className="container">
      <h1>React Better Speech Recognition Demo</h1>

      <div className="controls">
        <button
          onClick={startListening}
          disabled={isListening || isEditing}
          className={isListening || isEditing ? "disabled" : "active"}
        >
          Start Listening
        </button>
        <button
          onClick={handleStopListening}
          disabled={!isListening}
          className={!isListening ? "disabled" : "active"}
        >
          Stop Listening
        </button>
        {!isListening && completeTranscript && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="active edit-btn"
          >
            Edit Transcript
          </button>
        )}
        {isEditing && (
          <button onClick={saveEdit} className="active save-btn">
            Save Changes
          </button>
        )}
      </div>

      {error && <div className="error">Error: {error}</div>}

      <div className="transcript-container">
        {isListening && (
          <>
            <div className="transcript-box">
              <h2>Current Recognition</h2>
              <p className="final">{finalTranscript}</p>
              <p className="interim">{interimTranscript}</p>
            </div>

            <div className="transcript-box">
              <h2>Complete Transcript</h2>
              <p>{completeTranscript}</p>
            </div>
          </>
        )}

        {!isListening && completeTranscript && !isEditing && (
          <div className="transcript-box">
            <h2>Final Transcript</h2>
            <p>{completeTranscript}</p>
          </div>
        )}

        {isEditing && (
          <div className="transcript-box editing">
            <h2>Edit Transcript</h2>
            <textarea
              ref={editTextareaRef}
              value={editedTranscript}
              onChange={(e) => setEditedTranscript(e.target.value)}
              rows={6}
              className="edit-textarea"
            />
            <div className="edit-instructions">
              <p>Review and correct any mistakes in the transcript.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
