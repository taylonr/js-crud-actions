document.getElementById("submit").onclick = function (evt) {
  //   evt.preventDefault();
  const formData = new FormData(document.querySelector("form"));

  axios
    .post("/api/products", {
      name: formData.get("name"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      description: formData.get("description"),
      color: formData.get("color"),
    })
    .then(processResults);
};

function processResults({ data }) {
  document.querySelector("form").reset();
  window.alert(`${data.name} added with id: ${data.id}`);
}
