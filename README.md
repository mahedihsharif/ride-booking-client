# Credentials

## Admin:

email: admin@gmail.com
password: Admin118@#

## Rider:

email: rider@gmail.com
password: Rider118@#

## Driver:

email: driver@gmail.com
password: Driver118@#

---

# 🚖 Ride Booking Application

🔗 **Live Demo**: [Ride Booking Client](https://ride-booking-client.vercel.app/)

---

## 📌 Overview

The **Ride Booking Application** is a full-stack project built using **Express.js, TypeScript, and MongoDB (Mongoose ORM)**.  
It provides a seamless platform for users to browse available rides, book them, and manage ride history while ensuring **data consistency and scalability**.

---

## ✨ Core Features

### 🏎️ Ride Management

- Add, update, and view ride details.

### 👤 User Authentication

- Secure login/signup with **JWT**.

### 📅 Booking System

- Book rides, track availability, and prevent double booking.

### 📊 Admin Panel APIs

- Admin can manage rides, users, and bookings.

### 🔄 Real-Time Updates

- Availability updates instantly when rides are booked.

### 🛡️ Security Features

- Password hashing, cookie-based authentication, and validation.

### 🌐 Scalable Architecture

- Clean **MVC pattern** with TypeScript for maintainability.

---

## 🚗 Project Features

### 🔐 Authentication & Authorization

- User Registration & Login (**JWT based authentication**)
- Role Based Access Control (**RBAC**) → Admin, User, Driver
- Blocked users cannot log in to the system

### 📖 Ride Management

- Browse available rides
- Book a ride (vehicle, pickup, drop location, time, seats)
- Automatic seat availability check before booking

### 👤 User Features

- View personal booking history
- Cancel booking (if ride not yet started)
- Profile management (update info, password change etc.)

### 🛠️ Admin Features

- Manage users (block/unblock users)
- Manage rides (create, update, delete rides)
- View overall booking statistics

### 🚕 Driver Features

- Accept or reject ride requests
- View assigned rides and booking details

### ⚡ Other Features

- Responsive UI with dark mode/light mode support
- Error handling & validation with meaningful messages
- Secure API endpoints with role-based middleware
- Optimized queries with MongoDB & Mongoose
- Data consistency maintained during booking & cancellation

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & Cookies
- **Validation**: Zod / Middleware-based validation
- **Deployment**: Vercel

---

## ⚡ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ride-booking-system.git
cd ride-booking-system
bun install
bun dev
```
