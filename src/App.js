import React, { useState } from 'react';
import './App.css';

const whereToSwap = [
  {name: 'Avnu', chains: 'Starknet', mingoRating: 4, url: 'https://app.avnu.fi/en'},
  {name: 'Ekubo', chains: 'Starknet', mingoRating: 4, url: 'https://app.ekubo.org/'},
  {name: 'Ambient Finance', chains: ['Scroll', 'Ethereum'], mingoRating: 4, banklessLikelyhood: 'Medium', url: 'https://ambient.finance/'},
  {name: 'Odos', chains: ['Ethereum', 'Optimism', 'BNB Chain', 'Polygon', 'zkSync Era', 'Base', 'Arbitrum', 'Avalanche'], mingoRating: 3, url: 'https://odos.xyz/'},
  {name: 'SyncSwap', chains: ['Ethereum','zkSync Era', 'Linea', 'Scroll'], mingoRating: 2, banklessLikelyhood: 'High', url: 'https://syncswap.xyz/'},
  {name: 'JediSwap', chains: 'Starknet', mingoRating: 2, banklessLikelyhood: 'Medium', url: 'https://www.jediswap.xyz/'},
  {name: 'DefiLlama', chains: 'All other chains', url: 'https://swap.defillama.com/'}
];

function App() {
  const [selectedChain, setSelectedChain] = useState('Starknet');
  const [swapResults, setSwapResults] = useState([]);

  const handleFindSwap = () => {
    const chainMatches = whereToSwap.filter((dex) => {
      if (Array.isArray(dex.chains)) {
        return dex.chains.includes(selectedChain);
      } else {
        return dex.chains === selectedChain;
      }
    });

    setSwapResults(chainMatches);
  }

  return (
    <div className="App">
      <h1>Swap Finder</h1>
      <label htmlFor='chainDropdown'>Select Chain:</label>
      <select
        id="chainDropdown"
        onChange={(e) => setSelectedChain(e.target.value)}
        value={selectedChain}
      >
        {Array.from(new Set(whereToSwap.flatMap((swap) => swap.chains)))
          .filter((chain) => chain !== undefined)
          .map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
      </select>
      <button onClick={handleFindSwap}>Find swap</button>
      
      <div>
        {swapResults.length > 0 ? (
          <ul>
            {swapResults.map((result) => (
              <li key={result.name}>
                <a href={result.url}>{result.name}</a>{result.mingoRating && (<span> - Mingo Rating: {result.mingoRating} </span>)}
                {result.banklessLikelyhood && (
                  <span> - Bankless likelyhood: {result.banklessLikelyhood}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Select chain and click Find Swap.</p>
        )}
      </div>
    </div>
  );
}

export default App;
