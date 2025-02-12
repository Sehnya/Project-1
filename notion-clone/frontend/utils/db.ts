const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://sehnyaw:<Serena11052017!>@firstproject.egb50.mongodb.net/?retryWrites=true&w=majority&appName=firstProject';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db();
const usersCollection = db.collection('users');

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  }
}

run();

// Example CRUD operations
async function createUser(user: any) {
  /* ... */
}
async function readUsers() {
  /* ... */
}
async function updateUser(id: string, updates: any) {
  /* ... */
}
async function deleteUser(id: string) {
  /* ... */
}
