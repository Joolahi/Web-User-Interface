import React, {useState, useEffect} from 'react';

function App() {
  const  [quote, setQuote] = useState(null)

  const fetchQuote = async() => {
    try {
      const response = await fetch('/.netlify/functions/getData')

      if (!response.ok) {
        throw new Error(`Error : ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Results:', result);
    setQuote(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h1>Random Quote Generator</h1>
      <button onClick={fetchQuote}>Get Your Quote</button>
      {quote && (
        <div>
          <h2>{quote.quote.content}</h2>
          <h3>-- {quote.quote.author} --</h3>
        </div>
      )}
    </div>
  );
}

export default App;