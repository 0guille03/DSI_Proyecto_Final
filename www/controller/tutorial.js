const back_button = document.querySelector("#back_div");

//function to go back to main page
back_button.addEventListener("click", function() {
  console.log("click");
  window.location.href = "selector.html";
});
