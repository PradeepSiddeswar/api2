const mongoose = require("mongoose");

const loginProfileSchema = new mongoose.Schema({
    image: String,
    name: String,
    email: String,

});

const LoginProfile = mongoose.model("LoginProfile", loginProfileSchema);

module.exports = LoginProfile;