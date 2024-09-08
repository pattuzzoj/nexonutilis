import { db } from "@vercel/postgres";

export async function query(query, values = []) {
  const client = await db.connect();

  try {
    const queryResult = await client.query(query, values);
    return queryResult;
  } catch(error) {
    throw error;
  } finally {
    client.release();
  }
}