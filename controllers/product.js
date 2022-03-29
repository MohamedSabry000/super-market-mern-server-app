const mongoose = require('mongoose');
const Product = require("../models/product");
module.exports = {
    getProduct: async (req, res) => {
        console.log('getProduct');
    },
    createProduct: async (req, res) => {
        console.log('createProduct');
    }
    , updateProduct: async (req, res) => {
        console.log('updateProduct');
    },
    updateProduct: async (req, res) => {
        console.log('updateProduct');
    },
    deleteProduct: async (req, res) => {
        console.log('deleteProduct');
    }


}

