import axios from "axios";
import { SERVERLESS_URL } from "../urls";
const client = axios.create(
    {
        baseURL: SERVERLESS_URL,
        headers:{
            Accept: 'application/json',
          }
    }
)

export async function getMotherlessSearch(queryParams) {
    try {
        const { data, status } = await client.get('/contributor/contributor', {params: queryParams})
        // console.log(status, data)
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
