import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.post("/table", (req, res) => {});

const port = 8090;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
