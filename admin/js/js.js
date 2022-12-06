const handleLogout = () => {
  if (confirm("Are you sure to logout?")) {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  }
};

window.onload = () => {
  if (localStorage.loggedInUser) {
    const loggedInUser = JSON.parse(localStorage.loggedInUser);
    if (loggedInUser.username != "iraguhamarthe@gmail.com") {
      window.location = "../index.html";
    }
  } else {
    window.location = "../index.html";
  }

  const blogs = JSON.parse(localStorage.getItem("blogs"));
  const blogTableBody = document.getElementById("tableBody");
  blogTableBody.innerHTML = "";
  for (i = 0; i < blogs.length; i++) {
    const blog = `<tr><td><span><img class="blog-image" src="${blogs[i].image}" alt="blog image"/></span></td><td>${blogs[i].title}</td><td>${blogs[i].description}</td><td class="icons">
                      <span title="edit"><i class="fa fa-pencil"></i></span>
                      <span title="view"><i class="fa fa-eye"></i></span><span title="Delete"><i class="fa fa-trash"></i></span></td>
                  </tr>`;
    blogTableBody.innerHTML = blogTableBody.innerHTML + blog;
  }
};
const saveBlog = document.getElementById("saveBlog");
const blogTitle = document.getElementById("titleInput");
const blogContent = document.getElementById("contentInput");
const blogImage = document.getElementById("imageInput");

saveBlog.addEventListener("submit", (e) => {
  e.preventDefault();
  const time = new Date();
  date = time.toDateString();
  const newBlog = {
    title: blogTitle.value,
    description: blogContent.value,
    image: blogImage.value,
    postDate: date,
  };
  const savedBlog = JSON.parse(localStorage.getItem("blogs"));
  savedBlog.push(newBlog);
  localStorage.setItem("blogs", JSON.stringify(savedBlog));
  blogTitle.value = "";
  blogContent.value = "";
  blogImage.value = "";
});
