const { MongoClient, ObjectId } = require('mongodb');

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

  const method = req.method || 'GET';

  try {
    const db = await getDb();
    const collection = db.collection(collectionName);

    if (method === 'GET') {
      // Optional query ?published=true
      const onlyPublished = req.query && req.query.published === 'true';
      const filter = onlyPublished ? { published: true } : {};
      const docs = await collection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray();
      const posts = docs.map(normalizePost);
      res.status(200).json(posts);
      return;
    }

    if (method === 'POST' || method === 'PUT') {
      const body = req.body || {};
      const nowIso = new Date().toISOString();

      const payload = {
        title: body.title,
        slug: body.slug,
        blocks: Array.isArray(body.blocks) ? body.blocks : [],
        featuredImage: body.featuredImage || '',
        createdAt: body.createdAt || nowIso,
        published: !!body.published,
      };

      if (!payload.title || !payload.slug) {
        res.status(400).json({ error: 'title and slug are required' });
        return;
      }

      let resultDoc;

      if (body.id) {
        const _id = new ObjectId(body.id);
        const result = await collection.findOneAndUpdate(
          { _id },
          { $set: payload },
          { returnDocument: 'after', upsert: false }
        );
        resultDoc = result && result.value;
      } else {
        const result = await collection.insertOne(payload);
        resultDoc = { _id: result.insertedId, ...payload };
      }

      const post = normalizePost(resultDoc);
      res.status(200).json(post);
      return;
    }

    if (method === 'DELETE') {
      const { id } = req.query || {};
      if (!id) {
        res.status(400).json({ error: 'id is required' });
        return;
      }
      const _id = new ObjectId(id);
      await collection.deleteOne({ _id });
      res.status(204).end();
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Blog API error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

