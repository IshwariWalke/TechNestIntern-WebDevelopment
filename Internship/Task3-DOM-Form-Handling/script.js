const form = document.getElementById("feedbackForm");
const commentsList = document.getElementById("commentsList");

const nameRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Load comments from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(comment => renderComment(comment));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!nameRegex.test(name)) {
    alert("Invalid name.");
    return;
  }
  if (!emailRegex.test(email)) {
    alert("Invalid email.");
    return;
  }
  if (message.length < 5) {
    alert("Message too short.");
    return;
  }

  const comment = { name, email, message };

  // Save to localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.push(comment);
  localStorage.setItem("comments", JSON.stringify(savedComments));

  renderComment(comment);
  form.reset();
});

function renderComment({ name, email, message }) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong> (${email}) says:<br>${message}`;
  commentsList.appendChild(li);
}
