import { Schema, model, models } from 'mongoose';

const GuildSchema = new Schema(
	{
		guildId: {
			type: String,
			required: true,
		},
		guildPicture: {
			type: String,
			required: true,
		},
		guildName: {
			type: String,
			required: true,
		},
		ticketsChannel: {
			type: String,
			required: false,
			default: null,
		},
		superAdminRoles: [String],
		adminRoles: [String],
		userRoles: [String],
		roles: [
			{
				id: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
			},
		],
		channels: [
			{
				id: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				nsfw: {
					type: Boolean,
					required: true,
					default: false,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

const Guild = models.Guild || model('Guild', GuildSchema);

export default Guild;
