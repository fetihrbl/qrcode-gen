import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if(word.trim() === "") {
      setQrCode("");
      return;
    }

    setLoading(true);

    const newQrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${size}x${size}&bgcolor=${bgColor}`;

    setQrCode(newQrUrl);
    setLoading(false);
  }, [word, size, bgColor])

  return (
   <div className='App'>
    <h1>QR Code Generator</h1>
    <div className="input-box">
        <div className="gen">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter text to encode"
          />
        </div>

        <div className="extra">
          <h5>Background Color:</h5>
          <input type="color" value={`#${bgColor}`} onChange={(e) => setBgColor(e.target.value.substring(1))} />  
          <h5>Dimension: {size}px</h5>
          <input type="range" min="200" max="600" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
      </div>

      <div className="output-box">
        {loading ? (
          <p>⏳ Generating QR Code...</p>
        ) : qrCode ? (
          <>
            <img src={qrCode} alt={`QR Code for ${word}`} />
            <a href={qrCode} download="QRCode.png">
              <button type="button">Download</button>
            </a>
          </>
        ) : (
          <p>📌 Enter text to generate a QR Code.</p>
        )}
      </div>
        </div>
  );
}

export default App;
