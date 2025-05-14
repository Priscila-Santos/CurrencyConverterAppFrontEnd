import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [base, setBase] = useState("BRL");
  const [target, setTarget] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState<number | null>(null);
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/currencies")
      .then((res) => setCurrencies(res.data))
      .catch(() => setError("Erro ao carregar moedas"));
  }, []);

  const convert = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/rate?base=${base}&target=${target}`
      );
      const conversionRate = res.data.rate;
      setRate(conversionRate);
      setConversionResult(amount * conversionRate);
      setError("");
    } catch {
      setError("Erro ao buscar taxa de câmbio");
      setRate(null);
      setConversionResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col items-center justify-center p-6 font-sans">
      <ThemeToggle />

      <h1 className="text-3xl font-bold mt-4 mb-8 text-center">Conversor de Moedas</h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md transition-colors duration-300">
        <div className="flex flex-col gap-4">
          <label htmlFor="amount-input" className="sr-only">Valor</label>
          <input
            id="amount-input"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              setConversionResult(null);
            }}
            placeholder="Digite o valor"
            className="p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:border-blue-500 transition-colors"
          />

          <div className="flex gap-2">
            <select
              aria-label="Moeda de origem"
              value={base}
              onChange={(e) => {
                setBase(e.target.value);
                setConversionResult(null);
              }}
              className="flex-1 p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>

            <select
              aria-label="Moeda de destino"
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
                setConversionResult(null);
              }}
              className="flex-1 p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-white transition-colors"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={convert}
              className="bg-blue-600 text-white px-4 py-2 rounded border-2 border-blue-600 hover:bg-blue-500 transition"
            >
              Converter
            </button>
          </div>

          <AnimatePresence>
            {conversionResult !== null && (
              <motion.p
                className="text-center text-lg mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {amount} {base} = <strong>{conversionResult.toFixed(2)}</strong> {target}
              </motion.p>
            )}
          </AnimatePresence>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-center mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
