// GitHub Pages has no server-side routing. Serving index.html as 404.html lets
// deep links such as /about or /insights/<post> load the app, which then routes.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Created dist/404.html for client-side routing')
