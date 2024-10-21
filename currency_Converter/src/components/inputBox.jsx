import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOption = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
}) {
  const id = useId();
  return (
    <div className="mb-4">
      <div className="mb-2">
        <label htmlFor={id} className="text-gray-700 font-semibold">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="border border-gray-300 p-2 rounded-md w-full mt-1"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      <div className="mb-2">
        <p className="text-gray-700 font-semibold">Currency Type</p>
        <select
          className="border border-gray-300 p-2 rounded-md w-full mt-1"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOption.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
