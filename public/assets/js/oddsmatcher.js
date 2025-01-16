// Ensure React and ReactDOM are available globally if using CDN.
const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello from React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Render the React app into the #react-root element
ReactDOM.createRoot(document.getElementById('react-root')).render(<App />);
