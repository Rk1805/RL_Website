const BASE_URL =
  "https://www.rosewoodlaminates.com/ajax/our-products.php";

async function test() {
  const form = new URLSearchParams({
    action: "page",
    catId: "2",
    pageNum: "1",
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

  console.log(html.substring(0, 1000));
}

test();