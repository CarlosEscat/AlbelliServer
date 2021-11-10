const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

//Routes
//Add a new advertisement
app.post("/advertisements", async (req, res) => {
  try {
    const { title, valid_until, link } = req.body;
    const newAdvertisement = await pool.query(
      `INSERT INTO advertisements (title, valid_until, link) VALUES($1, $2, $3) RETURNING *`,
      [title, valid_until, link]
    );
    res.json(newAdvertisement.rows[0]);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});
//Get all advertisements
app.get("/advertisements", async (req, res) => {
  try {
    const allAdvertisements = await pool.query("SELECT * FROM advertisements");
    res.json(allAdvertisements.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update an advertisement
app.put("/advertisements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, valid_until, link } = req.body;
    const updateAdvertisement = await pool.query(
      `UPDATE advertisements SET title = $1, valid_until = $2, link = $3 WHERE _id = $4`,
      [title, valid_until, link, id]
    );

    res.json("Advertisements was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//Delete an advertisement
app.delete("/advertisements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdvertisements = await pool.query(
      "DELETE FROM advertisements WHERE _id = $1",
      [id]
    );
    res.json("Advertisement was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  console.log(`Server has started on port ${port}`);
});
