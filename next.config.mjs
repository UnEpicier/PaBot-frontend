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
	},
};

export default nextConfig;
