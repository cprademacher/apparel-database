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

  const productSubmitButton = document.querySelector(".new-product-button");
  productSubmitButton.addEventListener("click", () => {
    const newProductName = document.querySelector(".new-product-name").value;
    const newProductStock = document.querySelector(".new-product-stock").value;
    const newProductPrice = document.querySelector(".new-product-price").value;
    const newProductUrl = document.querySelector(".new-product-url").value;
    submitProduct(
      categoryId,
      newProductName,
      newProductPrice,
      newProductStock,
      newProductUrl
    );
  });
}

function submitProduct(
  categoryId,
  newProductName,
  newProductPrice,
  newProductStock,
  newProductUrl
) {
  if (categoryId && newProductName && newProductPrice && newProductStock) {
    fetch("/api/products/new-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: categoryId,
        product_name: newProductName,
        price: newProductPrice,
        stock: newProductStock,
        url: newProductUrl,
      }),
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
