import { MongoClient } from 'mongodb';

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.query?.slug;

  if (!slug) {
    return res.status(400).json({ error: 'slug is required' });
  }

  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const doc = await collection.findOne({ slug, published: true });

    if (!doc) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json(normalizePost(doc));
  } catch (err) {
    console.error('Blog slug API error:', err.message, err.stack);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
