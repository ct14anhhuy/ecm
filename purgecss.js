const { PurgeCSS } = require("purgecss");
const fs = require("fs");

(async () => {
  const results = await new PurgeCSS().purge("./purgecss.config.js");

  results.forEach((result) => {
    const { css, file } = result;

    fs.stat(file, (error, originalFileStats) => {
      fs.writeFileSync(file, css);
      const newFileStats = fs.statSync(file);
      console.log(
        "\x1b[32m",
        `PurgeCSS saved ${Math.round(
          (originalFileStats.size - newFileStats.size) / 1000
        )}kb on ${file}`
      );
    });
  });
})();
