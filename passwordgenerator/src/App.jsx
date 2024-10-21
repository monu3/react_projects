import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0987654321";
    if (charAllowed) str += "!@#$%^&*()_";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset "Copied" message after 2 seconds
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-8 mt-10 bg-gray-900 text-white">
        <h1 className="text-center text-2xl font-bold mb-6">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-lg bg-gray-700 text-white placeholder-gray-400"
            placeholder="Generated password"
            readOnly
          />

          <button
            className={`bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition duration-200 ${
              copied ? "bg-green-500" : ""
            }`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col text-sm gap-4">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-2">
              <label htmlFor="length" className="text-white font-semibold">
                Length: {length}
              </label>
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="accent-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numbers"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="numbers" className="text-white font-semibold">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="characters"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="characters" className="text-white font-semibold">
              Include Special Characters
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-orange-500 text-white py-2 mt-6 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
