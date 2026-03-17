const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'salsons';
const collectionName = 'blogs';

if (!uri) {
  console.warn('MONGODB_URI is not set. Blog API will fail until this is configured.');
}

let cachedClient = null;
let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return db;
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

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const slug = (req.query && (req.query.slug || req.query['slug'])) || null;

  if (!slug) {
    res.status(400).json({ error: 'slug is required' });
    return;
  }

  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const doc = await collection.findOne({ slug, published: true });
    if (!doc) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    const post = normalizePost(doc);
    res.status(200).json(post);
  } catch (err) {
    console.error('Blog slug API error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

