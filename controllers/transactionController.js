const express = require("express");
const router = express.Router();
const transactionsList = require("../models/transactions");

router.get("/", (req, res) => {
    res.status(200).send(transactionsList);
});

// get a transaction 

router.get("/:id", (req, res) => {
    const {id} = req.params;

    const transaction = transactionsList.find(item => item.id === +id)

    if (transaction){
        res.status(200).send(transaction)
    } else {
        res.status(404).json({error: `no transaction with id: ${id} not found`})
    }
})


// create
router.post("/", (req, res) => {
    const newTransaction = {...req.body, id : transactionsList.length + 1};
    transactionsList.push(newTransaction);
    res.json(transactionsList[transactionsList.length -1 ])
});


// destroy 

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const deletedTransaction = transactionsList.findIndex(transaction => transaction.id === +id);
    if (deletedTransaction !== -1) {
        transactionsList.splice(deletedTransaction, 1)
        res.redirect("/transactions")
    } else {
        res.status(404).send({error: "no transaction found partna"})
    }
})


// update 


router.put("/:id", (req, res) => {
    const {id} = req.params;
    const transaction = transactionsList.findIndex(item => item.id === +id)

    if (transaction !== -1 ) {
        transactionsList[transaction] = req.body;
        res.status(200).json(transactionsList[transaction])
    } else {
        res.status(404).send({error: "no transaction found partna"})
    }
})

module.exports = router;