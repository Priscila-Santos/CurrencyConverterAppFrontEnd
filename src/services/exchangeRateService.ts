import axios from 'axios';

export async function fetchConversionRate(base: string, target: string): Promise<number> {
  const response = await axios.get(`http://localhost:8080/rate?base=${base}&target=${target}`);
  return response.data.rate;
}
