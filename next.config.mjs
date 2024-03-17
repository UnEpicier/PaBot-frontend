/** @type {import('next').NextConfig} */

const nextConfig = {
	sassOptions: {
		includePaths: [
			`${process.cwd()}/styles`,
			`${process.cwd()}/components`,
			`${process.cwd()}/app`,
		],
	},
	env: {
		API_URL: process.env.API_URL,
		OAUTH_URL_DEV: process.env.OAUTH_URL_DEV,
		OAUTH_URL_PROD: process.env.OAUTH_URL_PROD,
		CLIENT_ID: process.env.CLIENT_ID,
		CLIENT_SECRET: process.env.CLIENT_SECRET,
	},
};

export default nextConfig;
