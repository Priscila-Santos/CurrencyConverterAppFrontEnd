import axios from 'axios';

export async function fetchConversionRate(base: string, target: string): Promise<number> {
  const response = await axios.get(`/rate?base=${base}&target=${target}`);
  return response.data.rate;
}

export async function fetchAvailableCurrencies(): Promise<string[]> {
  const response = await axios.get('/currencies');
  return response.data.currencies;
}
