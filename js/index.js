import { Translator } from "../Model/Translator.js";
import { Helper } from "../Model/Helper.js";
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
let user_translator=new Translator(JSON.parse(localStorage.getItem("diccionario")),{});
let event_helper= new Helper(user_translator);
let input = document.querySelector('#to_translate');
let btn=document.querySelector('#send_btn');
input.onkeydown=(e)=>event_helper.translateEnter(e,input);
btn.onclick=(e)=>event_helper.translateClick(e,input);
document.querySelector('.prompt select').addEventListener('change',(e)=>{
  if(e.target.value==="0"){
    input.onkeydown=(e)=>event_helper.translateEnter(e,input);
    btn.onclick=(e)=>event_helper.translateClick(e,input);
  }else if(e.target.value==="1"){
    input.onkeydown=(e)=>event_helper.addEnter(e,input);
    btn.onclick=(e)=>event_helper.addClick(e,input);
  }else if(e.target.value==="2"){
    input.onkeydown=(e)=>event_helper.deleteEnter(e,input);
    btn.onclick=(e)=>event_helper.deleteClick(e,input);
  }else{
    btn.onclick=(e)=>{
      e.preventDefault();
      document.querySelectorAll('.chat').forEach((e)=>e.remove());
    }
    input.onkeydown=(e)=>{
      if(e.key==="Enter"){
        document.querySelectorAll('.chat').forEach((e)=>e.remove());
      }
    }
  }
});

