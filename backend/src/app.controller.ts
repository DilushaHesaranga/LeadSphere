import { Controller, Get, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { DATABASE_POOL } from './database/database.provider';

@Controller()
export class AppController {
  constructor(
    @Inject(DATABASE_POOL)
    private readonly database: Pool,
  ) {}

  @Get()
  getHello(): string {
    return 'LeadSphere backend is running';
  }

  @Get('database-test')
  async testDatabase() {
    const result = await this.database.query(
      'SELECT NOW() AS database_time',
    );

    return {
      connected: true,
      message: 'Supabase database connection successful',
      databaseTime: result.rows[0].database_time,
    };
  }
}