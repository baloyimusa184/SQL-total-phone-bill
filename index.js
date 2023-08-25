import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();
app.use(express.json());

app.use(express.static('public'));

const dbPromise = sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});

app.get('/api/price_plans', async function (_req, res) {
    const db = await dbPromise;
    const pricePlans = await db.all(`SELECT * FROM price_plan`);
    res.json({ pricePlans });
});

app.post('/api/price_plan/create', async function (req, res) {
    const { name, sms_cost, call_cost } = req.body;
    const db = await dbPromise;
    const sql = `INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES (?, ?, ?)`;

    try {
        await db.run(sql, [name, sms_cost, call_cost]);
        console.log('Price plan added successfully:', name);
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error adding price plan:', error);
        res.status(500).json({ error: 'An error occurred while adding the price plan.' });
    }
});

app.post('/api/price_plan/update', async function (req, res) {
    const { name, sms_cost, call_cost } = req.body;
    const db = await dbPromise;
    const sql = `UPDATE price_plan SET sms_price = ?, call_price = ? WHERE plan_name = ?`;

    try {
        await db.run(sql, [sms_cost, call_cost, name]);
        console.log('Price plan updated successfully:', name);
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error updating price plan:', error);
        res.status(500).json({ error: 'An error occurred while updating the price plan.' });
    }
});

app.post('/api/price_plan/delete', async function (req, res) {
    const { id } = req.body;
    const db = await dbPromise;
    const sql = `DELETE FROM price_plan WHERE id = ?`;

    try {
        await db.run(sql, [id]);
        console.log('Price plan deleted successfully:', id);
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error deleting price plan:', error);
        res.status(500).json({ error: 'An error occurred while deleting the price plan.' });
    }
});

app.post('/api/phonebill', async function (req, res) {
    const { price_plan, actions } = req.body;
    const db = await dbPromise;

    try {
        const pricePlan = await db.get(`SELECT * FROM price_plan WHERE plan_name = ?`, price_plan);
        if (!pricePlan) {
            throw new Error(`Price plan not found: ${price_plan}`);
        }

        const { sms_price, call_price } = pricePlan;
        const actionList = actions.split(', ');
        let total = 0;

        for (const action of actionList) {
            if (action === 'sms') {
                total += sms_price;
            } else if (action === 'call') {
                total += call_price;
            }
        }

        res.json({ total: total.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/phonebill/calculate', async function (req, res) {
    const { price_plan, actions } = req.body;

    try {
        const pricePlan = await db.get(`SELECT * FROM price_plan WHERE plan_name = ?`, price_plan);

        if (!pricePlan) {
            return res.status(404).json({
                error: 'Price plan not found'
            });
        }

        const { sms_price, call_price } = pricePlan;

        const actionList = actions.split(', ');
        let total = 0;

        for (const action of actionList) {
            if (action === 'sms') {
                total += sms_price;
            } else if (action === 'call') {
                total += call_price;
            }
        }

        res.json({
            total: total.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


const PORT = 6220;
app.listen(PORT, function () {
    console.log(`Price plan API began on port ${PORT}`);
});
