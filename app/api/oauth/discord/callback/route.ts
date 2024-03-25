import { NextRequest, NextResponse } from 'next/server';
import { Env } from '@next/env';
import axios, { AxiosError } from 'axios';
import { strict } from 'node:assert';

export const GET = async (req: NextRequest) => {
	const code = req.nextUrl.searchParams.get('code');

	if (!code) {
		return new Response(
			JSON.stringify({ error: 'Any code provided in query URL.' }),
			{
				status: 422,
			},
		);
	}

	const env: Env = {
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
		REDIRECT_URI:
			process.env.NODE_ENV === 'production'
				? process.env.REDIRECT_URI_PROD
				: process.env.REDIRECT_URI_DEV,
	};

	if (Object.keys(env).some(x => env[x] === undefined)) {
		console.error(
			'One or multiple env variables are missing/undefined from your .env file.',
		);
		return new Response('Failed to login', {
			status: 500,
		});
	}

	const params = new URLSearchParams({
		code: code,
		grant_type: 'authorization_code',
		redirect_uri: env.REDIRECT_URI as string,
		client_id: env.CLIENT_ID as string,
		client_secret: env.CLIENT_SECRET as string,
	});

	try {
		const response = await axios.post(
			'https://discord.com/api/v10/oauth2/token',
			params,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);

		const destination = new URL('/dashboard', new URL(req.url).origin);
		const redirectResponse = NextResponse.redirect(destination);

		redirectResponse.cookies.set(
			'token',
			`${response.data.token_type} ${response.data.access_token}`,
			{
				path: '/',
				maxAge: response.data.expires_in,
				sameSite: 'strict',
			},
		);

		return redirectResponse;
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				status: error.response.status,
				statusTest: error.response.statusText,
				...error.response.data,
			}),
			{
				status: error.response.status,
			},
		);
	}
};
