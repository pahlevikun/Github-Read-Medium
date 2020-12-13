require("./src/common/config");
const { asyncForEach } = require("./src/common/utils");
const mediumCard = require("./src/assets/card");
const { getUserData } = require("./src/api/medium");
var express = require("express");
var app = express();
app.use(express.json());

app.get("/latest", async (request, response) => {
  try {
    if (!request.query.username) {
      response.write(
        JSON.stringify({
          error: "username is required",
        })
      );
      response.end();
      return;
    }

    const username = request.query.username;
    const offset = request.query.offset || 0;
    const width = request.query.width || config.card.width;
    const height = request.query.height || config.card.height;

    request.query.width = width;
    request.query.height = height;

    var resultData = await getUserData(username);
    const limit = request.query.limit == null ? config.default.limit 
      : request.query.limit > resultData.length ? resultData.length
        : request.query.limit;
    let result = `<svg>`;

    result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="${
                (limit == 1 ? width : 2 * width) +
                config.default.margin_left +
                config.card.spacing
              }" 
              version="1.2" 
              height="${
                Math.round(limit / 2) * height +
                config.default.margin_top * 2 +
                config.card.spacing * Math.floor(limit / 2)
              }"
              viewBox="0 0 ${
                (limit == 1 ? width : 2 * width) +
                config.default.margin_left +
                config.card.spacing
              } ${
      Math.round(limit / 2) * height +
      config.default.margin_top * 2 +
      config.card.spacing * Math.floor(limit / 2)
    }">`;
    await asyncForEach(
      resultData.slice(offset, offset + limit),
      request.query,
      async (blog, index, settings) => {
        if (index >= limit) {
          return;
        }
        const mediumCardObj = await mediumCard(blog, settings, index);
        result += `<g transform="translate(${
          (index % 2 ? width + config.card.spacing : 0) +
          config.default.margin_left
        }, ${
          Math.floor(index / 2) * height +
          config.default.margin_top +
          (index > 1 ? config.card.spacing * Math.floor(index / 2) : 0)
        })">${mediumCardObj}</g>`;
      }
    );

    result += `</svg>`;

    response.setHeader(
      "Cache-Control",
      "public, no-cache, no-store, must-revalidate"
    );
    response.setHeader("Expires", "-1");
    response.setHeader("Pragma", "no-cache");
    response.writeHead(200, { "Content-Type": "image/svg+xml" });

    response.write(result);
    response.end();
  } catch (error) {
    console.log(error);
    response.send("Error while fetching the data" + error);
  }
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening " + port);
});
