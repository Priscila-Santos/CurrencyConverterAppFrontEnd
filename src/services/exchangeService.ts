import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export async function convertCurrency(from: string, to: string, amount: number): Promise<number> {
  const response = await axios.get(`${BASE_URL}/pair/${from}/${to}/${amount}`);
  return response.data.conversion_result;
}
