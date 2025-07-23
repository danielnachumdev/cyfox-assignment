const fs = require('fs');
const path = require('path');

/**
 * Copy migration files from src to dist directory
 */
function copyMigrations() {
    const srcDir = path.join(__dirname, '../src/database/migrations');
    const destDir = path.join(__dirname, '../dist/database/migrations');

    try {
        // Create destination directory if it doesn't exist
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
            console.log('✅ Created directory:', destDir);
        }

        // Check if source directory exists
        if (!fs.existsSync(srcDir)) {
            console.log('⚠️  Source migrations directory not found:', srcDir);
            return;
        }

        // Get all .sql files from source directory
        const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.sql'));

        if (files.length === 0) {
            console.log('⚠️  No .sql migration files found in:', srcDir);
            return;
        }

        // Copy each migration file
        let copiedCount = 0;
        files.forEach(file => {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(destDir, file);

            fs.copyFileSync(srcFile, destFile);
            console.log(`📄 Copied: ${file}`);
            copiedCount++;
        });

        console.log(`✅ Successfully copied ${copiedCount} migration files to: ${destDir}`);

    } catch (error) {
        console.error('❌ Error copying migration files:', error.message);
        process.exit(1);
    }
}

/**
 * Copy health.js file from src to dist directory
 */
function copyHealthFile() {
    const srcHealthFile = path.join(__dirname, '../src/health.js');
    const destHealthFile = path.join(__dirname, '../dist/health.js');

    try {
        if (fs.existsSync(srcHealthFile)) {
            fs.copyFileSync(srcHealthFile, destHealthFile);
            console.log('📄 Copied: health.js');
        } else {
            console.log('⚠️  health.js file not found in src directory');
        }
    } catch (error) {
        console.error('❌ Error copying health.js file:', error.message);
        process.exit(1);
    }
}

/**
 * Copy all necessary files from src to dist directory
 */
function copyAllFiles() {
    console.log('🚀 Starting file copy process...');
    copyMigrations();
    copyHealthFile();
    console.log('✅ File copy process completed');
}

// Run the script if called directly
if (require.main === module) {
    copyAllFiles();
}

module.exports = { copyMigrations, copyHealthFile, copyAllFiles }; 