import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

const getRedisClient = async () => {
	if (!redisUrl) {
		throw new Error('REDIS_URL is not set');
	}

	const client = createClient({ url: redisUrl }).on('error', err =>
		console.log('Redis error: ', err),
	);

	await client.connect();

	return client;
};

export default getRedisClient;
