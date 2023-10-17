import fs from 'fs';
import path from 'path';
import os from 'os';
import { execPromise } from '../utils';
import { execSync } from 'child_process';

export const isNodeModulesExist = (projectPath: string) => {
  return fs.existsSync(path.join(projectPath, 'node_modules'));
};

export const isMetaDataExist = () => {
  return fs.existsSync(path.resolve('', 'metadata.txt'));
};

export const parseMetadata = async () => {
  const metadata = await fs.promises.readFile(path.resolve('', 'metadata.txt'), 'utf-8');

  return JSON.parse(metadata);
};

export const isProjectExist = (projectPath: string) => {
  return fs.existsSync(projectPath);
};

export const parseEnvFile = async (envFilePath: string) => {
  if (!fs.existsSync(envFilePath)) {
    return {};
  }
  const envFileContent = await fs.promises.readFile(envFilePath, 'utf-8');
  const envFileLines = envFileContent.split('\n');

  return envFileLines.reduce<Record<string, string>>((acc, line) => {
    if (line.trim() !== '' && line.indexOf('=') !== -1) {
      const parts = line.split('=');
      const key = parts[0].trim();
      const value = parts[1].trim();

      return { ...acc, [key]: value };
    }
    return acc;
  }, {});
};

export const fillEnvFiles = async (
  destination: string,
  apiKey: string,
  projectApi: string,
  uniformCliBaseUrl: string,

  uniformEdgeApiHost: string,
  additionalEnvData?: Record<string, string>
) => {
  const envExampleContent = await parseEnvFile(path.join(destination, '.env.example'));

  const additionalEnvs = additionalEnvData
    ? Object.entries(additionalEnvData)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
    : '';

  fs.writeFileSync(
    path.join(destination, '.env'),
    `UNIFORM_API_KEY=${apiKey}\nUNIFORM_PROJECT_ID=${projectApi}\nUNIFORM_CLI_BASE_URL=${uniformCliBaseUrl}\nUNIFORM_CLI_BASE_EDGE_URL=${uniformEdgeApiHost}\nUNIFORM_PREVIEW_SECRET=${
      envExampleContent?.['UNIFORM_PREVIEW_SECRET'] || 'javadrip'
    }\n${additionalEnvs}`
  );
};

export const getExistDemoPath = (destination: string, project: string) => {
  return path.join(os.homedir(), destination, project);
};

export const installDependencies = (projectPath: string) => {
  return execPromise(`cd ${projectPath} && npm install`);
};

export const buildDemo = (projectPath: string) => {
  return execPromise(`cd ${projectPath} && npm run build`);
};

export const runDemo = (projectPath: string) => {
  return execSync(`cd ${projectPath} && npm run start`, { stdio: 'inherit' });
};

export const runPush = (projectPath: string) => {
  return execPromise(`cd ${projectPath} && npm run uniform:push && npm run uniform:publish`);
};

export const installPackages = (projectPath: string, packages: string[]) => {
  return execPromise(`cd ${projectPath} && npm i ${packages.join(' ')}`);
};

export const fixEslint = (projectPath: string) => {
  return execPromise(`cd ${projectPath} && npm run lint:fix`);
};
