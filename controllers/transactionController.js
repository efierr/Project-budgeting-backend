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