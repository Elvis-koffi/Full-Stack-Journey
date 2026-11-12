(function(root){
'use strict';
const MAX=100000000000000;
const definitions=[
 ['Logement','home','#496c57',['Loyer','Eau','Électricité','Entretien']],
 ['Alimentation','basket','#9caf88',['Courses','Restaurants','Livraisons']],
 ['Transport','car','#e4b66e',['Carburant','Taxi / VTC','Transport en commun','Entretien du véhicule']],
 ['Télécommunications','wifi','#8b94b4',['Internet','Crédit téléphonique','Abonnements numériques']],
 ['Santé','heart','#d58c78',['Médicaments','Consultations','Assurance santé']],
 ['Loisirs et vie personnelle','sun','#b8a1c4',['Sorties','Shopping','Divertissement','Cadeaux']],
 ['Obligations financières','shield','#7eaaaa',['Remboursement de dettes','Aide familiale','Autres engagements']],
 ['Dépenses imprévues','bolt','#b39a7b',['Urgences','Réparations','Dépenses exceptionnelles']]
];
const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
const today=()=>new Date().toISOString().slice(0,10);
const shift=(m,n)=>{let [y,k]=m.split('-').map(Number);return new Date(Date.UTC(y,k-1+n,1)).toISOString().slice(0,7)};
const days=m=>new Date(Date.UTC(+m.slice(0,4),+m.slice(5,7),0)).getUTCDate();
function amount(v){
 const s=String(v).replace(/[\s\u00a0\u202f]/g,'').replace(',','.');
 if(!/^\d+(\.\d{1,2})?$/.test(s))throw Error('Saisissez un montant positif, avec deux décimales au maximum.');
 const parts=s.split('.');const n=Number(parts[0])*100+Number((parts[1]||'').padEnd(2,'0'));
 if(!Number.isSafeInteger(n)||n>MAX)throw Error('Ce montant est trop élevé.');return n;
}
function fresh(){return {version:1,demo:false,settings:{currency:'XOF',name:'',monthlyBudget:0,monthlyGoal:0,salaryPercent:20,annualGoal:0,openingCash:0,openingDate:today().slice(0,7)+'-01',initialSaved:0,buffer:0,priority:'Construire mon fonds d’urgence',theme:'light',framework:false},categories:definitions.map((c,i)=>({id:'c'+i,name:c[0],icon:c[1],color:c[2],sub:c[3],group:i===5?'want':'need'})),transactions:[],goals:[],budgets:{}}}
function ensureMonth(s,m){if(!s.budgets[m]){let before=Object.keys(s.budgets).filter(k=>k<m).sort().pop();s.budgets[m]=before?JSON.parse(JSON.stringify(s.budgets[before])):{total:s.settings.monthlyBudget,limits:{}}}return s.budgets[m]}
function validateTx(t,s){
 if(!['income','expense','saving','transfer'].includes(t.kind))throw Error('Type de mouvement invalide.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(t.date)||Number.isNaN(Date.parse(t.date))||new Date(t.date).toISOString().slice(0,10)!==t.date||t.date<'1900-01-01'||t.date>'2199-12-31')throw Error('La date saisie est invalide.');
 if(!Number.isSafeInteger(t.amount)||t.amount<=0||t.amount>MAX)throw Error('Le montant doit être strictement positif.');
 if(s.transactions.filter(x=>x.id!==t.id).reduce((a,x)=>a+x.amount,0)+t.amount>MAX)throw Error('Le total des mouvements dépasse la capacité de calcul autorisée.');
 if(!t.description?.trim()||t.description.length>160)throw Error('Indiquez un libellé de 1 à 160 caractères.');
 if(!['paid','planned'].includes(t.status))throw Error('Statut invalide.');
 if(!['fixed','variable','exceptional'].includes(t.type))throw Error('Nature invalide.');
 if(!['once','monthly','quarterly','yearly','weekly'].includes(t.frequency))throw Error('Fréquence invalide.');
 for(const k of ['sub','source','payment','notes','series'])if(t[k]!=null&&(typeof t[k]!=='string'||t[k].length>(k==='notes'?500:160)))throw Error('Un champ de mouvement est invalide.');
 if(t.recurringDay!=null&&(!Number.isInteger(t.recurringDay)||t.recurringDay<1||t.recurringDay>31))throw Error('Jour de récurrence invalide.');
 if(t.kind==='expense'&&!s.categories.some(c=>c.id===t.category))throw Error('Choisissez une catégorie valide.');
 if(t.goal&&!s.goals.some(g=>g.id===t.goal))throw Error('L’objectif choisi est introuvable.');
 if(s.transactions.some(x=>x.id!==t.id&&x.kind===t.kind&&x.date===t.date&&x.amount===t.amount&&x.category===t.category&&x.description.toLocaleLowerCase('fr').trim()===t.description.toLocaleLowerCase('fr').trim()))throw Error('Ce mouvement existe déjà : même date, libellé, type, catégorie et montant.');
 return t;
}
const sum=(a)=>a.reduce((s,t)=>s+t.amount,0);
function metrics(s,m){
 const tx=s.transactions.filter(t=>t.date.startsWith(m));const paid=tx.filter(t=>t.status==='paid');
 const income=sum(paid.filter(t=>t.kind==='income'));const expected=sum(tx.filter(t=>t.kind==='income'&&t.status==='planned'));
 const spent=sum(paid.filter(t=>t.kind==='expense'));const planned=sum(tx.filter(t=>t.kind==='expense'&&t.status==='planned'));
 const saved=sum(paid.filter(t=>t.kind==='saving'));const scheduledSaved=sum(tx.filter(t=>t.kind==='saving'&&t.status==='planned'));
 const fixed=sum(paid.filter(t=>t.kind==='income'&&t.type==='fixed'));
 const end=m+'-'+String(days(m)).padStart(2,'0');
 const history=s.transactions.filter(t=>t.date>=s.settings.openingDate&&t.date<=end&&t.status==='paid');
 const cash=(end>=s.settings.openingDate?s.settings.openingCash:0)+sum(history.filter(t=>t.kind==='income'))-sum(history.filter(t=>t.kind==='expense'||t.kind==='saving'));
 const reserve=s.settings.initialSaved+sum(s.transactions.filter(t=>t.date<=end&&t.status==='paid'&&t.kind==='saving'));
 const available=cash-planned-scheduledSaved;
 const budget=s.budgets[m]||{total:0,limits:{}};
 const totalBudget=budget.total;const committed=spent+planned;
 const byCategory=s.categories.map(c=>({...c,paid:sum(paid.filter(t=>t.kind==='expense'&&t.category===c.id)),spent:sum(tx.filter(t=>t.kind==='expense'&&t.category===c.id)),limit:budget.limits[c.id]||0})).sort((a,b)=>b.spent-a.spent);
 const essentials=byCategory.filter(c=>c.group==='need').reduce((a,c)=>a+c.spent,0);
 const capacity=Math.max(0,Math.min(income-committed-s.settings.buffer,available+saved));
 const salary=sum(paid.filter(t=>t.kind==='income'&&t.source==='Salaire principal (net)'));
 const desired=s.settings.monthlyGoal||Math.round(salary*s.settings.salaryPercent/100);
 const recommended=Math.max(0,Math.min(desired,capacity));
 return {tx,paid,income,expected,spent,planned,saved,scheduledSaved,fixed,variable:income-fixed,cash,available,reserve,totalBudget,committed,remaining:totalBudget-committed,rate:income?saved/income*100:0,surplus:income-spent,byCategory,essentials,capacity,recommended};
}
function goalValue(s,g,m){return g.initial+sum(s.transactions.filter(t=>t.kind==='saving'&&t.status==='paid'&&t.goal===g.id&&t.date.slice(0,7)<=m))}
function health(s,m){const q=metrics(s,m);if(!q.tx.length)return {score:null,label:'À découvrir',items:[]};const prev=metrics(s,shift(m,-1));const debt=q.byCategory.filter(c=>c.id==='c6').reduce((a,c)=>a+c.spent,0);const items=[{name:'Dépenses couvertes',ok:q.income>0&&q.committed<=q.income,detail:'Revenus reçus ≥ dépenses payées et prévues.'},{name:'Réserve de sécurité',ok:q.essentials>0&&q.reserve>=q.essentials*3,detail:'Épargne déclarée ≥ 3 mois de dépenses essentielles du mois. Repère indicatif.'},{name:'Engagements maîtrisés',ok:q.income>0&&debt<=q.income*.3,detail:'Obligations financières ≤ 30 % des revenus reçus. Repère indicatif, catégorie entière incluse.'},{name:'Épargne régulière',ok:q.saved>0&&prev.saved>0,detail:'Un versement d’épargne dans chacun des deux derniers mois.'}];const score=items.filter(i=>i.ok).length;return {score,label:score>=3?'Équilibre encourageant':score>=2?'À consolider':'Points à surveiller',items}}
function recurring(s,m){let created=0;const originals=s.transactions.filter(t=>t.date.slice(0,7)<m&&t.frequency!=='once').sort((a,b)=>a.date.localeCompare(b.date));const series=new Map();for(const t of originals)series.set(t.series||t.id,t);for(const [key,t] of series){const diff=(+m.slice(0,4)- +t.date.slice(0,4))*12 + +m.slice(5,7)- +t.date.slice(5,7);if(t.frequency==='quarterly'&&diff%3!==0||t.frequency==='yearly'&&diff%12!==0)continue;
 const recurringDay=t.recurringDay||+t.date.slice(8,10);
 let dates=[];if(t.frequency==='weekly'){let d=new Date(t.date+'T00:00:00Z');const first=new Date(m+'-01T00:00:00Z');while(d<first)d.setUTCDate(d.getUTCDate()+7);while(d.toISOString().startsWith(m)){dates.push(d.toISOString().slice(0,10));d.setUTCDate(d.getUTCDate()+7)}}else dates=[m+'-'+String(Math.min(recurringDay,days(m))).padStart(2,'0')];
 for(const date of dates){if(s.transactions.some(x=>(x.series||x.id)===key&&x.date===date))continue;const n={...t,id:uid(),date,status:'planned',series:key,recurringDay};try{validateTx(n,s);s.transactions.push(n);created++}catch{}}
 }return created}
function validateState(s){if(s?.version!==1||!Array.isArray(s.transactions)||!Array.isArray(s.categories)||!Array.isArray(s.goals)||!s.settings||!s.budgets)throw Error('Le fichier ne contient pas une sauvegarde compatible.');if(s.transactions.length>100000||s.categories.length>2000||s.goals.length>2000)throw Error('Le fichier dépasse la taille autorisée.');
 const base=fresh();s.settings={...base.settings,...s.settings};if(!['XOF','XAF','EUR','USD','GBP','CAD','MAD','GNF'].includes(s.settings.currency))throw Error('Devise inconnue.');for(const k of ['monthlyBudget','monthlyGoal','annualGoal','openingCash','initialSaved','buffer'])if(!Number.isSafeInteger(s.settings[k])||s.settings[k]<0||s.settings[k]>MAX)throw Error('Montant de paramètre invalide.');if(!/^\d{4}-\d{2}-\d{2}$/.test(s.settings.openingDate)||isNaN(Date.parse(s.settings.openingDate)))throw Error('Date initiale invalide.');if(s.settings.salaryPercent<0||s.settings.salaryPercent>100)throw Error('Pourcentage invalide.');
 for(const c of s.categories)if(typeof c.id!=='string'||typeof c.name!=='string'||!c.name.trim()||c.name.length>80||!Array.isArray(c.sub)||c.sub.some(v=>typeof v!=='string'||v.length>100)||!['need','want'].includes(c.group)||!/^#[0-9a-f]{6}$/i.test(c.color))throw Error('Catégorie invalide.');
 if(new Set(s.categories.map(c=>c.id)).size!==s.categories.length)throw Error('Catégories en double.');
 for(const g of s.goals)if(typeof g.id!=='string'||typeof g.name!=='string'||!g.name.trim()||g.name.length>100||!Number.isSafeInteger(g.target)||g.target<=0||!Number.isSafeInteger(g.initial)||g.initial<0||g.initial>g.target||g.deadline&&!/^\d{4}-\d{2}-\d{2}$/.test(g.deadline))throw Error('Objectif invalide.');
 if(new Set(s.goals.map(g=>g.id)).size!==s.goals.length)throw Error('Objectifs en double.');
 const seenIds=new Set(),signatures=new Set();let aggregate=0;for(const t of s.transactions){if(typeof t.id!=='string'||seenIds.has(t.id))throw Error('Identifiants de mouvement en double.');validateTx(t,{...s,transactions:[]});const sig=JSON.stringify([t.kind,t.date,t.amount,t.category,t.description.toLocaleLowerCase('fr').trim()]);if(signatures.has(sig))throw Error('Mouvements en double.');signatures.add(sig);seenIds.add(t.id);aggregate+=t.amount;if(aggregate>MAX)throw Error('Total des mouvements trop élevé.');}
 for(const [month,b] of Object.entries(s.budgets)){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)||!Number.isSafeInteger(b.total)||b.total<0||b.total>MAX||!b.limits||Object.values(b.limits).some(n=>!Number.isSafeInteger(n)||n<0||n>MAX))throw Error('Budget invalide.')}
 if(typeof s.settings.name!=='string'||s.settings.name.length>40||typeof s.settings.priority!=='string'||s.settings.priority.length>160||typeof s.settings.salaryPercent!=='number'||!Number.isFinite(s.settings.salaryPercent)||typeof s.demo!=='boolean'||!['light','dark'].includes(s.settings.theme))throw Error('Préférences invalides.');
 const validId=id=>/^[a-zA-Z0-9_-]{1,100}$/.test(id)&&!['__proto__','prototype','constructor'].includes(id);
 if(s.categories.some(c=>!validId(c.id))||s.goals.some(g=>!validId(g.id))||s.transactions.some(t=>!validId(t.id)))throw Error('Identifiant invalide.');
 if(new Date(s.settings.openingDate).toISOString().slice(0,10)!==s.settings.openingDate||s.goals.some(g=>g.deadline&&(isNaN(Date.parse(g.deadline))||new Date(g.deadline).toISOString().slice(0,10)!==g.deadline)))throw Error('Date invalide.');return s;}
function demo(m){const s=fresh();s.demo=true;s.settings={...s.settings,monthlyBudget:65000000,monthlyGoal:12000000,annualGoal:144000000,openingCash:5000000,initialSaved:16000000,buffer:5000000,openingDate:shift(m,-5)+'-01'};s.goals=[{id:'g1',name:'Fonds d’urgence',target:150000000,initial:16000000,deadline:shift(m,10)+'-01',icon:'shield'},{id:'g2',name:'Mon prochain voyage',target:60000000,initial:0,deadline:shift(m,8)+'-01',icon:'sun'}];
 for(let k=-5;k<=0;k++){const mo=shift(m,k);s.budgets[mo]={total:65000000,limits:{c0:22000000,c1:13000000,c2:7000000,c3:4000000,c4:3000000,c5:7000000,c6:6000000,c7:1000000}};const add=(day,kind,description,n,category='',type='variable',frequency='once',goal='')=>s.transactions.push({id:uid(),date:mo+'-'+String(day).padStart(2,'0'),kind,description,amount:n*100,category,type,frequency,goal,status:day>22&&k===0?'planned':'paid',payment:'Mobile money',source:kind==='income'?'Salaire principal (net)':'',sub:''});
 add(2,'income','Salaire principal',750000,'','fixed','monthly');add(12,'income','Mission de création',85000,'','variable');add(3,'expense','Loyer du mois',180000,'c0','fixed','monthly');add(5,'expense','Courses de la semaine',36000+k*1300,'c1');add(9,'expense','Internet et téléphone',24500,'c3','fixed','monthly');add(10,'expense','Trajets du mois',32000,'c2');add(14,'expense','Courses au marché',28500,'c1');add(16,'expense','Déjeuner entre amis',18000,'c1');add(19,'expense','Sortie du week-end',22000-k*800,'c5');add(20,'expense','Aide familiale',50000,'c6','fixed','monthly');add(21,'saving','Versement de sécurité',100000,'','fixed','monthly','g1');add(22,'saving','Épargne voyage',20000,'','variable','monthly','g2');add(26,'expense','Électricité',18500,'c0','variable','monthly');}
 return s;}
const api={uid,today,shift,days,amount,fresh,ensureMonth,validateTx,metrics,goalValue,health,recurring,validateState,demo,sum};root.Finance=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
