import bcrypt from 'bcrypt';
import sharp from 'sharp';
import { connectDatabase, disconnectDatabase } from '../src/config/db.js';
import { Admin } from '../src/features/auth/admin.model.js';
import { Post } from '../src/features/posts/post.model.js';
import { toPostFields } from '../src/features/posts/post.dto.js';

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';

const POSTS = [
  {
    title: 'React 19 ile gelen yenilikler',
    subtitle: 'Frontend',
    description: 'Actions, use() hook’u ve React Compiler ile form yönetimi artık çok daha sade.',
    content: 'React 19; Actions, useOptimistic ve use() gibi API’lerle asenkron durum yönetimini sadeleştiriyor.',
    tags: ['react', 'javascript', 'frontend'],
    colors: ['#1d9bf0', '#0b3d91'],
  },
  {
    title: 'Redux Toolkit Query ile önbellekleme',
    subtitle: 'State yönetimi',
    description: 'RTK Query etiket tabanlı önbellek geçersizleştirme ile sunucu durumunu otomatik senkron tutar.',
    content: 'providesTags ve invalidatesTags sayesinde beğeni ve yorum sonrası akış kendiliğinden güncellenir.',
    tags: ['redux', 'react', 'javascript'],
    colors: ['#764abc', '#2d1b4e'],
  },
  {
    title: 'Express 5 yayında',
    subtitle: 'Backend',
    description: 'Async hata yakalama artık yerleşik; try/catch sarmalayıcılarına gerek kalmadı.',
    content: 'Express 5, reddedilen promise’leri doğrudan hata yakalayıcıya iletir.',
    tags: ['nodejs', 'express', 'backend'],
    colors: ['#22c55e', '#064e3b'],
  },
  {
    title: 'MongoDB aggregation ipuçları',
    subtitle: 'Veritabanı',
    description: '$project ile sadece ihtiyaç duyulan alanları döndürmek yanıt boyutunu ciddi oranda küçültür.',
    content: 'Gündemdeki etiketler $unwind ve $group aşamalarıyla tek sorguda hesaplanabilir.',
    tags: ['mongodb', 'backend'],
    colors: ['#f59e0b', '#7c2d12'],
  },
  {
    title: 'Tailwind CSS v4 ile tema değişkenleri',
    subtitle: 'Tasarım',
    description: '@theme bloğu sayesinde tasarım token’ları doğrudan CSS değişkeni olarak tanımlanıyor.',
    content: 'Yapılandırma dosyasına gerek kalmadan renkler ve boşluklar CSS içinde yönetilebiliyor.',
    tags: ['tailwindcss', 'css', 'frontend'],
    colors: ['#06b6d4', '#164e63'],
  },
  {
    title: 'JWT ile güvenli oturum yönetimi',
    subtitle: 'Güvenlik',
    description: 'Kısa ömürlü token, rol tabanlı yetkilendirme ve rate limit ile temel güvenlik katmanı.',
    content: 'Parolalar bcrypt ile hash’lenir, token yalnızca kullanıcı kimliği ve rolünü taşır.',
    tags: ['security', 'nodejs', 'backend'],
    colors: ['#ef4444', '#450a0a'],
  },
];

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (char) => `&#${char.charCodeAt(0)};`);

const renderCover = async ({ title, colors: [from, to] }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${from}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="60" y="600" font-family="Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#fff">
        ${escapeXml(title)}
      </text>
    </svg>`;

  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer();
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};

const seedAdmin = async () => {
  const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.updateOne({ email: ADMIN_EMAIL }, { $setOnInsert: { email: ADMIN_EMAIL, password } }, { upsert: true });
  console.log(`Yönetici hesabı: ${ADMIN_EMAIL}`);
};

const seedPosts = async () => {
  if (await Post.exists({})) {
    console.log('Gönderi koleksiyonu dolu, örnek gönderiler atlandı');
    return;
  }

  for (const { colors, ...post } of POSTS) {
    const image = await renderCover({ title: post.title, colors });
    await Post.create(toPostFields({ ...post, image }));
  }
  console.log(`${POSTS.length} örnek gönderi eklendi`);
};

await connectDatabase();

try {
  await seedAdmin();
  await seedPosts();
} finally {
  await disconnectDatabase();
}
