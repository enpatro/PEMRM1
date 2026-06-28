import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, collection, doc, setDoc, getDocs, serverTimestamp, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const app=initializeApp(firebaseConfig); const auth=getAuth(app); const db=getFirestore(app);
window.login=async()=>{try{await signInWithEmailAndPassword(auth,email.value,password.value); location.href='dashboard.html'}catch(e){msg.innerText=e.message}};
window.resetPassword=async()=>{try{await sendPasswordResetEmail(auth,email.value); msg.innerText='Reset link sent to mail'}catch(e){msg.innerText=e.message}};
window.logout=()=>signOut(auth).then(()=>location.href='index.html');
window.saveKpi=async()=>{let id=`${month.value}_${area.value}_${parameter.value}`.replaceAll('/','-'); await setDoc(doc(db,'kpis',id),{area:area.value,parameter:parameter.value,target102:target102.value,monthTarget:monthTarget.value,month:month.value,actual:Number(actual.value),trend:trend.value,remarks:remarks.value,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email},{merge:true}); msg.innerText='Saved successfully'};
window.saveAbsOt=async()=>{let id=`${month.value}_${dept.value}`; await setDoc(doc(db,'absot',id),{month:month.value,dept:dept.value,overallAbs:Number(overallAbs.value),jeAbs:Number(jeAbs.value),laAbs:Number(laAbs.value),casAbs:Number(casAbs.value),overallOt:Number(overallOt.value),jeOt:Number(jeOt.value),laOt:Number(laOt.value),casOt:Number(casOt.value),remarks:remarks.value,updatedAt:serverTimestamp(),updatedBy:auth.currentUser?.email},{merge:true}); msg.innerText='Saved successfully'};
window.saveUserRole=async()=>{await setDoc(doc(db,'roles',userEmail.value),{email:userEmail.value,role:role.value,dept:dept.value,updatedAt:serverTimestamp()},{merge:true}); msg.innerText='Role saved'};
function renderTable(id, rows){let t=document.getElementById(id); if(!t)return; if(!rows.length){t.innerHTML='<tr><td>No data</td></tr>';return} let keys=Object.keys(rows[0]).filter(k=>k!='updatedAt'); t.innerHTML='<tr>'+keys.map(k=>`<th>${k}</th>`).join('')+'</tr>'+rows.map(r=>'<tr>'+keys.map(k=>`<td>${r[k]??''}</td>`).join('')+'</tr>').join('')}
onAuthStateChanged(auth,u=>{ if(!u && !location.pathname.endsWith('index.html')) location.href='index.html'; });
if(location.pathname.endsWith('dashboard.html')){onSnapshot(collection(db,'kpis'),s=>renderTable('kpiTable',s.docs.map(d=>d.data()))); onSnapshot(collection(db,'absot'),s=>renderTable('absTable',s.docs.map(d=>d.data())));}
window.__db=db;