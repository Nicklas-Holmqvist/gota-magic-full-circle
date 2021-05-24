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

exports.getCategory = async (req, res) => {
  console.log(req.params.catName);
  try {
    const getCategory = await CategoryModel.findById(req.params.id);
    res.status(200).json(getCategory);
  } catch (error) {
    res.status(404).json("no category found");
  }
};
