const LoginProfile = require("../Model/LoginProfile_Model")


exports.create = async(req, res) => {
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const newLoginProfile = new  LoginProfile({
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "",
        name: req.body.name,
        email: req.body.email,

    })
    newLoginProfile.save(newLoginProfile)
                   .then(data => {
                    res.status(200).json({ message: "success", Data: newLoginProfile});
                })
                   .catch(error => {
                    res.status(500).json({ message: "Internal server error", error });
                   })

                }


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