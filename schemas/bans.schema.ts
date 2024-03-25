const { Schema, model, models } = require('mongoose');

const BanSchema = new Schema(
    {
        guildId: {
            type: String,
            required: true,
        },
        userBanned: {
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
        isActive: {
            type: Boolean,
            required: true,
        },
        unbanStaff: {
            type: String,
            required: false,
            default: null,
        },
        unbanReason: {
            type: String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const Ban = models.Ban || model('Ban', BanSchema);

export default Ban;
