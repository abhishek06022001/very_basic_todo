const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser());
app.listen(PORT, () => {
  console.log("Server started ");
});
// sample array of todo :)
var arr = [];
// get all the to dos
app.get("/to_do", (req, res) => {
  try {
    return res.status(200).json(arr);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//  delete the to_do
app.delete("/to_do/:id", (req, res) => {
  try {
    const { id } = req.params;

    arr = arr.filter((todo) => todo.id !== Number(id));
    return res.status(200).json({
      current_todos: arr,
      message: "did a delete request",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.put("/to_do/:id", (req, res) => {
  try {
    const { id } = req.params;
    const update_to_do = req.body;
    arr.forEach((todo) => {
      if (todo.id == id) {
        todo.name = update_to_do.name;
      }
    });
    return res.status(200).json({
      current_todos: arr,
      message: "did an update request",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/to_do", (req, res) => {
  try {
    const new_todo = req.body;
    let temp_arr = [...arr];

    let last_todo = arr.length == 0 ? -1 : temp_arr.slice(-1)[0].id;
    arr.push({ id: last_todo + 1, name: new_todo.name });
    return res.status(200).json({
      current_todos: arr,
      message: "did a post request",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
