const addProductButton = document.querySelector(".add-button");
addProductButton.addEventListener("click", () => {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const categoryId = decodeURIComponent(pathSegments[3]);
  showForm(categoryId);
});

function showForm(categoryId) {
  const productForm = document.querySelector(".new-product-form");

  productForm.style.display = "block";
  const fileInput = document.getElementById("new-product-url");
  const productSubmitButton = document.querySelector(".new-product-button");
  productSubmitButton.addEventListener("click", () => {
    const newProductName = document.querySelector(".new-product-name").value;
    const newProductStock = document.querySelector(".new-product-stock").value;
    const newProductPrice = document.querySelector(".new-product-price").value;
    const newProductUrl = "/assets/" + fileInput.files[0].name;
    const newProductImage = fileInput.files[0];
    const formData = new FormData();

    formData.append("mypic", newProductImage);
    formData.append("product_name", newProductName);
    formData.append("stock", newProductStock);
    formData.append("price", newProductPrice);
    formData.append("url", newProductUrl);
    formData.append("category_id", categoryId);

    submitProduct(categoryId, formData);
  });
}

function submitProduct(categoryId, formData) {
  if (formData) {
    fetch("/api/products/new-product", {
      method: "POST",

      body: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create product");
        }
      })
      .then((newProduct) => {
        console.log("New product:", newProduct);
        window.location.assign(`/api/category/${categoryId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    const updateMessage = document.querySelector("#message");
    console.log(updateMessage);
    updateMessage.style.display = "block";
  }
}
