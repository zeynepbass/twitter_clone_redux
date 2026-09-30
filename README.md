# Twitter Clone

React, Redux Toolkit ve Node.js ile geliştirilmiş Twitter klonu.

![Ana sayfa](docs/screenshots/home.jpg)

| Giriş | Gönderi detayı | Mobil |
| --- | --- | --- |
| ![Giriş](docs/screenshots/login.jpg) | ![Detay](docs/screenshots/detail.jpg) | ![Mobil](docs/screenshots/mobile.jpg) |

## Özellikler

- Kayıt, giriş ve JWT ile oturum yönetimi
- Sonsuz kaydırmalı akış, arama ve etiket sayfaları
- Beğeni, yorum ve görüntülenme sayacı
- Gündemdeki etiketler
- Mobil uyumlu arayüz

## Teknolojiler

**Frontend:** React 19, Redux Toolkit (RTK Query), React Router, Tailwind CSS v4, Vite
**Backend:** Node.js, Express 5, MongoDB (Mongoose), Zod, JWT

## Kurulum

```bash
# backend
cd backend
cp .env.example .env   # MONGO_URI ve JWT_SECRET değerlerini doldurun
npm install
npm run seed   # yönetici hesabı ve örnek gönderileri oluşturur
npm run dev

# frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

Uygulama `http://localhost:5173`, API `http://localhost:9380` adresinde çalışır.

`npm run seed` komutu, veritabanı boşsa örnek gönderileri ekler ve `admin@example.com` / `admin123` bilgileriyle bir yönetici hesabı oluşturur. Bu değerler `.env` içindeki `SEED_ADMIN_EMAIL` ve `SEED_ADMIN_PASSWORD` ile değiştirilebilir. Gönderi oluşturma, düzenleme ve silme işlemleri yalnızca yönetici hesabıyla API üzerinden yapılabilir.

## API

| Metot | Uç nokta | Açıklama |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Kayıt ol |
| `POST` | `/api/auth/login` | Giriş yap |
| `POST` | `/api/auth/admin/login` | Yönetici girişi |
| `GET` | `/api/auth/me` | Oturumdaki kullanıcı |
| `GET` | `/api/posts?cursor=&limit=&tag=&q=` | Gönderi akışı (cursor tabanlı sayfalama) |
| `GET` | `/api/posts/trending-tags` | Gündemdeki etiketler |
| `GET` | `/api/posts/:id` | Gönderi detayı |
| `POST` | `/api/posts` | Gönderi oluştur (yönetici) |
| `PATCH` / `DELETE` | `/api/posts/:id` | Gönderi güncelle / sil (yönetici) |
| `PUT` / `DELETE` | `/api/posts/:id/like` | Beğen / beğeniyi geri al |
| `POST` | `/api/posts/:id/comments` | Yorum yap |
| `POST` | `/api/posts/:id/views` | Görüntülenme sayacını artır |

## Proje yapısı

```
backend/src
├── config/         # ortam değişkenleri (Zod) ve MongoDB bağlantısı
├── features/       # auth, users, posts: route → controller → service → model
└── shared/         # middleware, hata yönetimi, doğrulama, JWT

frontend/src
├── app/            # store, router, layout
├── features/       # auth ve posts: RTK Query API, sayfalar, bileşenler
└── shared/         # ortak UI bileşenleri, hook'lar, yardımcılar
```
