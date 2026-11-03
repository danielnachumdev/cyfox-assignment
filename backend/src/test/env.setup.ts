import dotenv from 'dotenv';
import path from 'path';

// Optional local overrides (gitignored). Existing process.env wins over the file.
dotenv.config({ path: path.join(__dirname, '../../.env.test') });

process.env['NODE_ENV'] = 'test';

// App pool (connection.ts) reads DB_*; setup.ts uses TEST_DB_* with the same defaults.
// Without these, missing .env.test falls back to bugtracker@5432 and CI/local tests fail.
const testHost = process.env['TEST_DB_HOST'] || 'localhost';
const testPort = process.env['TEST_DB_PORT'] || '5433';
const testName = process.env['TEST_DB_NAME'] || 'bugtracker_test';
const testUser = process.env['TEST_DB_USER'] || 'bugtracker_test';
const testPassword = process.env['TEST_DB_PASSWORD'] || 'bugtracker_test';

process.env['TEST_DB_HOST'] = testHost;
process.env['TEST_DB_PORT'] = testPort;
process.env['TEST_DB_NAME'] = testName;
process.env['TEST_DB_USER'] = testUser;
process.env['TEST_DB_PASSWORD'] = testPassword;

process.env['DB_HOST'] = testHost;
process.env['DB_PORT'] = testPort;
process.env['DB_NAME'] = testName;
process.env['DB_USER'] = testUser;
process.env['DB_PASSWORD'] = testPassword;

// Prefer discrete DB_* over a leftover docker/dev DATABASE_URL.
delete process.env['DATABASE_URL'];
