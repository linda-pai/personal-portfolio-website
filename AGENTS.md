# linda-pai-portfolio

Personal portfolio website built with React + Vite + Tailwind CSS.

## Development

```sh
pnpm install
pnpm dev      # start the dev server
pnpm build    # production build to dist/
pnpm preview  # preview the production build
```

## Project Structure

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component
- `src/routes.tsx` - Page routes and content
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell (title and meta tags) loading `src/main.tsx`
- `public/` - Static assets (resume PDF)
- `vite.config.ts` - Vite configuration with React and Tailwind CSS v4 plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19, React DOM 19, React Router 7, lucide-react
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

Tailwind CSS v4 is configured through the `@tailwindcss/vite` plugin. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use utility classes directly in JSX and put global CSS or theme customization in `src/index.css`. No Tailwind or PostCSS config file is needed.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
