import { useEffect, useState } from "react";
import {
  createSpeechRecognition,
  BetterSpeechRecognition,
  isSupported,
} from "better-speech-recognition";

/**
 * React hook for using speech recognition functionality
 *
 * @param options Configuration options for speech recognition
 * @returns {Object} An object containing:
 * - finalTranscript: The newly recognized text that has been finalized in the current recognition cycle
 * - interimTranscript: Words that are still being processed and may change
 * - completeTranscript: Accumulated history of all finalized text since the beginning or last reset
 * - isListening: Whether speech recognition is currently active
 * - error: Error message if something went wrong, null otherwise
 * - startListening: Function to start speech recognition
 * - stopListening: Function to stop speech recognition
 * - isSupported: Boolean indicating if speech recognition is supported in the current environment
 */
export const useSpeechRecognition = (options?: {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}) => {
  const [finalTranscript, setFinalTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [completeTranscript, setCompleteTranscript] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] =
    useState<BetterSpeechRecognition | null>(null);
  const [isSpeechRecognitionSupported] = useState<boolean>(isSupported());

  useEffect(() => {
    try {
      const speechRecognitionInstance = createSpeechRecognition(options);
      setRecognition(speechRecognitionInstance);

      speechRecognitionInstance.onResult = ({
        finalTranscript,
        interimTranscript,
        completeTranscript,
      }) => {
        if (finalTranscript) {
          setFinalTranscript(finalTranscript);
          setCompleteTranscript(completeTranscript);
        }
        setInterimTranscript(interimTranscript);
      };

      speechRecognitionInstance.onError = (event) => {
        setError(event.error);
      };

      return () => {
        speechRecognitionInstance.stop();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [options]);

  /**
   * Starts the speech recognition process.
   * Clears previous transcripts and begins listening for speech input.
   */
  const startListening = () => {
    if (recognition) {
      setCompleteTranscript("");
      setFinalTranscript("");
      setInterimTranscript("");
      setError(null);
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return {
    finalTranscript,
    interimTranscript,
    completeTranscript,
    isListening,
    error,
    startListening,
    stopListening,
    isSupported: isSpeechRecognitionSupported,
  };
};
