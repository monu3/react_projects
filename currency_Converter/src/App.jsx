import { useState } from "react";
import UseCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/inputBox"; // Assuming this is the correct path

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NPR");
  const [convertedAmount, setConvertedAmount] = useState();

  const { data: currencyInfo, error } = UseCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521897258701-21e2a01f5e8b?ixlib=rb-4.0.3&q=80&w=1080&fit=crop&auto=format&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8')`,
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-10 w-full">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
              Currency Converter
            </h1>

            {error && (
              <p className="text-red-500 text-center mb-4">Error: {error}</p>
            )}

            <div className="mb-6">
              <InputBox
                label="From"
                amount={amount}
                currencyOption={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="mb-6">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled={true}
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition-colors"
            >
              Convert {from} to {to}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
