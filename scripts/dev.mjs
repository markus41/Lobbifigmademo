#!/usr/bin/env node
/**
 * Development Server Script
 * Starts esbuild dev server with watch mode
 */

import { dev } from '../esbuild.config.mjs';

console.log('🚀 Starting development server...\n');

dev().catch((error) => {
  console.error('\n❌ Dev server failed:', error);
  process.exit(1);
});
