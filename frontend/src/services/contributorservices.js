import axios from "axios";
import { BASE_URL } from "../urls";
const client = axios.create(
    {
        baseURL: BASE_URL,
        headers:{
            Accept: 'application/json',
            post: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            put: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
    }
)

export async function getContributorIndex() {
    try {
        const { data, status } = await client.get('/contributor/contributor')
        console.log(status)
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

export async function createContributor(contributor) {
  try {
      // console.log("api", contributor)
      const { data, status } = await client.post('/contributor/contributor',
        contributor
      )
      console.log (status )
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

export async function updateContributor(contributor_id, contributor) {
  try {
      console.log("api", contributor_id)
      const { data, status } = await client.put(`/contributor/contributor/${contributor_id}`, contributor)
      console.log (status )
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

export async function deleteContributor(contributor_id) {
  try {
      // console.log("api", contributor)
      const { data, status } = await client.delete(`/contributor/contributor/${contributor_id}`)
      console.log (status )
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


