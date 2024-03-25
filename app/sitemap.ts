import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://pabot-discord.vercel.app',
			lastModified: new Date(),
		},
	];
}
