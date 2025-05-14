import { useEffect, useState } from "react";
import { fetchAvailableCurrencies } from "../services/api";

const CurrencySelector = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableCurrencies().then(setCurrencies).catch(console.error);
  }, []);

  return (
    <select aria-label="Select currency">
      {currencies.map((code) => (
        <option key={code} value={code}>{code}</option>
      ))}
    </select>
  );
};

export default CurrencySelector;
