import {db} from '../../lib/firebaseAdmin';

export default async (req, res) => {
    const snapshot = await db.collection('salary').get();
    const results = snapshot.docs.map(doc => doc.data());
    res.json(results);
};
