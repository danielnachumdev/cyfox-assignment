import { Pool } from 'pg';
import { resetDatabase } from '../database/migrate';
import { seedDatabase } from '../database/seed';

// Test database configuration for Docker PostgreSQL
const testDbConfig = {
  host: process.env['TEST_DB_HOST'] || 'localhost',
  port: parseInt(process.env['TEST_DB_PORT'] || '5432'),
  database: process.env['TEST_DB_NAME'] || 'bug_tracker_test',
  user: process.env['TEST_DB_USER'] || 'postgres',
  password: process.env['TEST_DB_PASSWORD'] || 'postgres',
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

let testPool: Pool;

/**
 * Setup test database before all tests
 */
export async function setupTestDatabase(): Promise<void> {
  try {
    console.log('🧪 Setting up test database...');

    // Create test database pool
    testPool = new Pool(testDbConfig);

    // Override the main database connection for tests
    process.env['DB_HOST'] = testDbConfig.host;
    process.env['DB_PORT'] = testDbConfig.port.toString();
    process.env['DB_NAME'] = testDbConfig.database;
    process.env['DB_USER'] = testDbConfig.user;
    process.env['DB_PASSWORD'] = testDbConfig.password;

    // Reset and migrate database
    await resetDatabase();

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