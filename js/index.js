import { Translator } from "../Model/Translator.js";
import { Helper } from "../Model/Helper.js";
fetch('../assets/diccionario.json')
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
fetch('../assets/diccionario_elfo.json')
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
let espanol=JSON.parse(localStorage.getItem("diccionario"));
let elfo=JSON.parse(localStorage.getItem("diccionario_elfo"));
let user_es_dict={}
let user_elf_dict={}
let user_translator=new Translator();
let event_helper_out= new Helper(user_translator);
user_translator.set_dict(espanol);
user_translator.set_user_dict(user_es_dict);
let input = document.querySelector('#to_translate');
let btn=document.querySelector('#send_btn');
input.onkeydown=(e)=>event_helper_out.translateEnter(e,input);
btn.onclick=(e)=>event_helper_out.translateClick(e,input);
document.querySelector('.prompt select').addEventListener('change',(e)=>{
  if(e.target.value==="0"){
    user_translator.set_dict(espanol);
    user_translator.set_user_dict(user_es_dict);
    let event_helper= new Helper(user_translator);
    input.onkeydown=(e)=>event_helper.translateEnter(e,input);
    btn.onclick=(e)=>event_helper.translateClick(e,input);
  }else if(e.target.value==="1"){
    user_translator.set_dict(elfo);
    user_translator.set_user_dict(user_elf_dict);
    let event_helper= new Helper(user_translator);
    input.onkeydown=(e)=>event_helper.translateEnter(e,input);
    btn.onclick=(e)=>event_helper.translateClick(e,input);
  }else if(e.target.value==="2"){
    let event_helper= new Helper(user_translator);
    user_translator.set_user_dict(user_es_dict);
    input.onkeydown=(e)=>event_helper.addEnter(e,input);
    btn.onclick=(e)=>event_helper.addClick(e,input);
  }else if(e.target.value==="3"){
    let event_helper= new Helper(user_translator);
    user_translator.set_user_dict(user_elf_dict);
    input.onkeydown=(e)=>event_helper.addEnter(e,input);
    btn.onclick=(e)=>event_helper.addClick(e,input);
  }else if(e.target.value==="4"){
    let event_helper= new Helper(user_translator);
    user_translator.set_user_dict(user_es_dict);
    input.onkeydown=(e)=>event_helper.deleteEnter(e,input);
    btn.onclick=(e)=>event_helper.deleteClick(e,input);
  }else if(e.target.value==="5"){
    let event_helper= new Helper(user_translator);
    user_translator.set_user_dict(user_elf_dict);
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

