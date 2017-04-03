import {h, Component} from 'preact';

export default function Error({retryDataHandler}) {
  return (
    <main>
      <h1>Communication Difficulties</h1>
      <p>There appears to be an issue recieving this lists' data.</p>
      {navigator.onLine && <button onclick={retryDataHandler}>Try Again</button>}
    </main>
  );
}