const deleteProductButton = document.querySelector(".delete-button");
deleteProductButton.addEventListener("click", (event) => {
  const categoryId = event.target.getAttribute("category-id");
  deletePost(categoryId);
});

function deletePost(categoryId) {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const productId = decodeURIComponent(pathSegments[3]);
  fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: productId,
    }),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        if (response.redirected) {
          window.location.assign(response.url);
          return;
        }
        return response.json();
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .then((updatedProduct) => {
      console.log("New product:", updatedProduct);
      window.location.assign(`/api/category/${categoryId}`);
    })
    .catch((error) => {
      console.error(error);
    });
}
