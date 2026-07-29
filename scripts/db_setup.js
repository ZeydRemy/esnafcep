import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = 'postgresql://postgres:kqgk7Q4tgSDZL7hM@db.mbenydtgxaogpkojnnbh.supabase.co:5432/postgres';

async function runSetup() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Supabase PostgreSQL veritabanına bağlanılıyor...');
    await client.connect();
    console.log('Bağlantı başarılı!');

    const sqlFilePath = path.join(__dirname, '../supabase_schema.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Şema ve seed verileri yükleniyor...');
    await client.query(sql);

    console.log('TEBRİKLER! Supabase veritabanınız ve 40+ Siirt kategorisi başarıyla oluşturuldu ve yüklendi!');
  } catch (err) {
    console.error('Veritabanı kurulum hatası:', err);
  } finally {
    await client.end();
  }
}

runSetup();
