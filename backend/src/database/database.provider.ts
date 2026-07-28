import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export const DATABASE_POOL = 'DATABASE_POOL';

export const databaseProvider = {
  provide: DATABASE_POOL,

  inject: [ConfigService],

  useFactory: async (configService: ConfigService): Promise<Pool> => {
    const connectionString =
      configService.getOrThrow<string>('DATABASE_URL');

    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const client = await pool.connect();
    client.release();

    console.log('Connected to Supabase PostgreSQL');

    return pool;
  },
};