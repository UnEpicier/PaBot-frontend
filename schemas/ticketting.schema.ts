const { Schema, model, models } = require('mongoose');

const TickettingSchema = new Schema(
    {
        guildId: {
            type: String,
            required: true,
        },
        ticketUser: {
            type: String,
            required: true,
        },
        channelId: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: true,
            default: 'opened',
            validate: {
                validator: (value: string) => {
                    return /^(opened|closed|deleted)$/.test(value);
                },
                message: 'Invalid status value',
            },
        },
    },
    {
        timestamps: true,
    },
);

const Ticketting = models.Ticketting || model('Ticketting', TickettingSchema);

export default Ticketting;
