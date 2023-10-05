class Translator {
    dict;
    user_dict;
    constructor(dict,user_dict){
        this.dict=dict;
        this.user_dict=user_dict;
    }
    add_traslation(palabra,elfo){
        palabra= palabra[0].toUpperCase() + palabra.slice(1).toLowerCase();
        if(this.user_dict[palabra+'.']===undefined){
            this.user_dict[palabra+'.']=elfo;
        }else{
            let count=1; 
            while(this.user_dict[palabra+'.__'+count]!==undefined){count++}
            this.user_dict[palabra+'.__'+count]=elfo;
        }
        console.log(this.user_dict);
    }
    remove_translation(wrd){
        if(this.user_dict[wrd+'.']!==undefined){
            delete this.user_dict[wrd+'.'];
            let count=1;
            while(this.user_dict[wrd+'.__'+count]){
                delete this.user_dict[wrd+'.'+count];
                count++;
            }
        }
        console.log(this.user_dict)
        return (this.user_dict[wrd+'.']===undefined);
    }
      
    findWord(word){
        if (word===""){return "Por favor ingrese una palabra";}
        console.log(word);
        console.log(this.dict);
        if(this.dict[word]!==undefined){
            return Object.values(this.dict[word]).join("");
        } 
       if(this.dict[word+'.']!==undefined){
            let count=1;
            let tr1=Object.values(this.dict[word+'.']).join("");
            let Translations="Traducciones originales: 1. "+ tr1;
            while(this.dict[word+".__"+count]!==undefined){
                let trn=Object.values(this.dict[word+".__"+count]).join("");
                Translations+=", "+(count+1)+". "+trn;
                count++;
            }
            if(this.user_dict[word+"."]!==undefined){
                let tru1=Object.values(this.user_dict[word+'.']).join("");
                Translations+=". Traducciones agregadas: 1. "+tru1;
                count=1;
                while(this.user_dict[word+".__"+count]!==undefined){
                    let trn=Object.values(this.user_dict[word+".__"+count]).join("");
                    Translations+=", "+count+1+". "+trn;
                    count++;
                }
            }
            return Translations;
        }
        if(this.user_dict[word+'.']!==undefined){
            let tru1=Object.values(this.user_dict[word+'.']).join("");
                let Translations="Traducciones agregadas: 1. "+tru1;
                let count=1;
                while(this.user_dict[word+"__."+count]!==undefined){
                    let trn=Object.values(this.user_dict[word]+"__."+count).join("");
                    Translations+=", "+count+1+". "+trn;
                    count++;
                }
                return Translations;
        }
        
        return "No se pudo traducir la palabra";
    }
    add_to_chat(texto,type){
        let parent=document.createElement("div");
        parent.className="f-container chat "+type;
        let image_div=document.createElement("div");
        image_div.className="img_chatter";
        parent.appendChild(image_div);
        let image=document.createElement("img");
        image.src=type=="question"? "./assets/user.png":"./assets/machine.png";
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