const express = require('express');
const ProductModel = require('./model')

// Get all products from api
exports.getAllProducts = async (_, res) => {
    try {
        // Populate skriver man det objekt.titel man vill fylla
        const products = await ProductModel.find({}).populate('categories');
        res.status(200).json(products) 
    } catch (error) {
        res.status(503).json('No database connection')
    }       
}

// Get one product from para
exports.getSpecProduct = async (req, res) => {
    try {
        const getProduct = await ProductModel.findById(req.params.id); 
        res.status(200).json(getProduct) 
    } catch (error) {
        res.status(404).json('No product found')
    }
}

// Update stocks
exports.updateStock = async (req, res) => {
    const updateProductStock = {stock: req.body.stock}

    try {
        const getProduct = await ProductModel.findById(req.params.id); 
        if(getProduct) {
            await ProductModel.findByIdAndUpdate({ _id: req.params.id }, updateProductStock)
            res.status(200).json('Product stock has been updated')
        } else {
            res.status(400).json('No product')
        }
    } catch (error) {
        res.status(404).json('No product to update!')        
    }    
}