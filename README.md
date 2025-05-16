# **Digital Electronics Hub**

![Digital Electronics Hub Banner](https://i.ibb.co/V0BKvdDK/digital-electronics.png)

**Digital Electronics Hub** is a modern full-stack e-commerce platform tailored for digital electronics enthusiasts. It enables users to explore a wide range of products, manage their shopping cart and wishlist, and securely purchase items. The platform also includes an admin panel for efficient inventory and order management.

---

## 📖 Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Installation](#installation)
* [Configuration (.env)](#configuration-env)
* [Usage](#usage)
* [Authentication](#authentication)
* [Routes](#routes)
* [Live Demo & Repository](#live-demo--repository)

---

## ✨ Features<a id="features"></a>

### 🛍️ Product Catalog

* **Product Listings**: Display products with images, prices, descriptions, ratings, and reviews.
* **Pagination & Infinite Scrolling**: Enhance user experience with seamless navigation through products.

![Product Catalog](https://i.ibb.co/pBfVwGYv/products.png)

---

### 🔍 Search and Filter

* **Search Functionality**: Search products by name, category, or brand.
* **Advanced Filters**: Filter products based on price range, ratings, availability, and brand.

![Search and Filter Options](https://i.ibb.co/VHCm6G6/search-filter.png)

---

### 🛒 Shopping Cart

* **Add to Cart**: Add multiple items to the cart with quantity options.

![Shopping Cart](https://i.ibb.co/tT06JYqP/cart.png)

---

### ❤️ Wishlist

* **Wishlist Management**: Add or remove items to/from the wishlist with persistent storage.

![Wishlist](https://i.ibb.co/B5jXvt9b/wishlist.png)

---

### 🤖 AI Chatbot Support

* **AI Product Assistant**: Users can ask questions about product features, specifications, and recommendations through a chatbot powered by **Gemini AI**.

![AI Chatbot](https://i.ibb.co/tTZB06KH/Screenshot-178.png)

---

### 📱 Responsive Design

* **Mobile-Friendly UI**: Fully responsive design compatible with desktop, tablet, and mobile devices.

**💻 Desktop View**

![Desktop View](https://i.ibb.co/5Xv80sRG/Screenshot-176.png)

**📱 Tablet View**

![Tablet View](https://i.ibb.co/LDF6w9HJ/tab-screen.png)

**📱 Mobile View**

![Mobile View](https://i.ibb.co/XfGqXhD3/phone-screen.png)

---

## 🛠️ Technology Stack<a id="technology-stack"></a>

| Category                | Technologies Used                                                             |
| ----------------------- | ----------------------------------------------------------------------------- |
| **Frontend**            | Next.js (15.2.2), React (18.0.0-rc.1), Tailwind CSS, ShadCn, Radix UI, Swiper |
| **Backend**             | Node.js, Express.js                                                           |
| **Database**            | MongoDB, Mongoose                                                             |
| **Authentication**      | NextAuth.js (4.24.11), JWT, OAuth 2.0                                         |
| **Payment Integration** | Stripe                                                                        |
| **Notifications**       | Nodemailer                                                                    |
| **AI Integration**      | Gemini API                                                                    |
| **Hosting/Deployment**  | Vercel (Frontend & Backend), MongoDB Atlas                                    |

---

## 🛠 Installation<a id="installation"></a>

### Prerequisites

* **Node.js** (>= 18)
* **MongoDB Atlas** (or local MongoDB instance)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/RaiyanJiyon/digital-electronics
   cd digital-electronics
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see `.env.local` below)

4. **Run the development server**

   ```bash
   npm run dev
   ```

---

## ⚙️ Configuration (.env)<a id="configuration-env"></a>

Create a `.env.local` file in the root directory and configure the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Apple OAuth
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_secret_key
```

---

## 🚀 Usage<a id="usage"></a>

### User Flow

1. **Browse Products**: Users can explore the product catalog with search and filter options.
2. **View Product Details**: Clicking on a product displays detailed information, including images, descriptions, and reviews.
3. **Add to Cart/Wishlist**: Users can add products to their cart or wishlist.
4. **Ask AI Chatbot**: Get assistance on product recommendations or inquiries through the chatbot.
5. **Checkout**: Proceed to checkout by providing shipping details and selecting a payment method.
6. **Order Confirmation**: Upon successful payment, users receive an order confirmation.

---

## 🔐 Authentication<a id="authentication"></a>

Digital Electronics Hub utilizes **NextAuth.js** for secure authentication. Users can register and log in using:

* **Email & Password**
* **Google OAuth**

---

## 📌 Routes<a id="routes"></a>

| Route              | Description                                 |
| ------------------ | ------------------------------------------- |
| `/`                | Home page with product listings             |
| `/shop/[id]`       | Dynamic route to view product details       |
| `/cart`            | Shopping cart page                          |
| `/wishlist`        | Wishlist page                               |
| `/checkout`        | Checkout form for placing orders            |
| `/login`           | User login page                             |
| `/register`        | User registration page                      |
| `/dashboard/admin` | Admin dashboard for managing the platform   |
| `/chat`            | Product assistant chatbot powered by Gemini |

---

## 🌍 Live Demo & Repository<a id="live-demo--repository"></a>

* **Live Site:** [Digital Electronics Hub](https://digital-electronics.vercel.app/)
* **GitHub Repository:** [GitHub Link](https://github.com/RaiyanJiyon/digital-electronics)

---

🛒 **Experience seamless shopping with Digital Electronics Hub – now powered by AI!** 🧠💬
