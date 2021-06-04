const express = require("express");
const CategoryModel = require("./model");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(503).json("naa not working yo");
  }
};
