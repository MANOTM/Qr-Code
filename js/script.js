const btn = document.getElementById("btn"),
  container = document.querySelector(".container"),
  qrDiv = document.querySelector(".qr"),
  qrImg = document.querySelector(".qr img"),
  text = document.getElementById("text");

btn.addEventListener("click", (eo) => {
  let value = text.value.trim();
  if (!value) return;
  getImg(value);
});
text.addEventListener("keyup", (eo) => {
  let value = text.value.trim();
  if (eo.key == "Enter") {
    getImg(value);
  }
  if (!text.value) {
    container.style.height = "250px";
    qrDiv.style.opacity = "0";
    btn.classList.remove("activ");
  }
  if (text.value) {
    btn.classList.add("activ");
  }
});
function getImg(value) {
  btn.innerText = "Generatar Qr Code..";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`;
  qrImg.addEventListener("load", () => {
    btn.innerText = "Generatar Qr Code";
    container.style.height = "500px";
    qrDiv.style.opacity = "1";
  });
}
