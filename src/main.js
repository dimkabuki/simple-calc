import { getValues } from "./utils";
const form = document.querySelector(".js-form");
form.addEventListener("change", (e) => {
  console.log(e.target.value);
  console.dir(getValues(form));
});
// const element = document.createElement("div");
// element.textContent = "Hello World";
// element.className = "container";
// rootElement.appendChild(element);
