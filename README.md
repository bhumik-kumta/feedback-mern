📌 Feedback Management System — MERN Stack

This is a Feedback Management Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).

It provides:

✔ A login system with User & Admin roles

✔ Users can submit feedback

✔ Admin can view all feedback

✔ JWT Authentication

✔ Protected routes

✔ Responsive UI

🚀 Features

👨‍🎓 User

1)Login using credentials

2)Submit feedback

3)Provide: Name, Email, Rating & Comments

4)View success message

🧑‍💼 Admin

1)Login with admin credentials

2)Can view all feedback in a table

3)Checks who submitted feedback & when

4)Protected admin dashboard

🔐 Authentication

1)Login using JWT Token

2)Routes protected using authMiddleware

3)Tokens stored securely

🏗 Tech Stack

Frontend

1)React.js

2)Axios

3)React Router DOM

4)CSS

Backend

1)Node.js

2)Express.js

3)MongoDB

4)Mongoose

5)JWT (jsonwebtoken)

6)bcryptJS

7)express-validator

📁 Folder Structure
feedback-mern/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/components/
    ├── src/pages/
    ├── src/utils/
    ├── App.js
    └── index.js

⚙️ Setup Instructions:

1️⃣ Clone Repo
git clone https://github.com/your-username/feedback-mern.git
cd feedback-mern

2️⃣ Install Backend Packages
cd backend
npm install

3️⃣ Add .env File
MONGO_URI=Your MongoDB URL  
JWT_SECRET=your_secret_key  
PORT=5000  

4️⃣ Run Backend
npm run dev

5️⃣ Install Frontend Packages
cd ../frontend
npm install

6️⃣ Run Frontend
npm start

🧪 API Routes
Auth

Method	   Route	Description
POST	     /api/auth/login	User/Admin Login
POST	     /api/auth/register	Register new user

Feedback

Method   	Route	Description
POST	    /api/feedback	Submit feedback (User)
GET	      /api/feedback	View all feedback (Admin)


📌 Conclusion

This project demonstrates a complete MERN stack app with:

1)Authentication

2)Role-based access

3)Feedback submission

4)Admin data management

It is suitable for:

1)College feedback systems

2)Service feedback

3)Company internal feedback
