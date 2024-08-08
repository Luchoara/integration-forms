const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Origin local para desarrollo
  "https://integration-forms.vercel.app" // Agrega aquí tu dominio de Vercel cuando esté desplegado
];

app.use(cors({
  origin: allowedOrigins,
  methods: "POST",
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

const API_URL = "https://api.routingapi.com/rtbs.json?key=ab514634-6955-4f94-9e22-5de033366d2f"; 

app.post("/proxy", (req, res) => {
  const { publisher_id, caller_number, first_name, last_name, address, city, state, zip_code, email } = req.body;

  const url = `${API_URL}&publisher_id=${publisher_id}&caller_number=${caller_number}&first_name=${first_name}&last_name=${last_name}&address=${address}&city=${city}&state=${state}&zip_code=${zip_code}&email=${email}`;

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


