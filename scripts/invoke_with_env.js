const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const envPath = path.resolve(process.cwd(), '.env.local');
const env = { ...process.env };

try {
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Very basic parser that skips multiline values causing issues
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;

        const idx = line.indexOf('=');
        if (idx === -1) return; // Skip lines that aren't assignments

        let key = line.substring(0, idx).trim();
        let val = line.substring(idx + 1).trim();

        // Handle quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }

        // Only set if we found a valid key-value pair
        if (key && val) {
            env[key] = val;
        }
    });
} catch (e) {
    console.warn("Could not read .env.local:", e.message);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: node invoke_with_env.js <script>");
    process.exit(1);
}

console.log(`Starting ${args[0]} with env...`);

const child = spawn(process.execPath, args, {
    env,
    stdio: 'inherit'
});

child.on('close', (code) => {
    process.exit(code);
});
