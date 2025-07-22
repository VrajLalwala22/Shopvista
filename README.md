# 🚀 ShopVista

**ShopVista** is a modern, full-featured e-commerce web application designed for a seamless and engaging online shopping experience. Built with React, TypeScript, Tailwind CSS, and Material UI, ShopVista combines a beautiful futuristic UI with robust functionality.

---

## 🌟 Features

- **Curated Product Catalog**: Browse, search, and filter a wide range of products across categories like Electronics, Fashion, Home & Living, Beauty, and Groceries.
- **Product Details**: View detailed information, images, and ratings for each product.
- **Smart Cart & Wishlist**: Add products to your cart or wishlist, with real-time item counts and persistent storage.
- **User Authentication**: Secure login and profile management.
- **Checkout & Order Success**: Streamlined checkout process with order summary and confirmation.
- **Responsive Design**: Fully responsive and mobile-friendly interface.
- **Error Handling**: Robust error boundaries for a smooth user experience.
- **Modern UI/UX**: Futuristic gradients, animated elements, and a clean, accessible layout.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router
- **UI/Styling**: Tailwind CSS, Material UI, Emotion, Heroicons, Framer Motion
- **State Management**: React Context API (Cart, Wishlist, Auth)
- **API**: DummyJSON (for product and category data)
- **Build Tools**: Vite, ESLint, TypeScript
- **Deployment**: Vercel-ready configuration

---

## 📦 Project Structure

```
shopvista/
  ├── public/           # Static assets
  ├── src/
  │   ├── components/   # Reusable UI components (Navbar, Footer, ErrorBoundary)
  │   ├── context/      # React Contexts (Auth, Cart, Wishlist)
  │   ├── pages/        # Main pages (Home, Products, ProductDetail, Cart, Wishlist, Checkout, etc.)
  │   ├── services/     # API and auth utilities
  │   ├── types/        # TypeScript types (Product, Category)
  │   ├── index.css     # Tailwind and global styles
  │   ├── theme.ts      # MUI theme customization
  │   └── main.tsx      # App entry point
  ├── index.html        # App HTML template
  ├── tailwind.config.js
  ├── vite.config.ts
  ├── package.json
  └── README.md
```

---

## 🚦 Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/shopvista.git
cd shopvista
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Run the development server**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 4. **Build for production**
```bash
npm run build
```

### 5. **Preview production build**
```bash
npm run preview
```

---

## 🧑‍💻 Usage

- **Browse Products**: Explore categories and featured products on the Home page.
- **Search & Filter**: Use the search bar and filters to find products.
- **Cart & Wishlist**: Add/remove items, view totals, and manage your selections.
- **Checkout**: Complete your order with a simple, secure checkout flow.
- **Profile**: Manage your user profile after logging in.

---

## 🗂️ Categories

- **Electronics**: Phones, Laptops, Automotive
- **Fashion**: Men’s & Women’s Clothing, Shoes, Watches, Bags, Jewellery
- **Home & Living**: Furniture, Decor, Lighting
- **Beauty & Personal Care**: Skincare, Fragrances
- **Groceries**: Food & Beverages

---

## 🎨 Design & Theming

- **Futuristic gradients** and animated backgrounds
- **Accessible color palette** (customizable via `theme.ts` and `tailwind.config.js`)
- **Responsive layouts** for all devices

---

## ⚙️ Configuration

- **API**: Uses [DummyJSON](https://dummyjson.com/) for product and category data.
- **Environment**: No special environment variables required for development.

---

## 🛡️ Accessibility & Best Practices

- Keyboard navigable
- ARIA labels and roles for navigation and content
- Error boundaries for graceful error handling

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Credits

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [DummyJSON](https://dummyjson.com/)
- [Vercel](https://vercel.com/)

---

## 🚀 Futuristic Vision

ShopVista is designed to be the next-generation e-commerce platform, blending cutting-edge technology with a visually stunning, user-centric experience. Whether you’re a developer, designer, or shopper, ShopVista aims to set a new standard for online retail.
