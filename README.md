# AI Assistant FE 2

Một ứng dụng Next.js hiện đại được xây dựng với thiết kế UI/UX chuyên nghiệp và thẩm mỹ cao.

**Tags:** #ai-assistant #frontend #nextjs #typescript #documentation

**Related Files:**
- [[brand-guidelines]] - Brand and design guidelines  
- [[src/app/expense-expert/overview]] - Expense Expert module documentation

## 🎨 Tính năng thiết kế

- ✨ **Thiết kế tối giản** với bảng màu trung tính và accent màu violet
- 🎭 **Font chữ hiện đại** - Inter và Poppins cho trải nghiệm đọc tối ưu
- 🌈 **Gradient tinh tế** và glassmorphism effects
- 🎯 **Smooth animations** với hover effects mượt mà
- 📱 **Responsive design** tối ưu cho mọi thiết bị
- 🌙 **Dark/Light mode** với theme toggle

## 🚀 Tính năng kỹ thuật

- ✅ **Next.js 14** với App Router
- ✅ **TypeScript** để đảm bảo type safety
- ✅ **Tailwind CSS** với custom design system
- ✅ **ShadCN/UI** components library
- ✅ **next-themes** cho theme management
- ✅ **Lucide React** icons

## 📁 Cấu trúc dự án

```
src/
├── app/                    # App Router pages
│   ├── expense-expert/    # Trang Expense Expert
│   │   └── page.tsx
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout với ThemeProvider
│   └── page.tsx           # Trang chủ với hero section
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── badge.tsx
│   ├── Navigation.tsx    # Header với navigation
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx  # Dark/Light mode toggle
└── lib/                  # Utilities
    └── utils.ts          # Tailwind merge utilities
```

## 🎨 Design System

### Bảng màu
- **Primary**: Violet (#8B5CF6) - Màu nhấn chính
- **Secondary**: Purple (#A855F7) - Màu phụ
- **Accent**: Indigo (#6366F1) - Màu nhấn
- **Neutral**: Gray scale với hỗ trợ dark mode

### Typography
- **Primary Font**: Inter - cho UI components
- **Secondary Font**: Poppins - cho headings
- **Font Weights**: 400, 500, 600, 700, 800

### Components
- **Cards**: Glassmorphism với backdrop blur
- **Buttons**: Gradient backgrounds với hover effects
- **Navigation**: Sticky header với smooth scrolling
- **Icons**: Lucide React với consistent sizing

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build ứng dụng cho production
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint

## Cách phát triển

1. Tạo components mới trong `src/components/`
2. Tạo pages mới trong `src/app/`
3. Thêm utility functions vào `src/utils/`
4. Styling với CSS modules hoặc Tailwind CSS

## Tìm hiểu thêm

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
