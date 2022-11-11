
import { createClient } from 'redis'

const redisPort = process.env.REDIS_PORT || 6379
const    redisHost = process.env.REDIS_HOST || '127.0.0.1'
const    redisAuth = process.env.REDIS_AUTH || null

function onError (error) {
    console.error('Error in Redis client: ' + error.message)
    console.error(error.stack)
    console.log('Exiting now because of error in Redis client')
    // Our app doesn't work without DB. Exit.
    process.exit(1)
  };
  
 function onConnect() {
    console.log('Successfully connected to Redis ' + redisHost + ':' + redisPort)
  };

export const DEFAULT_EXPIRATION = 3600
export function createRedisClient() {
    const redisClient = createClient(redisPort, redisHost, {
        auth_pass: redisAuth
      })
      redisClient.on('error', onError)
      redisClient.on('connect', onConnect)
// const client = createClient(
//   {
//     socket: {
//       host: process.env.REDIS_HOST,
//       port: process.env.REDIS_PORT
//   },
//     password: process.env.REDIS_PASSWORD
//   }
// )
    return redisClient
}
