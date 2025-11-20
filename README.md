# 🐾 PawMart — Pet Adoption & Supply Portal

PawMart is a community-driven web application where pet owners, breeders, and shops can list pets for adoption or sell pet-related products. Users can browse pets, order supplies, and manage their own listings and orders.

---

## 🌐 Live Links

- **Client Live URL:** <a target="_blank" href="https://pawmart-2be0c.web.app/">Client Link</a>  
- **Server Live URL:** <a target="_blank" href="https://pawmart-server-kappa.vercel.app/">Server Link</a> 
- **Client GitHub Repo:** <a target="_blank" href="https://github.com/mohammad-moklesur-rahman/PawMart-Client">Client Repo Link</a> 
- **Server GitHub Repo:** <a target="_blank" href="https://github.com/mohammad-moklesur-rahman/PawMart-Server">Server Repo Link</a>

---

## 🚀 Tech Stack

### **Frontend (React SPA)**  
Using packages:
- React  
- React Router  
- Tailwind CSS  
- DaisyUI  
- React Icons  
- Swiper  
- Animate.css  
- React Simple Typewriter  
- AOS  
- Firebase Auth  
- React Hot Toast  
- Axios  
- SweetAlert2  
- React Fast Marquee  
- jsPDF + jsPDF-AutoTable  
- Framer Motion  

### **Backend**
- Node.js  
- Express.js  
- MongoDB  
- Cors  
- Dotenv  
- Nodemon
- Firebase Admin SDK  
- MVC Architecture

### **Deployment**
- Frontend (firebase)
- Backend (vercel)

---

## ✨ Features

### 🔓 Public Features
- Interactive homepage with slider, categories, recent listings & others section 
- View all pets & supplies  
- Shop by Category
- Responsive design (mobile-first)

### 🔐 Auth Features
- Firebase authentication  
- Email/password login & Google login  
- Auth-based routing (private routes protected)

### 🧑‍💼 Logged-in User Features
- Add new pet/product listing
- View Product/Listing details
- Manage (update/delete) personal listings  
- Adopt / order pets & products  
- View personal orders  
- Download Orders Report (PDF) via jsPDF  

### 🧩 Extra Features
- Dynamic page titles  
- Loading spinners  
- Toast notifications  
- SweetAlert2 modals  
- Error handling and 404 page  
- Animations using Framer Motion, Typewriter & AOS  

---

## 📄 Core Pages

- **Home Page**  
- **Pets & Supplies Page**  
- **Category Filter Page**  
- **Listing Details Page (Private)**  
- **Add Listing (Private)**  
- **My Listings (Private)**  
- **My Orders (Private)**  
- **Login / Register**  
- **404 Page**

---

## ⚙️ Installation & Setup (Client)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mohammad-moklesur-rahman/PawMart-Client.git
cd PawMart-Client
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a `.env` file
```
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_sender_id
VITE_APPID=your_firebase_app_id
```

### 4️⃣ Run the project
```bash
npm run dev
```

Now the client is available at:
```
http://localhost:5173/
```

---
