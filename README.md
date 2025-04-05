# React Better Speech Recognition

A React package that provides an easy-to-use interface for speech recognition capabilities in web applications. This package wraps the `BetterSpeechRecognition` functionality, allowing developers to integrate speech recognition into their React components seamlessly.

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

### Setting Up the Provider

Wrap your application with the `SpeechRecognitionProvider` to provide speech recognition capabilities to your components.

```tsx
import React from 'react';
import { SpeechRecognitionProvider } from 'react-better-speech-recognition';

const App = () => (
  <SpeechRecognitionProvider>
    {/* Your components go here */}
  </SpeechRecognitionProvider>
);
```

### Using the Custom Hook

You can use the `useSpeechRecognition` hook in your components to access speech recognition functionalities.

```tsx
import React from 'react';
import { useSpeechRecognition } from 'react-better-speech-recognition';

const MyComponent = () => {
  const { transcript, startListening, stopListening } = useSpeechRecognition();

  return (
    <div>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};
```

## API

### `isSupported()`

Checks if speech recognition is supported in the current environment.

### `createSpeechRecognition(options)`

Creates a speech recognition instance with the provided options.

### `useSpeechRecognition()`

A custom hook that provides access to speech recognition functionalities, including managing the state of the recognition process.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.