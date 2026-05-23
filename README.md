# 🏦 Banking Ledger System

> Enterprise-grade backend banking application featuring double-entry ledger accounting, ACID-compliant transactions, JWT security, and machine learning-based fraud detection.

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=flat-square&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-Complete-green?style=flat-square)

</div>

---

## 📖 Project Overview

This is a **real-world banking system** that implements proper financial accounting principles. Instead of just updating balances, it uses **double-entry bookkeeping** - the accounting standard used by actual banks.

### Why This Project Matters
- 🏦 Shows understanding of **financial systems**
- 🔒 Demonstrates **security best practices**
- 🤖 Proves **ML integration** capability
- 💾 Shows **database design** skills
- ⚙️ Exhibits **backend architecture** knowledge

---

## 🎯 Key Features

### 1. **Double-Entry Ledger System**
Every transaction creates two entries: a debit and a credit. This ensures total financial integrity.

```javascript
// Every transaction:
✅ Debit one account
✅ Credit another account
✅ Create immutable record
✅ Derive balances from history (not stored values)
```

### 2. **ACID-Compliant Transactions**
Uses MongoDB sessions to ensure transactions either fully complete or fully rollback.

```javascript
✅ Atomicity: All-or-nothing execution
✅ Consistency: Data always valid
✅ Isolation: No interference between transactions
✅ Durability: Permanent once committed
```

### 3. **Machine Learning Fraud Detection**
Neural network analyzes transaction patterns to detect suspicious activity in real-time.

```javascript
🤖 Analyzes:
   └─ Transaction amount vs. time-of-day
   └─ User behavior patterns
   └─ Unusual transaction patterns
   
📊 Actions:
   └─ Flags suspicious transactions
   └─ Blocks high-risk transfers
   └─ Sends security alerts
```

### 4. **Security Features**
- 🔐 JWT token-based authentication
- 🔒 Bcrypt password hashing
- 📧 Email verification & alerts
- 🚨 Fraud detection & blocking

### 5. **Real-Time Notifications**
Automated email alerts for all activities:
- Login notifications
- Transaction receipts
- Fraud alerts
- Security updates

---

## 🛠️ **Technology Stack**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js | JavaScript runtime environment |
| **Framework** | Express.js | Web server & routing |
| **Database** | MongoDB | NoSQL document database |
| **ODM** | Mongoose | MongoDB object modeling |
| **Authentication** | JWT + bcrypt | Secure user authentication |
| **ML** | Brain.js | Neural network for fraud detection |
| **Email** | Nodemailer | Real-time notifications |

---

## 📁 **Project Structure**

```
Banking_application/
├── models/
│   ├── User.js          # User schema
│   ├── Account.js       # Account schema
│   └── Transaction.js   # Transaction record schema
│
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── accounts.js      # Account management
│   └── transactions.js  # Transaction handling
│
├── controllers/
│   ├── authController.js
│   ├── accountController.js
│   └── transactionController.js
│
├── middleware/
│   ├── auth.js          # JWT verification
│   └── validation.js    # Input validation
│
├── services/
│   ├── fraudDetection.js    # ML fraud detection
│   └── emailService.js      # Email notifications
│
├── config/
│   └── database.js      # MongoDB connection
│
└── index.js             # Main server file
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js v14+ installed
- MongoDB Atlas account (or local MongoDB)
- Gmail account for email notifications
- Postman (optional, for testing API)

### **Installation Steps**

#### **Step 1: Clone Repository**
```bash
git clone https://github.com/Sushanth226/Banking_application.git
cd Banking_application
npm install
```

#### **Step 2: Setup Environment Variables**
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/banking_db?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Optional: API Keys
FRAUD_DETECTION_THRESHOLD=0.7
```

#### **Step 3: Start Server**
```bash
npm start
# Server will run on http://localhost:5000
```

#### **Step 4: Test with Postman**
Import the API endpoints from the documentation below.

---

## 📡 **API Endpoints**

### **Authentication**

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

### **Account Management**

#### Create Account
```http
POST /api/accounts
Authorization: Bearer <token>
Content-Type: application/json

{
  "accountType": "savings",
  "initialBalance": 10000
}
```

#### Get All Accounts
```http
GET /api/accounts
Authorization: Bearer <token>
```

#### Get Account Details
```http
GET /api/accounts/:accountId
Authorization: Bearer <token>
```

### **Transactions**

#### Transfer Money
```http
POST /api/transactions/transfer
Authorization: Bearer <token>
Content-Type: application/json

{
  "fromAccountId": "acc1234",
  "toAccountId": "acc5678",
  "amount": 500,
  "description": "Payment to John"
}
```

#### Get Transaction History
```http
GET /api/transactions?limit=10&page=1
Authorization: Bearer <token>
```

#### Get Specific Transaction
```http
GET /api/transactions/:transactionId
Authorization: Bearer <token>
```

---

## 💾 **Database Schema**

### **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Accounts Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  accountNumber: String (unique),
  accountType: String (savings/checking),
  currency: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Transactions Collection**
```javascript
{
  _id: ObjectId,
  fromAccountId: ObjectId,
  toAccountId: ObjectId,
  amount: Number,
  type: String (debit/credit),
  status: String (pending/completed/blocked),
  fraudScore: Number (0-1),
  blocked: Boolean,
  createdAt: Date
}
```

