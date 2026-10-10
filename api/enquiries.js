import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'salsons';
const collectionName = 'enquiries';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

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

function normalizeEnquiry(doc) {
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    source: doc.source || 'unknown',
    name: doc.name || '',
    phone: doc.phone || '',
    company: doc.company || '',
    details: doc.details || {},
    message: doc.message || '',
    createdAt: doc.createdAt || new Date().toISOString(),
  };
}

function isAuthorized(req) {
  const headerPassword = req.headers?.['x-admin-password'];
  const queryPassword = req.query?.password;
  const provided = headerPassword || queryPassword || '';
  return provided === ADMIN_PASSWORD;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const method = req.method || 'GET';

    if (method === 'GET') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const source = req.query?.source;
      const filter = source ? { source } : {};
      const docs = await collection.find(filter).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(docs.map(normalizeEnquiry));
    }

    if (method === 'POST') {
      const body = req.body || {};
      const source = body.source === 'garden' ? 'garden' : 'booking';

      const payload = {
        source,
        name: String(body.name || '').trim(),
        phone: String(body.phone || '').trim(),
        company: String(body.company || '').trim(),
        details: body.details && typeof body.details === 'object' ? body.details : {},
        message: String(body.message || '').trim(),
        createdAt: new Date().toISOString(),
      };

      if (!payload.name && !payload.phone) {
        return res.status(400).json({ error: 'name or phone is required' });
      }

      const insertResult = await collection.insertOne(payload);
      return res.status(200).json(
        normalizeEnquiry({ _id: insertResult.insertedId, ...payload })
      );
    }

    if (method === 'DELETE') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const id = req.query?.id;
      if (!id) {
        return res.status(400).json({ error: 'id query param is required' });
      }
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Enquiries API error:', err.message, err.stack);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
