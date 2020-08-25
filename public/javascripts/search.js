document.getElementById("search").onclick = function () {
  var textValue = document.getElementById("search-terms").value;
  var priceValue = document.getElementById("price").value;
  var colorValue = document.getElementById("color").value;

  if (priceValue === "" && colorValue === "") {
    axios.get(`/api/products/search?keywords=${textValue}`).then(showResults);
  } else {
    let rootQuery = `/api/products/detailSearch?`;
    let priceQuery = "";
    let colorQuery = "";

    if (textValue) {
      rootQuery += `name[val]=${textValue}`;
    }

    if (priceValue) {
      if (textValue) priceQuery = "&";

      priceQuery += `price[op]=lt&price[val]=${priceValue}`;
    }

    if (colorValue) {
      if (priceValue || textValue) colorQuery = "&";

      colorQuery += `color[op]=eq&color[val]=${colorValue}`;
    }

    const query = `${rootQuery}${priceQuery}${colorQuery}`;

    axios.get(query).then(showResults);
  }
};
function showResults({ data }) {
  document.querySelector("h2").className = "hidden";

  const productList = document.getElementById("product-list");
  if (productList) {
    productList.remove();
  }

  if (data.length === 0) {
    document.querySelector("h2.hidden").className = "";
  }

  const template = document.querySelector("#list-result");
  const clone = template.content.cloneNode(true);

  const ul = clone.querySelector("ul");
  data.forEach((d) => {
    const li = clone.querySelector("li").cloneNode(true);
    const id = li.querySelector("#product-id");
    id.textContent = d.id;
    id.onclick = (e) => {
      document.getElementById("product-id").value = e.currentTarget.textContent;
    };
    li.querySelector("#product-name").textContent = d.name;
    li.querySelector("#product-price").textContent = d.price;

    ul.appendChild(li);
  });

  results.appendChild(clone);
}
