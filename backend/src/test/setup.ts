import { Pool } from 'pg';
// import { resetDatabase } from '../database/migrate';
import { seedDatabase } from '../database/seed';
import fs from 'fs';
import path from 'path';

// Test database configuration for Docker PostgreSQL
const testDbConfig = {
  host: process.env['TEST_DB_HOST'] || 'localhost',
  port: parseInt(process.env['TEST_DB_PORT'] || '5433'),
  database: process.env['TEST_DB_NAME'] || 'bugtracker_test',
  user: process.env['TEST_DB_USER'] || 'bugtracker_test',
  password: process.env['TEST_DB_PASSWORD'] || 'bugtracker_test',
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let testPool: Pool;

/**
 * Reset database with custom configuration
 */
async function resetDatabaseWithConfig(config: any): Promise<void> {
  const pool = new Pool(config);

  try {
    console.log('🔄 Resetting test database...');

    // Drop all tables
    await pool.query(`
      DROP TABLE IF EXISTS bugs CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS migrations CASCADE;
    `);

    console.log('🗑️  Dropped all tables');

    // Create migrations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Run migrations
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const filename of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, filename), 'utf8');

      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [filename]
        );
        await client.query('COMMIT');
        console.log(`✅ Executed migration: ${filename}`);
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Failed to execute migration: ${filename}`);
        throw error;
      } finally {
        client.release();
      }
    }

    console.log('✅ Test database reset completed');
  } catch (error) {
    console.error('💥 Test database reset failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

/**
 * Setup test database before all tests
 */
export async function setupTestDatabase(): Promise<void> {
  try {
    console.log('🧪 Setting up test database...');

    // Create test database pool
    testPool = new Pool(testDbConfig);

    // Reset and migrate database using test configuration
    await resetDatabaseWithConfig(testDbConfig);

    console.log('✅ Test database setup complete');
  } catch (error) {
    console.error('❌ Test database setup failed:', error);
    throw error;
  }
}

/**
 * Cleanup test database after all tests
 */
export async function teardownTestDatabase(): Promise<void> {
  try {
    console.log('🧹 Cleaning up test database...');

    if (testPool) {
      await testPool.end();
    }

    console.log('✅ Test database cleanup complete');
  } catch (error) {
    console.error('❌ Test database cleanup failed:', error);
    throw error;
  }
}

/**
 * Clear all data between tests
 */
export async function clearTestData(): Promise<void> {
  if (testPool) {
    await testPool.query('TRUNCATE TABLE bugs, projects RESTART IDENTITY CASCADE');
  }
}

/**
 * Seed test data
 */
export async function seedTestData(): Promise<void> {
  await seedDatabase();
}

/**
 * Create test project
 */
export async function createTestProject(name: string = 'Test Project'): Promise<{ id: number; name: string }> {
  if (!testPool) {
    throw new Error('Test database not initialized');
  }

  const result = await testPool.query(
    'INSERT INTO projects (name) VALUES ($1) RETURNING id, name',
    [name]
  );

  return result.rows[0];
}

/**
 * Create test bug
 */
export async function createTestBug(
  projectId: number,
  bugData: {
    title?: string;
    description?: string;
    severity?: string;
    status?: string;
  } = {}
): Promise<{ id: number; projectId: number; title: string; description: string; severity: string; status: string }> {
  if (!testPool) {
    throw new Error('Test database not initialized');
  }

  const {
    title = 'Test Bug',
    description = 'Test bug description',
    severity = 'medium',
    status = 'open',
  } = bugData;

  const result = await testPool.query(
    `INSERT INTO bugs (project_id, title, description, severity, status) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, project_id as "projectId", title, description, severity, status`,
    [projectId, title, description, severity, status]
  );

  return result.rows[0];
}