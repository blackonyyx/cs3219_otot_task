import axios from "axios";
import { BASE_URL } from "./urls";
const client = axios.create(
    {
        baseURL: BASE_URL,
        headers:{
            Accept: 'application/json',
          }
    }
)

export default async function getIndex() {
    try {
        const { data, status } = await client.get('/contributor/contributor')
        console.log(status)
        console.log(JSON.stringify(data, null, 4))
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}