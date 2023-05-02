require('dotenv/config');
const envExample = require('fs').readFileSync('.env.example', 'utf8');

const requiredEnvs: string[] = envExample
  .split('\n')
  .filter((line: string) => line?.trim())
  .map((line: string) => line.split('=')[0])
  .filter((line: string) => line);

const missedVariables = requiredEnvs.filter(env => !process.env[env]);

if (missedVariables?.length) {
  console.error(`You are missing the following environment variables:
    \r${missedVariables.join('\n\r')}
    `);
  process.exit(1);
}
