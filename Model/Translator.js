class Translator {
    constructor(dict,user_dict){
        this.dict=dict;
        this.user_dict=user_dict;
    }
    static add_traslation(espanol,elfo){
        
    }
    static remove_translation(espanol,elfo){

    }
    capitalize(word) {
      }
      
    findWord(word){
        word= word[0].toUpperCase() + word.slice(1).toLowerCase();
        if(this.dict[word]!==undefined){
            return Object.values(this.dict[word]).join("");
        }else if(this.user_dict[word]!==undefined){
            return Object.values(this.user_dict[word]).join("");
        }
        if(this.dict[word+'.']!==undefined){
            let rt=Object.values(this.dict[word+'.']).join("");
            if (this.dict[word+'.__1']!==undefined){
                let rt2=Object.values(this.dict[word+'.__1']).join("");
                return `Significados: 1. ${rt}\n, 2. ${rt2}`;
            }
        }
        return "Palabra no encontrada";
    }
    add_to_chat(texto,type){
        let parent=document.createElement("div");
        parent.className="f-container chat "+type;
        let image_div=document.createElement("div");
        image_div.className="img_chatter";
        parent.appendChild(image_div);
        let image=document.createElement("img");
        image.src=type=="question"? "./assets/user.webp":"./assets/machine.webp";
        image_div.appendChild(image);
        let content_div=document.createElement("div");
        content_div.className="content";
        content_div.textContent=texto;
        parent.appendChild(content_div);
        document.getElementsByClassName("messages")[0].appendChild(parent);
    }
    translate(word){
        this.add_to_chat(word,"question");
        let translation= this.findWord(word);
        this.add_to_chat(translation,"answer")
    }
}

export{ Translator}