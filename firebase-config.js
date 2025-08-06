// firebase-config.js

// 1. استيراد مكتبة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGsk8luLKcP-9Mb9T76Lxxm3N3LooI72I",
  authDomain: "school-results-9608d.firebaseapp.com",
  databaseURL: "https://school-results-9608d-default-rtdb.firebaseio.com",
  projectId: "school-results-9608d",
  storageBucket: "school-results-9608d.appspot.com",
  messagingSenderId: "381434456706",
  appId: "1:381434456706:web:a68f63677598fceb7fe29b"
};

// 2. تهيئة التطبيق
firebase.initializeApp(firebaseConfig);
