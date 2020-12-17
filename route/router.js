const { parseToMediumCard } = require("../controller/medium_controller");
var router = require("express").Router();

router.get("/latest", async (request, response) => {
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
  
      const result = await parseToMediumCard(request);
  
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

module.exports = router;