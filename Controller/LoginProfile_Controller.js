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
  
  exports.update = async (req, res) => {
    const profileId = req.params.id; // Extract the profile ID from the URL
    const { newId, image, name, email } = req.body; // Extract fields from the request body

    try {
        // Check if the new ID is provided and unique
        if (newId) {
            const isIdUnique = await isIdAvailable(newId); // Implement a function to check ID uniqueness
            if (!isIdUnique) {
                return res.status(409).json({ message: "New ID is already in use" });
            }
        }

        // Find the profile by its existing ID
        const existingProfile = await LoginProfile.findById(profileId);

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Update the profile fields, including the ID if provided
        if (newId) {
            existingProfile._id = newId;
        }
        existingProfile.image = image;
        existingProfile.name = name;
        existingProfile.email = email;

        // Save the updated profile
        const updatedProfile = await existingProfile.save();

        res.status(200).json({ message: "Profile updated successfully" });
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