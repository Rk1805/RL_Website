const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const BASE_URL =
  "https://www.rosewoodlaminates.com/ajax/our-products.php";

const BRANDS = {
  arica: 1,
  ranberry: 2,
  ranwood: 3,
};

const TOTAL_PAGES = 9;

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`❌ Failed: ${url}`);
      return false;
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    );

    fs.writeFileSync(filepath, buffer);

    console.log(`✓ ${path.basename(filepath)}`);

    return true;
  } catch (err) {
    console.log(`❌ ${url}`);
    console.log(err.message);
    return false;
  }
}

async function scrapeBrand(brandName, catId) {
  console.log(`\n`);
  console.log("=".repeat(60));
  console.log(`SCRAPING ${brandName.toUpperCase()}`);
  console.log("=".repeat(60));

  const brandFolder = path.join(
    process.cwd(),
    "catalogue",
    brandName
  );

  fs.mkdirSync(brandFolder, {
    recursive: true,
  });

  let totalProducts = 0;

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    try {
      const form = new URLSearchParams({
        action: "page",
        catId: String(catId),
        pageNum: String(page),
        fid: "",
        product_code: "",
      });

      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: form,
      });

      const html = await response.text();

      const $ = cheerio.load(html);

      const products = [];

      $(".prodListWrp li").each((_, el) => {
        const a = $(el).find("a");

        const code = a.attr("title");
        const image = a.attr("href");

        if (!code || !image) return;

        products.push({
          code,
          image,
        });
      });

      console.log(
        `Page ${page}: ${products.length} products`
      );

      totalProducts += products.length;

      for (const product of products) {
        const ext =
          path.extname(
            new URL(product.image).pathname
          ) || ".jpg";

        const filePath = path.join(
          brandFolder,
          `${product.code}${ext}`
        );

        if (fs.existsSync(filePath)) {
          continue;
        }

        await downloadImage(
          product.image,
          filePath
        );

        await new Promise((r) =>
          setTimeout(r, 150)
        );
      }
    } catch (err) {
      console.log(
        `❌ Page ${page} failed`
      );
      console.log(err.message);
    }
  }

  console.log(
    `\n${brandName}: ${totalProducts} products found`
  );
}

async function main() {
  for (const [brand, catId] of Object.entries(
    BRANDS
  )) {
    await scrapeBrand(brand, catId);
  }

  console.log("\n");
  console.log("🎉 DONE");
}

main();