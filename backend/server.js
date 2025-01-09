
const express = require('express');
const { Surreal } = require('surrealdb.js');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());  // Improved security headers
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100
});
app.use(limiter);

// Database connection state
let dbConnection = null;
let isDbConnected = false;

// Database connection function with reconnection handling
async function connectToDatabase() {
    if (isDbConnected) return;

    try {
        const db = new Surreal(process.env.SURREALDB_URL);

        await db.signin({
            user: process.env.SURREALDB_USER,
            pass: process.env.SURREALDB_PASS
        });

        await db.use(process.env.SURREALDB_NS, process.env.SURREALDB_DB);
        dbConnection = db;
        isDbConnected = true;
        console.log('Connected to SurrealDB');

        // Initialize tables if needed
        await initializeTables();

    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

// Ensure required tables exist with proper schemas
async function initializeTables() {
    try {
        const tables = ['bookings', 'clients', 'workers', 'services', 'addresses', 'vehicles'];
        for (const table of tables) {
            await dbConnection.query(`
                DEFINE TABLE ${table} SCHEMAFULL;
                DEFINE FIELD created_at ON TABLE ${table} TYPE datetime;
                DEFINE FIELD updated_at ON TABLE ${table} TYPE datetime;
            `);
        }
    } catch (error) {
        console.error('Error initializing tables:', error);
        throw error;
    }
}

// Database middleware with reconnection
app.use(async (req, res, next) => {
    if (!isDbConnected) {
        try {
            await connectToDatabase();
        } catch (error) {
            return res.status(500).json({ error: 'Database connection failed' });
        }
    }
    req.db = dbConnection;
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        dbConnected: isDbConnected,
        timestamp: new Date().toISOString()
    });
});

// Sample validation for user creation route (demonstration)
app.post('/api/clients', [
    body('email').isEmail(),
    body('name').notEmpty().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const client = await req.db.create('clients', {
            ...req.body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Error creating client' });
    }
});

// Importing other API routes
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/workers', require('./routes/workers'));

// Start server with secure initialization
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Server failed to start:', error);
        process.exit(1);
    }
}

startServer();
