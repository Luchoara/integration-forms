const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const API_URL =
	"https://api.routingapi.com/rtbs.json?key=bc86197f-e418-4893-9af4-0f625ae361f2"; // 803 - 803/809 ACA - CAMPAIGN

app.post("/proxy", (req, res) => {
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

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Proxy server running on http://localhost:${PORT}`);
});
