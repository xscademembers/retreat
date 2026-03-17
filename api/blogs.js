import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'salsons';
const collectionName = 'blogs';

let cachedClient = null;

async function getDb() {
  if (cachedClient) {
    return cachedClient.db(dbName);
  }
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient.db(dbName);
}

function normalizePost(doc) {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    blocks: doc.blocks || [],
    featuredImage: doc.featuredImage || '',
    createdAt: doc.createdAt || new Date().toISOString(),
    published: !!doc.published,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const method = req.method || 'GET';

    if (method === 'GET') {
      const onlyPublished = req.query?.published === 'true';
      const filter = onlyPublished ? { published: true } : {};
      const docs = await collection.find(filter).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(docs.map(normalizePost));
    }

    if (method === 'POST' || method === 'PUT') {
      const body = req.body || {};

      const payload = {
        title: body.title,
        slug: body.slug,
        blocks: Array.isArray(body.blocks) ? body.blocks : [],
        featuredImage: body.featuredImage || '',
        createdAt: body.createdAt || new Date().toISOString(),
        published: !!body.published,
      };

      if (!payload.title || !payload.slug) {
        return res.status(400).json({ error: 'title and slug are required' });
      }

      let resultDoc;

      if (body.id) {
        // MongoDB driver v6+ returns the document directly from findOneAndUpdate
        resultDoc = await collection.findOneAndUpdate(
          { _id: new ObjectId(body.id) },
          { $set: payload },
          { returnDocument: 'after' }
        );
      } else {
        const insertResult = await collection.insertOne(payload);
        resultDoc = { _id: insertResult.insertedId, ...payload };
      }

      return res.status(200).json(normalizePost(resultDoc));
    }

    if (method === 'DELETE') {
      const id = req.query?.id;
      if (!id) {
        return res.status(400).json({ error: 'id query param is required' });
      }
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Blog API error:', err.message, err.stack);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
