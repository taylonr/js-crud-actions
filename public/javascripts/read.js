document.getElementById("load").onclick = function () {
  const value = document.getElementById("product-id").value;
  if (value === "") {
    axios.get("/api/products").then(addList);
  } else {
    axios
      .get(`/api/products/${value}`)
      .then(addSingle)
      .catch((err) => {
        if (err.response.status === 404) {
          notFound();
        }
      });
  }
};

function addList({ data }) {
  resetContentArea();

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

function addSingle({ data }) {
  resetContentArea();
  const template = document.querySelector("#result");

  const clone = template.content.cloneNode(true);
  clone.querySelector("#title").textContent = data.name;
  clone.querySelector("#price").textContent = data.price;
  clone.querySelector("#quantity").textContent = data.quantity;
  clone.querySelector("#color").textContent = data.color;
  clone.querySelector("#description").textContent = data.description;

  results.appendChild(clone);
}

function notFound() {
  resetContentArea();

  const h2 = document.querySelector("h2.hidden");
  h2.className = "";
}

function resetContentArea() {
  document.querySelector("h2").className = "hidden";
  const currentProduct = document.getElementById("product-result");
  if (currentProduct) {
    currentProduct.remove();
  }
  const productList = document.getElementById("product-list");
  if (productList) {
    productList.remove();
  }
}
