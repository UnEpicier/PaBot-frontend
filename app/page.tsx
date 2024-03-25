'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../public/assets/pabot-logo.png';
import './globals.scss';
import './styles.scss';

const Home = () => {
	const [stats, setStats] = useState<{
		servers: number;
		bans: number;
		kicks: number;
		tickets: number;
		topFiveGuilds: Array<{
			guildName: string;
			guildPicture: string;
		}>;
	}>({
		servers: 0,
		bans: 0,
		kicks: 0,
		tickets: 0,
		topFiveGuilds: [],
	});

	useEffect(() => {
		(async () => {
			const response = await fetch('/api/stats');

			const data = await response.json();

			console.log(data.topFiveGuilds);

			setStats(data);
		})();
	}, []);

	return (
		<>
			<div className='mainContainer'>
				<div className='container'>
					<div className='textContainer'>
						<h1 className='title'>The bot better than MEE6</h1>
						<h2 className='subtitle'>
							{' '}
							PaBot is a moderation, ticketting Discord Bot,
							simple to use and better than MEE6
						</h2>
						<div className='buttonContainer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 640 512'
							>
								<path d='M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z' />
							</svg>
							<a
								href='/dashboard'
								className='button'
							>
								Add to your server
							</a>
						</div>
					</div>
					<div className='imageContainer'>
						<Image
							src={Logo}
							alt='PaBot Logo'
							height={400}
							width={400}
							className='logo'
						/>
						<p className='serverStats'>
							{' '}
							Used by {stats.servers} servers
						</p>
					</div>
				</div>
			</div>
			<div className='stats'>
				<h1 className='title'>Performances</h1>
				<div className='statsContainer'>
					{stats ? (
						<>
							<div className='stat'>
								<p className='statValue'>{stats.bans}</p>
								<h2 className='statTitle'>Bans</h2>
							</div>
							<div className='stat'>
								<p className='statValue'>{stats.kicks}</p>
								<h2 className='statTitle'>Kicks</h2>
							</div>
							<div className='stat'>
								<p className='statValue'>{stats.tickets}</p>
								<h2 className='statTitle'>Tickets</h2>
							</div>
						</>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			<div className='guildsContainer'>
				<p className='title'>Our best servers</p>
				<div className='guilds'>
					{stats.topFiveGuilds.map(guild => (
						<div
							key={guild.guildName}
							className='guild'
						>
							<Image
								src={guild.guildPicture}
								alt={guild.guildName}
								width={100}
								height={100}
								className='logo'
							/>
							<p className='name'>{guild.guildName}</p>
						</div>
					))}
				</div>
			</div>
			<footer className='footer'>
				<p>
					School project made by GARCIA Luka, LAROUMANIE Gabriel,
					ROULLAND Roxanne & VASSEUR Alexis
				</p>
			</footer>
		</>
	);
};

export default Home;
