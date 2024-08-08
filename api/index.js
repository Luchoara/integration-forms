const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL = "https://api.routingapi.com/rtbs.json?key=ab514634-6955-4f94-9e22-5de033366d2f";

app.post("/api/proxy", (req, res) => {
  const { publisher_id, caller_number } = req.body;

  const url = `${API_URL}&publisher_id=${publisher_id}&caller_number=${caller_number}`;

  request.post(
    {
      url: url,
      json: true,
      body: req.body,
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(response.statusCode).send(body);
    }
  );
});

module.exports = app;
