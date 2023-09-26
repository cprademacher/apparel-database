const updateProductButton = document.querySelector(".update-button");
updateProductButton.addEventListener("click", () => {
  const postTitle = document.querySelector("#title").value;
  const postText = document.querySelector("#content").value;
  updatePost(postTitle, postText);
});
function updatePost(postTitle, postText) {
  const path = window.location.pathname;
  const pathSegments = path.split("/");
  const oldTitle = decodeURIComponent(pathSegments[2]);
  if (postTitle && postText && oldTitle) {
  console.log(postTitle, postText);
  fetch("/dashboard", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldTitle: oldTitle,
      content: postText,
      title: postTitle,
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
  }else {
    const updateMessage = document.querySelector("#message");
    console.log(updateMessage);
    updateMessage.style.display = "block";
  }
}