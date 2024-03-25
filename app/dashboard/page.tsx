'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { useDiscordOAuth } from '@/app/dashboard/hooks/useDiscordOAuth';
import Arrow from '@/components/assets/arrow';
import '../globals.scss';
import './styles.scss';

const Dashboard = () => {
	const cookies = useCookies();
	const { isLogged } = useDiscordOAuth();

	const [servers, setServers] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const token = cookies.get('token');
		if (token) {
			(async () => {
				try {
					const response = await fetch(
						`${process.env.DISCORD_API}/users/@me/guilds`,
						{
							headers: {
								Authorization: token,
							},
						},
					);

					if (!response.ok) {
						setError('Cannot get your servers list');
						return;
					}

					const data: any[] = await response.json();

					const serversList = await Promise.all(
						data
							.filter(server => server.permissions & 0x20)
							.map(async partialServer => {
								partialServer.hasBotInServer = false;

								// Check if the bot is already in the server
								try {
									const apiResponse = await fetch(
										`/api/bot/guild?id=${partialServer.id}`,
									);

									const { guild } = await apiResponse.json();

									partialServer.hasBotInServer =
										guild !== null;

									partialServer.image =
										'https://cdn.discordapp.com/embed/avatars/1.png';
									if (partialServer.icon) {
										partialServer.image = `https://cdn.discordapp.com/icons/${partialServer.id}/${partialServer.icon}.${partialServer.icon.startsWith('a_') ? 'gif' : 'png'}`;
									}
								} catch (error) {
									console.error(error);
								}

								return partialServer;
							}),
					);

					setServers(serversList);
				} catch (error) {
					console.error(error);
				}
			})();
		}
	}, [cookies]);

	const onClick = (server: any) => {
		if (server.hasBotInServer) {
			location.replace(`/dashboard/${server.id}`);
			return;
		}

		const inviteUrl =
			process.env.NODE_ENV === 'production'
				? (process.env.INVITE_PROD ?? '').replaceAll('{%s}', server.id)
				: (process.env.INVITE_DEV ?? '').replaceAll('{%s}', server.id);

		window.open(inviteUrl, '', 'popup');
	};

	return (
		<div className='dashboard'>
			{isLogged ? (
				<>
					<h1 className={'title'}>Select a server</h1>
					<div className={'servers'}>
						{servers.map(server => {
							return (
								<div
									key={server.name}
									className={'server'}
								>
									<div className={'imageContainer'}>
										<Image
											src={server.image}
											alt={`${server.name} icon`}
											width={200}
											height={200}
											className={'icon'}
										/>
										<Image
											src={server.image}
											alt={`${server.name} icon`}
											width={200}
											height={200}
											className={'icon'}
										/>
									</div>
									<div className={'content'}>
										<div className={'infos'}>
											<p className={'name'}>
												{server.name}
											</p>
											<p className={'role'}>
												{server.owner
													? 'Owner'
													: 'Bot master'}
											</p>
										</div>
										<button
											className={`button ${server.hasBotInServer ? 'primary' : ''}`}
											onClick={() => onClick(server)}
										>
											<Arrow />
											{server.hasBotInServer
												? 'Go'
												: 'Invite'}
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<p className={'loading'}>Loading...</p>
			)}
		</div>
	);
};

export default Dashboard;
