import mongoose from 'mongoose';

const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (mongoose.connection.readyState === 1) return;

	try {
		await mongoose.connect(process.env.MONGO_URI || '', {
			dbName: process.env.MONGO_DB,
		});

		mongoose.Schema.Types.String.checkRequired(v => v != null);
	} catch (error) {
		console.error(error);
	}
};

export { connectToDB };
