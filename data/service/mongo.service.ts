import { Filter, Document, OptionalId, UpdateFilter } from 'mongodb';
import clientPromise from '../mongodb';

const getDB = async () => {
	const client = await clientPromise;
	return client.db(process.env.MONGODB_NAME);
};

export const getOne = async (collection: string, query: Filter<Document>) => {
	const db = await getDB();
	return db.collection(collection).findOne(query);
};

export const getAll = async (
	collection: string,
	query: Filter<Document>,
	options = undefined,
) => {
	const db = await getDB();
	return db.collection(collection).find(query, options).toArray();
};

export const insertOne = async (
	collection: string,
	query: OptionalId<Document>,
) => {
	const db = await getDB();
	return db.collection(collection).insertOne(query);
};

export const updateOne = async (
	collection: string,
	query: Filter<Document>,
	update: Document[] | UpdateFilter<Document>,
) => {
	const db = await getDB();
	return db.collection(collection).updateOne(query, update);
};
