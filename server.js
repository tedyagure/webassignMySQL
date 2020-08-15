const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// db.authenticate()
//     .then(() => console.log("Connected"))
//     .catch((err) => console.log(err));

const { User } = require("./db");

app.get("/", (req, res) =>
  res.send("Welcome to Node.js + MySQL boilerplate API.")
);

app.get("/users", (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
});

app.post("/file/upload", uploadStrategy, (req, res) => {
  try {
    axios
      .post("https://tedyfunc.azurewebsites.net/api/HttpTrigger1", {
        filedata: req.file.buffer,
        filename: req.file.originalname,
      })
      .then((Res) => {
        if (Res.status === 200) {
          return res.status(200).json({
            message: "Image Uploaded!",
            statusCode: 200,
          });
        } else {
          throw error;
        }
      })
      .catch((e) => {
        return res.status(200).json({
          message: "Image Upload failed!",
          statusCode: 400,
        });
        console.error(e);
      });
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});