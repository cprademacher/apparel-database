const deleteProductButton = document.querySelector(".delete-button");
deleteProductButton.addEventListener("click", () => {
  deletePost();
});
function deletePost() {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const oldTitle = decodeURIComponent(pathSegments[2]);
  fetch(`/dashboard`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldTitle: oldTitle,
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
        throw new Error("Failed to update post");
      }
    })
    .then((updatedPost) => {
      console.log("New post:", updatedPost);
      window.location.assign(`/dashboard`);
    })
    .catch((error) => {
      console.error(error);
    });
}