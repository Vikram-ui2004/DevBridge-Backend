// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnw8y4jzo",
  api_key: "766724918352966",
  api_secret: "uwLNcuWcaWUGv2o3nnq2PauxN0o",
});

module.exports = cloudinary;
