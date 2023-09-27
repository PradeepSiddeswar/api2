const LoginProfile = require("../Model/LoginProfile_Model")


exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Content Cannot Be Empty");
        return;
    }

    // Check if the email already exists in the database
    const existingProfile = await LoginProfile.findOne({ email: req.body.email });

    if (existingProfile) {
        // If the email already exists, return a 409 Conflict response
        return res.status(409).json({ message: "Email already exists" });
    }

    // If the email is unique, create a new LoginProfile
    const newLoginProfile = new LoginProfile({
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
    });

    newLoginProfile
        .save()
        .then((data) => {
            res.status(201).json({ message: "Successfully Logged In", Data: newLoginProfile });
        })
        .catch((error) => {
            res.status(500).json({ message: "Internal server error", error });
        });
};



            //    GET all specialists
exports.get = async (req, res) => {
    try {
      const loginProfile = await LoginProfile.find();
      res.status(200).json({ message: "success", Data:  loginProfile });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  
  // delete method
  exports.delete = (req, res) => {
      const id = req.params.id
      LoginProfile.findByIdAndDelete(id)
          .then(data => {
              if (!data) {
                  res.status(400).send(`category not found with ${id}`)
              } else {
                  res.send("category deleted successfully")
              }
          })
          .catch(error => {
              res.status(500).send(error)
          })
  }