import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const app=initializeApp(firebaseConfig); const db=getFirestore(app);
function csv(rows){if(!rows.length)return ''; const keys=Object.keys(rows[0]).filter(k=>k!='updatedAt'); return [keys.join(','),...rows.map(r=>keys.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\n')}
window.downloadExcel=async()=>{let k=(await getDocs(collection(db,'kpis'))).docs.map(d=>d.data()); let a=(await getDocs(collection(db,'absot'))).docs.map(d=>d.data()); let content='KPI MASTER\n'+csv(k)+'\n\nABS OT\n'+csv(a); let blob=new Blob([content],{type:'text/csv'}); let link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='PE_3F_KPI_Data.csv'; link.click();};