const btn = document.getElementById("btn"),
  container = document.querySelector(".container"),
  qrDiv = document.querySelector(".qr"),
  qrImg = document.querySelector(".qr img"),
  text = document.getElementById("text"),
  Donwlaod = document.getElementById("Donwlaod"),
  fileInpu = document.getElementById("file"),
  selectImg = document.querySelector(".cloud"),
  upload = document.querySelector(".upload"),
  p = selectImg.querySelector("p"),
  textarea = document.querySelector("textarea"),
  copyBtn = document.getElementById("copy"),
  closeBtn = document.getElementById("close");

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
    container.style.height = "550px";
    qrDiv.style.opacity = "1";
  });
}

Donwlaod.onclick = (eo) => {
  Donwlaod.href = qrImg.src;
};

selectImg.onclick = () => {
  fileInpu.click();
};
fileInpu.addEventListener("change", (eo) => {
  let file = eo.target.files[0];
  if (!file) return;
  form = new FormData();
  form.append("file", file);
  getData(form, file);
});
function getData(form, file) {
  p.innerHTML = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((resul) => {
      resul = resul[0].symbol[0].data;
      p.innerHTML = resul
        ? "Upload QR Code to Scan"
        : "Sorry We Couldn't Scan ";
      if (!resul) return;
      textarea.innerHTML = resul;
      selectImg.querySelector("img").src = URL.createObjectURL(file);
      upload.classList.add("show");
      selectImg.querySelector(".imgg").classList.add("activ");
    })
    .catch(() => {
      p.innerHTML = "Sorry We Couldn't Scan ";
    });
}
copyBtn.onclick = () => {
  let value = textarea.textContent;
  navigator.clipboard.writeText(value);
};
closeBtn.onclick = () => {
  upload.classList.remove("show");
  selectImg.querySelector(".imgg").classList.remove("activ");
};
