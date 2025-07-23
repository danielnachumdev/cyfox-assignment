const net = require('net');

function testConnection(host, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();

        socket.setTimeout(2000);

        socket.on('connect', () => {
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve(false);
        });

        socket.on('error', () => {
            socket.destroy();
            resolve(false);
        });

        socket.connect(port, host);
    });
}

async function waitForDatabase() {
    const host = 'localhost';
    const port = 5433;

    console.log('⏳ Waiting for test database to be ready...');

    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
        const isReady = await testConnection(host, port);

        if (isReady) {
            console.log('✅ Test database is ready!');
            return;
        }

        attempts++;
        console.log(`Attempt ${attempts}/${maxAttempts}: Database not ready yet...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.error('❌ Test database failed to start within expected time');
    process.exit(1);
}

waitForDatabase().catch(error => {
    console.error('Error waiting for test database:', error);
    process.exit(1);
}); 