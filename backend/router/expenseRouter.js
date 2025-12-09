const { createExpense, deleteExpense, getCategoryExpense, getAllExpenses, emailSender, singleDataExapence, getSalary } = require('../controller/expenseController');

const router = require('express').Router();

router.post('/addExpense',createExpense)
router.post('/deleteExpense',deleteExpense)
router.get('/categoryExpense',getCategoryExpense)
router.post('/allExpenses',getAllExpenses)
router.post('/sendEmail',emailSender);
router.post('/single-expence',singleDataExapence)
router.get('/salary',getSalary)

module.exports = router;