# BookIt - Fullstack Travel Experiences Booking Platform

A complete fullstack web application for booking travel experiences, built with React + TypeScript frontend and Node.js + MongoDB backend.

## 🚀 Live Demo
- **Frontend:** [Add your hosted frontend link after deployment]
- **Backend API:** [Add your hosted backend link after deployment]

## 📋 Assignment Requirements Checklist

### ✅ Frontend (React + TypeScript + TailwindCSS)
- [x] Home Page - List experiences
- [x] Details Page - Experience details & slots  
- [x] Checkout Page - User info & price summary
- [x] Result Page - Booking confirmation
- [x] Responsive and mobile-friendly
- [x] Matches Figma design exactly
- [x] Clean, consistent spacing and typography

### ✅ Backend (Node.js + Express + MongoDB)
- [x] GET /api/experiences - Return list of experiences
- [x] GET /api/experiences/:id - Return details and slot availability
- [x] POST /api/bookings - Accept booking details and store them
- [x] POST /api/promo/validate - Validate promo codes
- [x] Database integration with MongoDB
- [x] Prevent double-booking for same slot

### ✅ Full Integration
- [x] Complete booking flow: Home → Details → Checkout → Result
- [x] Dynamic data from backend APIs
- [x] Form validation and error handling
- [x] Professional UI/UX with loading states

## 🛠️ Tech Stack

### Frontend (`/frontend`)
- React 18 + TypeScript
- Tailwind CSS
- React Router DOM
- Axios for API calls
- Vite build tool

### Backend (`/backend`) 
- Node.js + Express
- MongoDB with Mongoose
- CORS enabled
- Environment variables with dotenv

## 🚀 Local Development

### Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# PORT=5000

npm run dev
# Server runs on http://localhost:5000