const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Stock portfolio analysis API!');
});

function calculateReturns(boughtAt, marketPrice, quantity){
    return (marketPrice - boughtAt) * quantity;
}

function calculateTotalReturns(stock1, stock2, stock3, stock4) {
    return stock1 + stock2 + stock3 + stock4;
}

function calculateReturnPercentage(boughtAt, returns) {
    return (returns/boughtAt) * 100;
}

function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4) {
    return stock1 + stock2 + stock3 + stock4;
}

// GET /calculate-returns => Calculate the Returns of the Stocks added
app.get('/calculate-returns', (req, res) => {
    let boughtAt = parseFloat(req.query.boughtAt);
    let marketPrice = parseFloat(req.query.marketPrice);
    let quantity = parseFloat(req.query.quantity);

    try {
        let result = calculateReturns(boughtAt, marketPrice, quantity);
        res.status(200).send(result.toString());
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// GET /total-returns => Calculate the Total Returns
app.get('/total-returns', (req, res) => {
    let stock1 = parseFloat(req.query.stock1);
    let stock2 = parseFloat(req.query.stock2);
    let stock3 = parseFloat(req.query.stock3);
    let stock4 = parseFloat(req.query.stock4);

    try {
        let result = calculateTotalReturns(stock1, stock2, stock3, stock4);
        res.status(200).send(result.toString());
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// GET /calculate-return-percentage => Calculate the Return Percentage
app.get('/calculate-return-percentage', (req, res) => {
    let boughtAt = parseFloat(req.query.boughtAt);
    let returns  = parseFloat(req.query.returns);

    try {
        let result = calculateReturnPercentage(boughtAt, returns);
        res.status(200).send(result.toString());
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// GET /total-return-percentage => Calculate the Total Return Percentage
app.get('/total-return-percentage', (req, res) => {
    let stock1 = parseFloat(req.query.stock1);
    let stock2 = parseFloat(req.query.stock2);
    let stock3 = parseFloat(req.query.stock3);
    let stock4 = parseFloat(req.query.stock4);

    try {
        let result = calculateTotalReturnPercentage(stock1, stock2, stock3, stock4);
        res.status(200).send(result.toString());
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

// GET /status => Identify the Status of Stocks based on their Return Value
app.get('/status', (req, res) => {
    let returnPercentage = parseFloat(req.query.returnPercentage);

    try {
        let result = returnPercentage > 0 ? 'profit' : 'loss';
        res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});