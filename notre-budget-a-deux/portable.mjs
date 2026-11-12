import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const output=path.resolve(process.argv[2]||'../../outputs');await mkdir(output,{recursive:true});
const core=(await readFile('dist/core.mjs','utf8')).replace(/^export /gm,'');
const app=(await readFile('dist/app.mjs','utf8')).replace(/^import .*?;\r?\n/,'');
const css=await readFile('dist/style.css','utf8');
let html=await readFile('dist/index.html','utf8');html=html.replace('<link rel="stylesheet" href="style.css">',()=>`<style>${css}</style>`).replace('<script type="module" src="app.mjs"></script>',()=>`<script type="module">${core}\n${app}</script>`);
await writeFile(path.join(output,'Notre-Budget-a-Deux.html'),html);console.log('Version autonome créée.');
