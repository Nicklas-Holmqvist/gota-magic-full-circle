const express = require('express');
const ShippingModel = require('./model')

// Get all shippingMethods
exports.getShippingMethod = async (_, res) => {
    try {
        const shippingMethod = await ShippingModel.find({});
        res.status(200).json(shippingMethod)
    } catch (error) {
        res.status(503).json('No database connection')
    }
}