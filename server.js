import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// للحصول على dirname في ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⭐ إعداد static files لو عندك واجهة واجهة Vue/React/Vite
app.use(express.static(path.join(__dirname, 'dist')));

// ✔ API Route بسيط
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from AI Node.js server 🎉' });
});

// ✔ إرسال index.html في حال كان SPA (Vue/React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 🚀 تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
