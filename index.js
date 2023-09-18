let input = document.querySelector('#to_translate');
let btn=document.querySelector('#send_btn');
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  } else {console.log(input)}
});
btn.addEventListener("click",(e)=>{
    e.preventDefault();
});
