import { Translator } from "./Model/Translator.js";

fetch('http://localhost:8080/assets/diccionario.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('La red esta malaaa');
    }
    return response.json(); 
  })
  .then(data => {
    localStorage.setItem("diccionario",JSON.stringify(data[0]));
  })
  .catch(error => {
    console.error('murio el fetch', error);
});

let input = document.querySelector('#to_translate');
let btn=document.querySelector('#send_btn');
let user_translator=new Translator(JSON.parse(localStorage.getItem("diccionario")),{});
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    user_translator.translate(input.value);
    pageScroll();
    input.value="";
  } 
});
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    user_translator.translate(input.value);
    pageScroll();
    input.value=""; 
});
function pageScroll() {
    document.querySelector(".messages").scrollTo({ top: document.querySelector(".messages").scrollHeight, behavior: 'smooth' });
}
