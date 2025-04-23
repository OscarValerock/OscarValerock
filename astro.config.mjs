// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()]
	},

  integrations: [react()], 
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math', 'pq', '', 'python'],
    },
    rehypePlugins: [rehypeMermaid],
  },
});