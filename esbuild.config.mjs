/**
 * esbuild Configuration for The Lobbi Demo
 * 
 * Replaces Vite with minimal esbuild setup for React 18 + TypeScript + Emotion (Chakra UI)
 */

import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;

/**
 * Plugin to handle @ alias resolution
 */
const aliasPlugin = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^@\// }, args => {
      const importPath = args.path.slice(2); // Remove '@/'
      const srcPath = path.resolve(__dirname, 'src', importPath);
      
      // Try different extensions if the path doesn't exist
      const extensions = ['/index.ts', '/index.tsx', '.ts', '.tsx', '.js', '.jsx', ''];
      
      for (const ext of extensions) {
        const fullPath = srcPath + ext;
        if (fs.existsSync(fullPath)) {
          return { path: fullPath };
        }
      }
      
      // If not found, return the original path
      return { path: srcPath };
    });
  }
}

/**
 * Plugin to update HTML with correct script path and inject CSS
 */
const htmlPlugin = {
  name: 'html',
  setup(build) {
    build.onEnd(async () => {
      const indexPath = path.join(__dirname, 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf8');
        
        // Use base path only in production for GitHub Pages
        const basePath = isProduction ? '/Lobbifigmademo/' : '/';
        
        // Update script src to include base path
        html = html.replace('src="main.js"', `src="${basePath}main.js"`);
        
        // Inject CSS link in head if main.css exists
        if (fs.existsSync(path.join(__dirname, 'dist', 'main.css'))) {
          html = html.replace(
            '</head>',
            `  <link rel="stylesheet" href="${basePath}main.css">\n  </head>`
          );
        }
        fs.writeFileSync(indexPath, html);
      }
    });
  }
};

/**
 * Common build options
 */
export const buildOptions = {
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  sourcemap: isDev,
  minify: isProduction,
  target: ['es2020', 'chrome90', 'firefox90', 'safari14'],
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.svg': 'file',
    '.gif': 'file',
    '.webp': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
  },
  plugins: [
    aliasPlugin,
    sassPlugin(),
    copy({
      resolveFrom: 'cwd',
      assets: [
        {
          from: ['public/**/*'],
          to: ['dist'],
        },
        {
          from: ['index.html'],
          to: ['dist/index.html'],
        },
      ],
      watch: isDev,
    }),
    htmlPlugin,
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
  },
  jsx: 'automatic',
  jsxDev: isDev,
  jsxImportSource: '@emotion/react',
  publicPath: isProduction ? '/Lobbifigmademo/' : '/',
  assetNames: 'assets/[name]-[hash]',
};

/**
 * Build for production
 */
export async function build() {
  try {
    // Clean dist folder
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    await esbuild.build(buildOptions);
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

/**
 * Start development server with watch mode
 */
export async function dev() {
  try {
    const ctx = await esbuild.context({
      ...buildOptions,
      sourcemap: true,
      minify: false,
    });

    await ctx.watch();
    
    const { host, port } = await ctx.serve({
      servedir: 'dist',
      port: 5173,
      host: 'localhost',
    });

    console.log(`🚀 Dev server running at http://${host}:${port}/Lobbifigmademo/`);
  } catch (error) {
    console.error('❌ Dev server failed:', error);
    process.exit(1);
  }
}
