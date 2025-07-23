const net = require('net');

/**
 * Wait for PostgreSQL database to be ready
 */
function waitForDatabase(host = 'localhost', port = 5432, maxAttempts = 30) {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        console.log(`⏳ Waiting for PostgreSQL at ${host}:${port}...`);

        const tryConnection = () => {
            attempts++;

            const socket = new net.Socket();

            socket.setTimeout(2000); // 2 second timeout

            socket.on('connect', () => {
                console.log('✅ PostgreSQL is ready!');
                socket.destroy();
                resolve();
            });

            socket.on('timeout', () => {
                socket.destroy();
                if (attempts >= maxAttempts) {
                    console.error(`❌ Timeout waiting for PostgreSQL after ${maxAttempts} attempts`);
                    reject(new Error('Database connection timeout'));
                } else {
                    console.log(`⏳ Attempt ${attempts}/${maxAttempts} - Retrying in 2 seconds...`);
                    setTimeout(tryConnection, 2000);
                }
            });

            socket.on('error', (err) => {
                if (attempts >= maxAttempts) {
                    console.error(`❌ Failed to connect to PostgreSQL after ${maxAttempts} attempts:`, err.message);
                    reject(err);
                } else {
                    console.log(`⏳ Attempt ${attempts}/${maxAttempts} - Retrying in 2 seconds...`);
                    setTimeout(tryConnection, 2000);
                }
            });

            socket.connect(port, host);
        };

        tryConnection();
    });
}

// Run if called directly
if (require.main === module) {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '5432');

    waitForDatabase(host, port)
        .then(() => {
            console.log('🚀 Database is ready for connections!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to connect to database:', error.message);
            process.exit(1);
        });
}

module.exports = { waitForDatabase }; 