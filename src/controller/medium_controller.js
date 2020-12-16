const { asyncForEach } = require("../common/utils");
const { mediumCard } = require("../assets/card");
const { getUserData } = require("../route/api/medium");

async function parseToMediumCard(request) {
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
              width="${(limit == 1 ? width : 2 * width) +
      config.default.margin_left +
      config.card.spacing}" 
              version="1.2" 
              height="${Math.round(limit / 2) * height +
      config.default.margin_top * 2 +
      config.card.spacing * Math.floor(limit / 2)}"
              viewBox="0 0 ${(limit == 1 ? width : 2 * width) +
      config.default.margin_left +
      config.card.spacing} ${Math.round(limit / 2) * height +
      config.default.margin_top * 2 +
      config.card.spacing * Math.floor(limit / 2)}">`;
  await asyncForEach(
      resultData.slice(offset, offset + limit),
      request.query,
      async (blog, index, settings) => {
          if (index >= limit) {
              return;
          }
          const mediumCardObj = await mediumCard(blog, settings, index);
          result += `<g transform="translate(${(index % 2 ? width + config.card.spacing : 0) +
              config.default.margin_left}, ${Math.floor(index / 2) * height +
              config.default.margin_top +
              (index > 1 ? config.card.spacing * Math.floor(index / 2) : 0)})">${mediumCardObj}</g>`;
      }
  );

  result += `</svg>`;
  return result;
}

module.exports.parseToMediumCard = parseToMediumCard;