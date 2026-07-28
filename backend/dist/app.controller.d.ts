import { Pool } from 'pg';
export declare class AppController {
    private readonly database;
    constructor(database: Pool);
    getHello(): string;
    testDatabase(): Promise<{
        connected: boolean;
        message: string;
        databaseTime: any;
    }>;
}
