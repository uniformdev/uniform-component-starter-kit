import { NextConfig } from 'next';
import { withUniformConfig } from '@uniformdev/canvas-next-rsc/config';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

export default withUniformConfig(nextConfig);
