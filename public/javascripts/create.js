document.getElementById("submit").onclick = function (evt) {
  evt.preventDefault();

  const form = document.querySelector("form");

  const isValid = form.checkValidity();

  if (!isValid) {
    var err = {
      response: {
        data: [
          {
            field: "name",
            message: "Name is required",
          },
        ],
      },
    };

    handleErrors(err);
    return;
  }

  const formData = new FormData(form);

  axios
    .post("/api/products", {
      name: formData.get("name"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      description: formData.get("description"),
      color: formData.get("color"),
    })
    .then(processResults)
    .catch(handleErrors);
};

function handleErrors({ response }) {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }

  const errors = response.data;
  for (let i = 0; i < errors.length; i++) {
    const { field, message } = errors[i];
    const element = document.getElementsByName(field)[0].nextElementSibling;
    element.textContent = message;
  }
}

function processResults({ data }) {
  document.querySelector("form").reset();
  window.alert(`${data.name} added with id: ${data.id}`);
}
