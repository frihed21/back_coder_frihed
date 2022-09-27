const socket = io();

let chatInput = document.getElementById("chatInput");
let emailInput = document.getElementById("emailInput");
let btnMessage = document.getElementById("submitMessage");

let nombreProduct = document.getElementById("nombreProduct");
let priceProduct = document.getElementById("priceProduct");
let thumbnailProduct = document.getElementById("thumbnailProduct");
let btnProduct = document.getElementById("submitProduct");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();
  chatInput.value !== "" &&
    emailInput.value !== "" &&
    socket.emit("message", {
      email: emailInput.value,
      message: chatInput.value,
      date: new Date().toLocaleString(),
    });
});

btnProduct.addEventListener("click", (e) => {
  e.preventDefault();
  nombreProduct.value !== "" &&
    priceProduct.value !== "" &&
    thumbnailProduct.value !== "" &&
    socket.emit("productL", {
      nombre: nombreProduct.value,
      price: priceProduct.value,
      thumbnail: thumbnailProduct.value,
    });
});

socket.on("history", (data) => {
  logTa = document.getElementById("history");
  let messages = "";
  data.forEach((message) => {
    messages += `
    <small style="display:block">
     <strong style="color:#1109fe">${message.email}</strong>
     [<span style="color:#c1787b">${message.date}</span>] : 
     <span style="color:#49a273;font-style: italic">${message.message} </span>
    </small>
    `;
  });
  logTa.innerHTML = messages;
  chatInput.value = "";
  emailInput.value = "";
});

socket.on("historyProducts", (data) => {
  logTa = document.getElementById("table-body");
  let products = "";
  data.forEach((product) => {
    products += `
    <tr>
      <td>${product.id}</td>
      <td>${product.nombre}</td>
      <td>${product.price}</td>
      <td><img src=${product.thumbnail} alt="" width="50px" height="50px"></td>
    </tr>
    `;
  });
  logTa.innerHTML = products;
  nombreProduct.value = "";
  priceProduct.value = "";
  thumbnailProduct.value = "";
});

socket.on("newUserNotification", (data) => {
  alert("New user connected");
});
