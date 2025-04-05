# React Better Speech Recognition

A React package that provides an easy-to-use interface for speech recognition capabilities in web applications.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-better-speech-recognition
```

or

```bash
yarn add react-better-speech-recognition
```

## Usage

### Using the Custom Hook

You can use the `useSpeechRecognition` hook in your components to access speech recognition functionalities:

```tsx
import React from "react";
import { useSpeechRecognition } from "react-better-speech-recognition";

const MyComponent = () => {
  const {
    finalTranscript,
    interimTranscript,
    completeTranscript,
    isListening,
    error,
    startListening,
    stopListening,
    isSupported,
  } = useSpeechRecognition({
    continuous: true,
    interimResults: true,
    language: "en-US",
  });

  if (!isSupported) {
    return <p>Speech recognition is not supported in your browser.</p>;
  }

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>

      {error && <p>Error: {error}</p>}

      <div>
        <h3>Current Recognition:</h3>
        <p>{finalTranscript}</p>
        <p>
          <i>{interimTranscript}</i>
        </p>
      </div>

      <div>
        <h3>Complete Transcript:</h3>
        <p>{completeTranscript}</p>
      </div>
    </div>
  );
};
```

## API

### `useSpeechRecognition(options?)`

A custom hook that provides access to speech recognition functionality.

#### Options

- `continuous` (boolean): If true, the recognition will continue listening even after the user stops speaking
- `interimResults` (boolean): If true, interim results will be returned while the user is speaking
- `language` (string): The language for the recognition (e.g., 'en-US', 'fr-FR')

#### Return Values

- `finalTranscript` (string): The newly recognized text that has been finalized in the current recognition cycle
- `interimTranscript` (string): Words that are still being processed and may change
- `completeTranscript` (string): Accumulated history of all finalized text since the beginning or last reset
- `isListening` (boolean): Whether speech recognition is currently active
- `error` (string | null): Error message if something went wrong, null otherwise
- `startListening` (function): Function to start speech recognition
- `stopListening` (function): Function to stop speech recognition
- `isSupported` (boolean): Indicates if speech recognition is supported in the current environment

## Browser Support

Visit [caniuse.com](https://caniuse.com/#feat=speech-recognition) for the latest compatibility information.

## Related Packages

This package is a React wrapper for [better-speech-recognition](https://www.npmjs.com/package/better-speech-recognition), which provides the core speech recognition functionality.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
