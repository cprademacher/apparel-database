const updateProductButton = document.querySelector(".update-button");
updateProductButton.addEventListener("click", (event) => {
  const categoryId = event.target.getAttribute("category-id");
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const productId = decodeURIComponent(pathSegments[3]);
  showForm(categoryId, productId);
});

function showForm(categoryId, productId) {
  const productForm = document.querySelector(".update-product-form");

  productForm.style.display = "block";
  const fileInput = document.getElementById("update-product-url");
  const productSubmitButton = document.querySelector(".update-product-button");
  productSubmitButton.addEventListener("click", () => {
    const updatedProductName = document.querySelector(
      ".update-product-name"
    ).value;
    const updatedProductStock = document.querySelector(
      ".update-product-stock"
    ).value;
    const updatedProductPrice = document.querySelector(
      ".update-product-price"
    ).value;
    let updatedProductUrl = "";
    let updatedProductImage = "";

    if (fileInput.files[0]) {
      updatedProductUrl = "/assets/" + fileInput.files[0].name;
       updatedProductImage = fileInput.files[0];
    }
    const formData = new FormData();
    if (fileInput.files[0]) {
      formData.append("url", updatedProductUrl);
      formData.append("mypic", updatedProductImage);
    }
    formData.append("product_name", updatedProductName);
    formData.append("stock", updatedProductStock);
    formData.append("price", updatedProductPrice);
    formData.append("category_id", categoryId);
    formData.append("category_id", productId);

    updateProduct(productId, categoryId, formData);
  });
}

function updateProduct(productId, categoryId, formData) {
  if (productId && categoryId) {
    fetch(`/api/products/${productId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        console.log("updateProduct", response);
        if (response.ok) {
          if (response.redirected) {
            window.location.assign(response.url);
            return;
          }
          return response.json();
        } else {
          throw new Error("Failed to update post");
        }
      })
      .then((updatedProduct) => {
        console.log("New post:", updatedProduct);
        window.location.assign(`/api/category/${categoryId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
