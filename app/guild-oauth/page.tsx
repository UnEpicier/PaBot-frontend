'use client';

import { useEffect } from 'react';

const GuildOAuth = () => {
	useEffect(() => {
		(async () => {
			const guildId = new URLSearchParams(window.location.href).get(
				'guild_id',
			);

			if (guildId) {
				/**
				 * Fetch NextJS made API route to create a new document in MongoDB (avoiding getting a 404 on parent window load
				 */
				await fetch(`/api/bot/guild?id=${guildId}`, { method: 'POST' });

				window.opener.location.replace(`/dashboard/${guildId}`);
			}

			window.close();
		})();
	}, []);

	return <></>;
};

export default GuildOAuth;
