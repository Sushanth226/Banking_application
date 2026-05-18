const brain = require('brain.js/dist/browser.js');

// Create a new Neural Network
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

// We train the model with sample data since we don't have a large real dataset.
// Features: 
// [ amountScaled (0 to 1), hourOfDayScaled (0 to 1) ]
// amountScaled = amount / 1000000 (Assuming max transaction is 1M for scaling)
// hourOfDayScaled = hour / 24
// 
// Output: 
// { fraud: 1 } (Fraudulent) or { fraud: 0 } (Normal)

const trainingData = [
    // Normal transactions: Small amounts, daytime
    { input: [5000 / 1000000, 14 / 24], output: { fraud: 0 } },
    { input: [1200 / 1000000, 10 / 24], output: { fraud: 0 } },
    { input: [10000 / 1000000, 16 / 24], output: { fraud: 0 } },
    { input: [25000 / 1000000, 12 / 24], output: { fraud: 0 } },
    
    // Normal transactions: Medium amounts, daytime
    { input: [50000 / 1000000, 11 / 24], output: { fraud: 0 } },
    { input: [75000 / 1000000, 15 / 24], output: { fraud: 0 } },

    // Suspicious transactions: Large amounts, very late at night (e.g. 2 AM - 4 AM)
    { input: [850000 / 1000000, 3 / 24], output: { fraud: 1 } },
    { input: [900000 / 1000000, 2 / 24], output: { fraud: 1 } },
    { input: [990000 / 1000000, 4 / 24], output: { fraud: 1 } },
    
    // Suspicious: Huge amounts during the day
    { input: [950000 / 1000000, 14 / 24], output: { fraud: 1 } }
];

// Train the network when the server starts
console.log("Training ML Fraud Detection Model...");
net.train(trainingData, {
    iterations: 20000,
    errorThresh: 0.005,
    log: true,
    logPeriod: 5000
});
console.log("ML Model Training Complete.");

/**
 * Predicts the probability of fraud for a given transaction.
 * @param {number} amount - The transaction amount in INR.
 * @returns {number} - The probability of fraud (0 to 1).
 */
function predictFraud(amount) {
    const currentHour = new Date().getHours();
    
    // Scale inputs to match training data
    const amountScaled = Math.min(amount / 1000000, 1); // Cap at 1
    const hourScaled = currentHour / 24;

    const result = net.run([amountScaled, hourScaled]);
    return result.fraud || 0; // Return the fraud score
}

module.exports = { predictFraud };
