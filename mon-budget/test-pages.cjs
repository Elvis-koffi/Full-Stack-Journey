const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),F=require('./dist/finance.js');
const elements={app:{innerHTML:''},modal:{addEventListener(){},open:false},toast:{classList:{add(){},remove(){}}}};
const ctx={Finance:F,console,Intl,Date,Math,Set,Map,JSON,Number,String,Object,Array,Error,RegExp,globalThis:{},localStorage:{getItem(){return null},setItem(){}},document:{getElementById(id){return elements[id]||null},body:{classList:{toggle(){}}},addEventListener(){}},window:{addEventListener(){},scrollTo(){}},setTimeout,clearTimeout};vm.createContext(ctx);vm.runInContext(fs.readFileSync('./dist/app.js','utf8'),ctx);
for(const demo of [false,true]){if(demo)vm.runInContext('S=F.demo(month);',ctx);for(const page of ['dashboard','income','expense','budget','saving','analysis','simulator','calendar','reports','settings']){vm.runInContext(`page=${JSON.stringify(page)};render();`,ctx);assert.ok(elements.app.innerHTML.includes('Budget Perso'));assert.ok(!elements.app.innerHTML.includes('NaN'));assert.ok(!elements.app.innerHTML.includes('undefined'));console.log('✓ Vue '+page+' · '+(demo?'démonstration':'vide'))}}
assert.equal(vm.runInContext("parseCSV('\uFEFFDate;Libellé\\r\\n2026-10-02;\"Test; avec point-virgule\"\\r\\n').length",ctx),2);
assert.equal(vm.runInContext("parseCSV('Date;Libellé\\n2026-10-02;\"Deux\\nlignes\"')[1][1]",ctx),'Deux\nlignes');
assert.equal(vm.runInContext("csvCell('=1+1')",ctx),'"\'=1+1"');
console.log('20 rendus de pages et 3 contrôles CSV réussis.');
