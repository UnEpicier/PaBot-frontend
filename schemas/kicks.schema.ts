const { Schema, model, models } = require('mongoose');

const KickSchema = new Schema(
    {
        guildId: {
            type: String,
            required: true,
        },
        userKicked: {
            type: String,
            required: true,
        },
        userStaff: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Kick = models.Kick || model('Kick', KickSchema);

export default Kick;