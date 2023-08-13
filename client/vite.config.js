import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginExternals from 'vite-plugin-externals';

export default defineConfig({
  plugins: [
    react(),
    // vitePluginExternals({
    //   externals: {
    //     'mock-aws-s3': 'commonjs mock-aws-s3',
    //     'aws-sdk': 'commonjs aws-sdk',
    //     'nock': 'commonjs nock'
    //   }
    // })
  ]
});
