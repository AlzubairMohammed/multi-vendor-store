const SubCategory = require("../models");
const path = require("path");
const fs = require("fs");
let fileName;

exports.getSubCategories = (req, res) => {
  SubCategory.findAll({
    include: ["product"],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSubCategory = async (req, res) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findOne({ where: { id } });
  console.log(subCategory);
  subCategory
    ? res.status(200).json(subCategory)
    : res.status(404).json({ msg: "subcategory not found" });
};

exports.createSubCategory = (req, res) => {
  const { name, sections_id } = req.body;
  const { files } = req;
  const undefinedError = {};
  if (!name)
    (undefinedError.err = true), (undefinedError.name = "you must to add name");
  if (!files)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add image");
  if (!sections_id)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add section");
  if (undefinedError.err) return res.status(404).json(undefinedError);
  Object.keys(files).forEach((key) => {
    fileName = Date.now() + files[key].name + "";
    const filepath = path.join(__dirname, "../uploads", fileName);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });
  const subCategory = SubCategory.create({
    name,
    image: fileName,
    sections_id,
  });
  subCategory
    ? res.status(200).json({ msg: "subcategory created" })
    : res.status(500);
};

exports.updateSubCategory = (req, res) => {
  const { name, sections_id } = req.body;
  const files = req;
  const id = req.params.id;
  const undefinedError = {};
  if (!name)
    (undefinedError.err = true), (undefinedError.name = "you must to add name");
  if (!files)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add image");
  if (!sections_id)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add section");
  if (undefinedError.err) return res.status(404).json(undefinedError);
  SubCategory.update(
    {
      name,
      image,
      sections_id,
    },
    {
      where: { id },
    }
  );
  res.json({ success: true, msg: `subCategory updated` });
};

exports.deleteSubCategory = (req, res) => {
  res.json({ msg: `subCategory ${req.params.id} deleted` });
};
