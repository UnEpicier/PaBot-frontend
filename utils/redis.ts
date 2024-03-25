import { createClient } from 'redis';

const REDIS_URI = process.env.REDIS_URI;

const ConnectToRedis = async () => {
	if (!REDIS_URI) {
		throw new Error('REDIS_URL is not set');
	}

	const client = createClient({ url: REDIS_URI }).on('error', err =>
		console.log('Redis error: ', err),
	);

	await client.connect();

	return client;
};

export default ConnectToRedis;
