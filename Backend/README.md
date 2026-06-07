Backend Ledger System
Is a secure, scalable, and fully functional core banking API built on Node.js, Express, and MongoDB. Designed with enterprise-grade architecture in mind, this application simulates the complex backend operations of a modern financial institution.

Rather than simply updating user balances, this system utilizes a rigorous Double-Entry Bookkeeping ledger model to ensure total financial integrity, complete with ACID-compliant database transactions and an integrated Machine Learning fraud detection engine.

🚀 Key Features
Robust Authentication & Security:
Secure user registration and login flows utilizing bcrypt for password hashing and JSON Web Tokens (JWT) for stateless session management.
Automated email alerts for new logins to prevent account takeover.
Double-Entry Ledger Architecture:
Strict adherence to financial accounting principles. Every transaction generates immutable Debit and Credit entries in the ledger.
Balances are dynamically derived directly from the ledger history rather than stored as vulnerable static fields, ensuring 100% data integrity.
ACID-Compliant Transactions:
Utilizes MongoDB Sessions to process funds transfers. If any part of a transaction fails (e.g., the debit succeeds but the credit fails), the entire operation is automatically rolled back, guaranteeing that money is never created or destroyed erroneously.
Idempotency keys are implemented to prevent accidental duplicate transactions caused by network retries.
🧠 Machine Learning Fraud Detection:
Integrated Artificial Neural Network (Brain.js) that actively monitors incoming transactions.
The model analyzes behavioral patterns—such as comparing the transaction amount against the time of day—to automatically flag and block highly anomalous, potentially fraudulent transfers in real-time.
Automated Email Notifications:
Integrated with Nodemailer to provide users with real-time transactional receipts, registration welcomes, and security alerts.
🛠️ Technology Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB & Mongoose (with multi-document transaction support)
Machine Learning: Brain.js (Feed-forward Neural Network)
Authentication: JWT (JSON Web Tokens)
Services: Nodemailer (Gmail SMTP)
