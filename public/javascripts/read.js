document.getElementsByTagName("button")[0].onclick = function () {
  const results = document.getElementById("results");
  const value = document.getElementById("product-id").value;

  axios.get(`/api/products/${value}`).then(updateTemplate);
};

function updateTemplate({ data }) {
  const template = document.querySelector("#result");
  const currentProduct = document.getElementById("product-result");
  if (currentProduct) {
    currentProduct.remove();
  }

  const clone = template.content.cloneNode(true);
  clone.querySelector("#title").textContent = data.name;
  clone.querySelector("#price").textContent = data.price;
  clone.querySelector("#quantity").textContent = data.quantity;
  clone.querySelector("#color").textContent = data.color;
  clone.querySelector("#description").textContent = data.description;

  results.appendChild(clone);
}
