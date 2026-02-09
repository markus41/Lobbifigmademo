#!/usr/bin/env node
/**
 * Production Build Script
 * Uses esbuild to create optimized production bundle
 */

import { build } from '../esbuild.config.mjs';

console.log('🏗️  Building for production...\n');

build().then(() => {
  console.log('\n✅ Production build complete!');
  console.log('📦 Output directory: dist/');
}).catch((error) => {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
});
