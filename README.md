# MediCampus
MediCampus: A Smart College Dispensary System

MediCampus is a full-stack web application designed to streamline and digitize the medical dispensary operations within a college campus. It supports distinct functionalities for Admins, Staff, and Students to ensure smooth, secure, and efficient healthcare management.

🏗️ Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Real-time Communication: Socket.IO

Email Services: NodeMailer

Database: MongoDB (with Mongoose)

Authentication & Storage: Supabase (JWT, Media & Avatar Handling)

👥 User Roles and Panels
🔑 Admin Panel:
Register and manage students and staff

Manage medicine inventory (add/edit/delete)

View all medicine issuance records

Manage facilities and nearby hospitals data

Upload and manage gallery images

Create and manage health-related campus events

Full edit and delete privileges across the system

👨‍⚕️ Staff Panel:
Access and manage student medicine records

Add new medicines to the inventory

Issue medicines to students with real-time updates

View and manage facilities, nearby hospitals, and gallery images

Cannot manage staff accounts (admin-only feature)

🎓 Student Panel:
View personal medical records and history

Receive medicines issued by staff

View campus facilities, nearby hospitals, and gallery

Receive real-time notifications (e.g., medicine issued, event alerts)

💡 Key Features
🛡️ Secure Authentication using JWT

🔐 Encrypted Passwords to protect user data

📧 OTP Verification via NodeMailer for email-based login

💬 Real-Time Messaging with Socket.IO

☁️ Supabase Integration for media (image/avatar) uploads and authentication

📊 Structured Role-Based Access for Admins, Staff, and Students

