import { Translator } from "../model/Translator.js";
import { Helper } from "../model/Helper.js";
async function fetchDataAndSetLocalStorage() {
await fetch('/api/dic')
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
await fetch('/api/dic_e')
  .then(response => {
    if (!response.ok) {
      throw new Error('La red esta malaaa');
    }
    return response.json(); 
  })
  .then(data => {
     localStorage.setItem("diccionario_elfo",JSON.stringify(data[0]));
  })
  .catch(error => {
    console.error('murio el fetch', error);
});
}
fetchDataAndSetLocalStorage();
let espanol=JSON.parse(localStorage.getItem("diccionario"));
let elfo=JSON.parse(localStorage.getItem("diccionario_elfo"));
let input=document.getElementById('to_translate');
if(espanol&&elfo){
let user_es_dict={}
let user_elf_dict={}
let user_translator=new Translator();
document.querySelector('#btn0').onclick = (e) => {
  user_translator.set_dict(espanol);
  user_translator.set_user_dict(user_es_dict);
  let event_helper = new Helper(user_translator);
  input.onkeydown = (e) => event_helper.translateEnter(e, input);
  event_helper.translateClick(e, input);
};

document.querySelector('#btn1').onclick = (e) => {
  user_translator.set_dict(elfo);
  user_translator.set_user_dict(user_elf_dict);
  let event_helper = new Helper(user_translator);
  input.onkeydown = (e) => event_helper.translateEnter(e, input);
  event_helper.translateClick(e, input);
};

document.querySelector('#btn2').onclick = (e) => {
  let event_helper = new Helper(user_translator);
  user_translator.set_user_dict(user_es_dict);
  input.onkeydown = (e) => event_helper.addEnter(e, input);
  event_helper.addClick(e, input);
};


document.querySelector('#btn3').onclick = (e) => {
  let event_helper = new Helper(user_translator);
  user_translator.set_user_dict(user_elf_dict);
  input.onkeydown = (e) => event_helper.addEnter(e, input);
  event_helper.addClick(e, input);
};

document.querySelector('#btn4').onclick = (e) => {
  let event_helper = new Helper(user_translator);
  user_translator.set_user_dict(user_es_dict);
  input.onkeydown = (e) => event_helper.deleteEnter(e, input);
  event_helper.deleteClick(e, input);
};

document.querySelector('#btn5').onclick = (e) => {
  let event_helper = new Helper(user_translator);
  user_translator.set_user_dict(user_elf_dict);
  input.onkeydown = (e) => event_helper.deleteEnter(e, input);
  event_helper.deleteClick(e, input);
};


}else{window.location.reload(true);}

document.querySelector("#btn6").onclick=(e)=>{
  e.preventDefault();
  document.querySelectorAll('.chat').forEach((e)=>e.remove());
}
input.onkeydown=(e)=>{
  if(e.key==="Enter"){
    document.querySelectorAll('.chat').forEach((e)=>e.remove());
  }
}
