import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { connectToDB } from '@/utils/database';
import GuildsSchema from '@/schemas/guilds.schema';

export const GET = async (req: NextRequest) => {
	const guildId = req.nextUrl.searchParams.get('id');

	if (!guildId) {
		return new Response(
			JSON.stringify({
				error: 'Missing guild ID in request search params',
			}),
			{
				status: 400,
			},
		);
	}

	await connectToDB();

	try {
		const guild = await GuildsSchema.findOne({
			guildId: guildId,
		});
		return new Response(
			JSON.stringify({
				guild: guild,
			}),
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error: 'Unable to count guilds from database.',
			}),
			{
				status: 500,
			},
		);
	}
};

export const POST = async (req: NextRequest) => {
	const guildId = req.nextUrl.searchParams.get('id');

	if (!guildId) {
		return new Response(
			JSON.stringify({
				error: 'Missing guild ID in request search params',
			}),
			{
				status: 400,
			},
		);
	}

	let discordGuild;
	let guildChannels;
	let guildRoles;
	try {
		const guildResponse = await fetch(
			`${process.env.DISCORD_API}/guilds/${guildId}`,
		);
		discordGuild = await guildResponse.json();

		const channelsResponse = await fetch(
			`${process.env.DISCORD_API}/guilds/${guildId}/channels`,
		);

		guildChannels = await channelsResponse.json();
		console.log(guildChannels);
		guildChannels = guildChannels
			.filter((channel: any) => channel.type === 0)
			.map((channel: any) => ({
				id: channel.id,
				name: channel.name,
				nsfw: channel.nsfw,
			}));

		const rolesResponse = await fetch(
			`${process.env.DISCORD_API}/guilds/${guildId}/roles`,
		);
		guildRoles = (await rolesResponse.json()).map((role: any) => ({
			id: role.id,
			name: role.name,
			color: role.color,
		}));
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error: 'Unable to use Discord API',
			}),
			{
				status: 500,
			},
		);
	}

	const document = {
		guildId: guildId,
		guildPicture: discordGuild.icon
			? `https://cdn.discordapp.com/icons/${guildId}/${discordGuild.icon}.${discordGuild.icon.startsWith('a_') ? 'gif' : 'png'}`
			: 'https://cdn.discordapp.com/embed/avatars/1.png',
		guildName: discordGuild.name,
		channels: guildChannels,
		roles: guildRoles,
	};

	await connectToDB();

	try {
		const guild = await GuildsSchema.create(document);

		return new Response(`Successfully registered server ${guildId}`, {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error: 'Unable to count guilds from database.',
			}),
			{
				status: 500,
			},
		);
	}
};
