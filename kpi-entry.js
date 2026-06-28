import { firebaseConfig } from './firebase-config.js';
import { KPI_MASTER } from './kpi-master.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, serverTimestamp, onSnapshot, query, where } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const app = initializeApp(firebaseConfig); const auth = getAuth(app); const db = getFirestore(app);
const msg = document.getElementById('msg');
document.getElementById('logoutBtn')?.addEventListener('click',()=>signOut(auth).then(()=>location.href='index.html'));
onAuthStateChanged(auth, u => { if(!u) location.href='index.html'; });

const table = document.getElementById('kpiEntryTable');
const monthSelect = document.getElementById('monthSelect');
function safeId(s){ return s.replace(/[^a-zA-Z0-9]/g,'_'); }
function rowHtml(k, i){ const id=safeId(k.area+'_'+k.parameter); return `<tr data-id="${id}" data-area="${k.area}" data-parameter="${k.parameter}"><td class='area'>${k.area}</td><td class='param'>${k.parameter}</td><td>${k.target102}</td><td>${k.monthTarget}</td><td>${k.freq}</td><td><input class='actual' type='number' step='any' placeholder='Actual'></td><td><select class='trend'><option>→</option><option>↗</option><option>↘</option></select></td><td><select class='judgt'><option>○</option><option>■</option><option>▲</option><option>◎</option><option>□</option></select></td><td><input class='remarks' placeholder='Remarks'></td></tr>`; }
function render(){ table.innerHTML = `<tr><th>Area</th><th>Parameter / Requirement</th><th>102Ki Target</th><th>Month Target</th><th>Freq</th><th>${monthSelect.value} Actual</th><th>Trend</th><th>Judgt</th><th>Remarks</th></tr>` + KPI_MASTER.map(rowHtml).join(''); }
async function loadMonth(){ render(); msg.textContent='Loading saved data...'; const m=monthSelect.value; for(const tr of table.querySelectorAll('tr[data-id]')){ const snap=await getDoc(doc(db,'kpis',`${m}_${tr.dataset.id}`)); if(snap.exists()){ const d=snap.data(); tr.querySelector('.actual').value=d.actual ?? ''; tr.querySelector('.trend').value=d.trend ?? '→'; tr.querySelector('.judgt').value=d.judgt ?? '○'; tr.querySelector('.remarks').value=d.remarks ?? ''; }} msg.textContent='Month data loaded.'; }
async function saveAll(){ const user=auth.currentUser; if(!user){msg.textContent='Login required';return;} msg.textContent='Saving...'; const m=monthSelect.value; let count=0; for(const tr of table.querySelectorAll('tr[data-id]')){ const actual=tr.querySelector('.actual').value; const remarks=tr.querySelector('.remarks').value; const payload={month:m, area:tr.dataset.area, parameter:tr.dataset.parameter, actual: actual===''?'':Number(actual), trend:tr.querySelector('.trend').value, judgt:tr.querySelector('.judgt').value, remarks, updatedBy:user.email, updatedAt:serverTimestamp()}; await setDoc(doc(db,'kpis',`${m}_${tr.dataset.id}`), payload, {merge:true}); count++; } msg.textContent=`Saved ${count} KPI rows successfully.`; }
document.getElementById('loadMonthBtn').addEventListener('click', loadMonth); document.getElementById('saveAllBtn').addEventListener('click', saveAll); render(); setTimeout(loadMonth, 800);
