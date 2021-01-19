const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();
const Video = require("./model/videos");
const VideoInfo = new Video();
app.use(cors());
const bodyParser = require("body-parser");
const upload = require("./data.json");
app.use(bodyParser.json());

// app.get("/", (_req, res) => {
//   res.send(`Listening on port ${PORT}`);
// });

app.get("/videos", async function (_req, res) {
  const videos = await VideoInfo.getVideos();
  res.status(200).json(videos);
});

app.get("/videos/:id", async function (req, res) {
  const videos = await VideoInfo.getVideoDetailsById(req.params["id"]);

  res.status(200).json(videos);
});

app.post("/videos", (req, res) => {
  upload.videos.push(req.body);
  res.send(upload.videos);
});

// Setting up for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
