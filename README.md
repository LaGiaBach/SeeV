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

| Method | Endpoint          | Mô tả               |
| ------ | ----------------- | ------------------- |
| GET    | /api/health       | Kiểm tra server     |
| POST   | /api/auth/register | Đăng ký tài khoản   |
| POST   | /api/auth/login   | Đăng nhập           |
| GET    | /api/cvs          | Lấy danh sách CV của tôi (yêu cầu đăng nhập) |
| GET    | /api/cvs/:id      | Lấy 1 CV (yêu cầu đăng nhập)   |
| POST   | /api/cvs          | Tạo CV mới (yêu cầu đăng nhập) |
| PUT    | /api/cvs/:id      | Cập nhật CV (yêu cầu đăng nhập) |
| DELETE | /api/cvs/:id      | Xóa CV (yêu cầu đăng nhập)     |

Các endpoint `/api/cvs/*` yêu cầu header `Authorization: Bearer <token>` lấy từ lúc đăng ký/đăng nhập.
