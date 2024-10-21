import { useEffect, useState } from "react";

const UseCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/193bae9b943bf50cf433801f/latest/${currency}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }
        const res = await response.json();
        setData(res.conversion_rates);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCurrencyInfo();
  }, [currency]);

  return { data, error };
};

export default UseCurrencyInfo;
