import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const msg = document.getElementById('msg');
document.getElementById('loginBtn')?.addEventListener('click', async () => {
  msg.textContent = 'Checking login...';
  try {
    await signInWithEmailAndPassword(auth, document.getElementById('email').value.trim(), document.getElementById('password').value);
    location.href = 'dashboard.html';
  } catch (e) { msg.textContent = 'Login error: ' + e.code + ' - ' + e.message; }
});
document.getElementById('resetBtn')?.addEventListener('click', async () => {
  try { await sendPasswordResetEmail(auth, document.getElementById('email').value.trim()); msg.textContent='Password reset mail sent.'; }
  catch(e){ msg.textContent='Reset error: '+e.message; }
});
onAuthStateChanged(auth, user => { console.log('Auth state:', user?.email || 'not logged in'); });
