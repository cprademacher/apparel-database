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
    const updatedProductUrl = fileInput.files[0];
    if (updatedProductUrl) {
      console.log("Selected file:", updatedProductUrl);
      updateProduct(
        productId,
        categoryId,
        updatedProductName,
        updatedProductStock,
        updatedProductPrice,
        updatedProductUrl
      );
    } else {
      alert("Please select a file before uploading.");
    }
  });
}

function updateProduct(
  productId,
  categoryId,
  updatedProductName,
  updatedProductStock,
  updatedProductPrice,
  updatedProductUrl
) {
  if (
    productId &&
    categoryId &&
    updatedProductName &&
    updatedProductStock &&
    updatedProductPrice &&
    updatedProductUrl
  ) {
    fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: updatedProductName,
        stock: updatedProductStock,
        price: updatedProductPrice,
        url: "/assets/" + updatedProductUrl.name,
      }),
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
  // else {
  //   const updateMessage = document.querySelector("#message");
  //   console.log(updateMessage);
  //   updateMessage.style.display = "block";
  // }
}
