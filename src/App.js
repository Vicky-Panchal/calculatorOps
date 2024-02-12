import './App.css';
import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSquareRoot = () => {
    setResult(Math.sqrt(parseFloat(number)));
  };

  const handleFactorial = () => {
    let fact = 1;
    for (let i = 1; i <= parseInt(number); i++) {
      fact *= i;
    }
    setResult(fact);
  };

  const handleNaturalLog = () => {
    setResult(Math.log(parseFloat(number)));
  };

  const handlePower = () => {
    setResult(Math.pow(parseFloat(number), parseFloat(prompt('Enter power (b):'))));
  };
  return (
    <div className="calculator-container">
      <h2 className="calculator-header">Scientific Calculator</h2>
      <input type="number" className="calculator-input" value={number} onChange={handleInputChange} />
      <br />
      <button className="calculator-button" onClick={handleSquareRoot}>Square Root (√x)</button>
      <button className="calculator-button" onClick={handleFactorial}>Factorial (x!)</button>
      <button className="calculator-button" onClick={handleNaturalLog}>Natural Logarithm (ln(x))</button>
      <button className="calculator-button" onClick={handlePower}>Power (x^b)</button>
      <br />
      <h3 className="calculator-result">Result: {result}</h3>
    </div>
  );
}

export default App;
