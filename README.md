# CV Editor

Ứng dụng chỉnh sửa CV — React + Tailwind CSS (frontend), Node.js + Express + MongoDB (backend).

## Cấu trúc dự án

```
cv-editor/
├── frontend/   # React + Vite + Tailwind CSS
└── backend/    # Node.js + Express + Mongoose (MongoDB)
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Chạy tại `http://localhost:5173`.

## Backend

```bash
cd backend
cp .env.example .env   # chỉnh MONGODB_URI nếu cần
npm install
npm run dev
```

Chạy tại `http://localhost:5000`. Yêu cầu MongoDB đang chạy (local hoặc Atlas), cấu hình qua biến `MONGODB_URI` trong `.env`.

### API

| Method | Endpoint         | Mô tả              |
| ------ | ---------------- | ------------------ |
| GET    | /api/health       | Kiểm tra server     |
| GET    | /api/cvs          | Lấy danh sách CV    |
| GET    | /api/cvs/:id      | Lấy 1 CV            |
| POST   | /api/cvs          | Tạo CV mới          |
| PUT    | /api/cvs/:id      | Cập nhật CV         |
| DELETE | /api/cvs/:id      | Xóa CV              |
