/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

/**
 * App Variables
 */
const app = express();
const router = express.Router();
const port = process.env.PORT || "4200";

const frontend_path = "../../dist/skydrm-portal";

/**
 *  App Configuration
 */
app.use(express.static(path.join(__dirname, frontend_path)));

/**
 * Default Routes Definitions
 */
router.get("/", (req, res) => {
  res.sendFile(join(__dirname + frontend_path + "/index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
