import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL }).on('error', err =>
	console.log('Redis error: ', err),
);

export default client;
