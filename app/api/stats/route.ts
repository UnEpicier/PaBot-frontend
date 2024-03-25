import { NextRequest } from 'next/server';
import GuildSchema from '@/schemas/guilds.schema';
import BanSchema from '@/schemas/bans.schema';
import KickSchema from '@/schemas/kicks.schema';
import TickettingSchema from '@/schemas/ticketting.schema';
import ConnectToRedis from '@/utils/redis';
import { connectToDB } from '@/utils/database';

export const GET = async (req: NextRequest) => {
	const redisClient = await ConnectToRedis();
	await connectToDB();

	// Check Redis connection
	if ((await redisClient.ping()) != 'PONG') {
		return new Response(
			JSON.stringify({
				status: 'ERROR',
				message: 'Redis is not connected',
			}),
			{
				status: 500,
			},
		);
	}

	const response: { [key: string]: Object | number } = {};

	// ---------------------------------------------------- Get Data -------------------------------------------------------
	// Servers count
	const redisServersCount = await redisClient.GET('servers');
	if (!redisServersCount) {
		try {
			const count = await GuildSchema.countDocuments();

			await redisClient.SET('servers', count, {
				EX: 60 * 60 * 12,
			});

			response['servers'] = count;
		} catch (error) {
			console.error(error);

			return new Response(
				JSON.stringify({
					error: 'Unable to count guilds documents.',
				}),
				{
					status: 500,
				},
			);
		}
	} else {
		response['servers'] = redisServersCount;
	}

	// Top 5 Guilds
	const topFiveGuilds = await redisClient.GET('topFiveGuilds');
	if (!topFiveGuilds) {
		try {
			const guilds = await GuildSchema.find()
				.sort({ guildMembersCount: -1 })
				.limit(5);

			await redisClient.SET('topFiveGuilds', JSON.stringify(guilds), {
				EX: 60 * 60 * 12,
			});

			response['topFiveGuilds'] = guilds;
		} catch (error) {
			console.error(error);

			return new Response(
				JSON.stringify({
					error: 'Unable to get top 5 guilds.',
				}),
				{
					status: 500,
				},
			);
		}
	} else {
		response['topFiveGuilds'] = JSON.parse(topFiveGuilds);
	}

	// Bans count
	const bansCount = await redisClient.GET('bans');
	if (!bansCount) {
		try {
			const count = await BanSchema.countDocuments();

			await redisClient.SET('bans', count, {
				EX: 60 * 60 * 12,
			});

			response['bans'] = count;
		} catch (error) {
			console.error(error);

			return new Response(
				JSON.stringify({
					error: 'Unable to count bans documents.',
				}),
				{
					status: 500,
				},
			);
		}
	} else {
		response['bans'] = bansCount;
	}

	// Kicks count
	const kickCount = await redisClient.GET('kicks');
	if (!kickCount) {
		try {
			const count = await KickSchema.countDocuments();

			await redisClient.SET('kicks', count, {
				EX: 60 * 60 * 12,
			});

			response['kicks'] = count;
		} catch (error) {
			console.error(error);

			return new Response(
				JSON.stringify({
					error: 'Unable to count kicks documents.',
				}),
				{
					status: 500,
				},
			);
		}
	} else {
		response['kicks'] = kickCount;
	}

	// Tickets count
	const ticketsCount = await redisClient.GET('tickets');
	if (!ticketsCount) {
		try {
			const count = await TickettingSchema.countDocuments();

			await redisClient.SET('tickets', count, {
				EX: 60 * 60 * 12,
			});

			response['tickets'] = count;
		} catch (error) {
			console.error(error);

			return new Response(
				JSON.stringify({
					error: 'Unable to count tickets documents.',
				}),
				{
					status: 500,
				},
			);
		}
	} else {
		response['tickets'] = ticketsCount;
	}

	return new Response(JSON.stringify(response), {
		status: 200,
	});
};