### **Ledger Collection**
```javascript
{
  _id: ObjectId,
  accountId: ObjectId,
  transactionId: ObjectId,
  type: String (debit/credit),
  amount: Number,
  balance: Number (cumulative),
  timestamp: Date
}
```

---

## 🤖 **Machine Learning Fraud Detection**

### **How It Works**

The system uses a **neural network** trained on transaction patterns:

```
Input Features:
  ├─ Transaction amount
  ├─ Time of day (hour)
  ├─ Day of week
  ├─ User's average transaction
  └─ Historical patterns

Neural Network Analysis:
  ├─ Compares current vs. normal behavior
  ├─ Calculates anomaly score (0-1)
  └─ Returns fraud probability

Decision:
  ├─ Score < 0.3: Approve automatically
  ├─ Score 0.3-0.7: Request verification
  └─ Score > 0.7: Block transaction + alert
```

### **Example: Fraud Detection in Action**

```javascript
// Normal transaction at 2 PM on weekday:
amount: 500,
time: 14,
day: 'monday',
→ Fraud Score: 0.15 ✅ Approved

// Unusual transaction at 3 AM (high amount):
amount: 50000,
time: 3,
day: 'sunday',
→ Fraud Score: 0.85 ❌ Blocked + Alert sent
```

---

## 🔒 **Security Implementation**

### **Password Security**
```javascript
// Bcrypt with salt rounds
const hashedPassword = await bcrypt.hash(password, 10);
// Takes 10 rounds to hash - strong security
```

### **Token Authentication**
```javascript
// JWT tokens with expiration
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// Tokens expire after 7 days - safer than no expiration
```

### **Input Validation**
- Email format validation
- Password strength requirements
- Amount sanity checks
- SQL injection prevention

### **Email Security**
- App-specific passwords (not account password)
- HTTPS for all connections
- Secure credential storage

---

## 📊 **Sample Usage Flow**

### **Complete Transaction Flow**

```
1. User logs in
   ├─ Email & password verified
   ├─ JWT token generated
   └─ Token returned to frontend

2. User initiates transfer
   ├─ Request includes token & transaction details
   ├─ Token verified by middleware
   └─ Transaction validated

3. Fraud Detection Runs
   ├─ Neural network analyzes patterns
   ├─ Fraud score calculated
   └─ Decision: approve/block/verify

4. Database Transaction Begins
   ├─ Debit entry created in ledger
   ├─ Credit entry created in ledger
   ├─ Transaction record created
   └─ Account balances updated

5. If Any Step Fails
   └─ Entire transaction rolled back (ACID)

6. Notification Sent
   ├─ Transaction receipt emailed
   ├─ If blocked: fraud alert sent
   └─ Account update notification sent
```

---

## 🧪 **Testing the System**

### **Manual Testing Steps**

#### Test 1: Register & Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@1234"
  }'

# Login and save the token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

#### Test 2: Create Accounts
```bash
curl -X POST http://localhost:5000/api/accounts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "accountType": "savings",
    "initialBalance": 10000
  }'
```

#### Test 3: Transfer Money (Fraud Detection)
```bash
# Normal transaction (should approve)
curl -X POST http://localhost:5000/api/transactions/transfer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "account1",
    "toAccountId": "account2",
    "amount": 100
  }'

# Suspicious transaction (should block)
curl -X POST http://localhost:5000/api/transactions/transfer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "fromAccountId": "account1",
    "toAccountId": "account2",
    "amount": 50000
  }'
```

---

## 📚 **What I Learned**

✅ **Financial System Design** - Double-entry bookkeeping principles  
✅ **Database Transactions** - ACID compliance with MongoDB  
✅ **Machine Learning Integration** - Real-world ML application  
✅ **Security Practices** - Authentication, password hashing, email alerts  
✅ **Backend Architecture** - Scalable, maintainable code structure  
✅ **Error Handling** - Proper validation and error messages  
✅ **Real-World Problem Solving** - Building features that matter  

---

## 🔧 **Troubleshooting**

### **MongoDB Connection Error**
```
Error: Cannot connect to MongoDB
Fix: Check MONGODB_URI in .env file, ensure MongoDB Atlas IP is whitelisted
```

### **Email Not Sending**
```
Error: Gmail authentication failed
Fix: Use app-specific password, not your Gmail password
     Enable "Less secure apps" in Google Account settings
```

### **JWT Token Invalid**
```
Error: Invalid token
Fix: Ensure token is passed correctly in Authorization header
     Token format: "Bearer YOUR_TOKEN_HERE"
```

---

## 📖 **Resources Used**

- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Brain.js ML Library](https://github.com/BrainJS/brain.js)
- [Bcrypt Security](https://www.npmjs.com/package/bcrypt)

---

## 📝 **Future Improvements**

- [ ] Add real-time WebSocket updates
- [ ] Implement two-factor authentication
- [ ] Add transaction scheduling
- [ ] Create admin dashboard
- [ ] Add multi-currency support
- [ ] Implement recurring transfers
- [ ] Add spending analytics
- [ ] Create mobile app frontend

---

## 🤝 **Contributing**

This is a portfolio project, but I'm open to feedback! If you see improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 **License**

This project is open source under the MIT License.

---

<div align="center">

### ⭐ If you found this helpful, please star the repository!

**[View on GitHub](https://github.com/Sushanth226/Banking_application)**

Made with ❤️ by Sushanth Yadav

</div>
