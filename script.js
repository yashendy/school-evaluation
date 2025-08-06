// Firebase config داخل firebase-config.js
const auth = firebase.auth();
const db = firebase.firestore();

// التنقل بين التبويبات
function showTab(name) {
  document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
  document.getElementById(`${name}-form`).classList.add('active');
}

// تسجيل دخول
document.getElementById('btn-login-action').onclick = async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const doc = await db.collection('users').doc(cred.user.uid).get();

    if (!doc.exists) return alert('الحساب غير موجود في قاعدة البيانات.');

    const userData = doc.data();

    if (userData.type === 'teacher') {
      const teacherName = encodeURIComponent(userData.name);
      window.location.href = `teacher.html?name=${teacherName}`;
    } else {
      alert('هذا الحساب ليس للمعلم.');
    }

  } catch (e) {
    alert('خطأ: ' + e.message);
  }
};

// إنشاء حساب
document.getElementById('register-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const phone = document.getElementById('register-phone').value;
  const role = document.querySelector('input[name="register-role"]:checked').value;
  const gender = document.querySelector('input[name="register-gender"]:checked').value;

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set({
      name,
      email,
      phone,
      gender,
      role,
      type: role, // teacher أو student مباشرة
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('تم إنشاء الحساب بنجاح');
    location.reload();
  } catch (err) {
    document.getElementById('register-error').textContent = err.message;
  }
});
