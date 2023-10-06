class Helper{
    translator;
    constructor(tr){
        this.translator=tr;
    }
    async translateClick(e,input){
        try {e.preventDefault();
        let word=input.value;
        word= await(word[0].toUpperCase() + word.slice(1).toLowerCase());
        this.translator.translate(word);
        Helper.pageScroll();input.value="";
        }catch(e){
            console.log(e);
            this.translator.add_to_chat("No se pudo traducir la palabra","answer");
        }
    }
    async translateEnter(e,input){
       try{ 
        if (e.key === "Enter") {
            e.preventDefault();
            let word=input.value;
            word= await (word[0].toUpperCase() + word.slice(1).toLowerCase());
            this.translator.translate(word);
            Helper.pageScroll();input.value="";
        }
        }catch(e){
            console.log(e);
            this.translator.add_to_chat("No se pudo traducir la palabra","answer");
        }
    }
    addEnter(e,input){
        if(e.key==="Enter"){
            try{
                let values=input.value.split(/[ ]+/);
                if(values[1]===undefined){throw new Error("error");}
                let word=input.value;
                word= word[0].toUpperCase() + word.slice(1).toLowerCase();
                this.translator.add_traslation(values[0],values[1]);
                this.translator.add_to_chat("Palabra agregada exitosamente","answer");
                Helper.pageScroll();input.value="";
            }catch(e){
                console.log(e);
                this.translator.add_to_chat("No se pudo agregar la palabra","answer");
            }
        }
    }
    addClick(e,input){
        e.preventDefault();
         try{
            let values=input.value.split(/[ ,]+/);
            if(values[1]===undefined){throw new Error("error");}
            this.translator.add_traslation(values[0],values[1]);
            this.translator.add_to_chat("Palabra agregada exitosamente","answer");
            Helper.pageScroll();input.value="";
        }catch(e){
            console.log(e);
            this.translator.add_to_chat("No se pudo agregar la palabra","answer");
        }
    }
    deleteEnter(e,input){
       if(e.key==="Enter"){
            try{
                let word=input.value;
                word= word[0].toUpperCase() + word.slice(1).toLowerCase();
                this.translator.remove_translation(word)?
                this.translator.add_to_chat("Palabra eliminada exitosamente","answer"):
                this.translator.add_to_chat("No se pudo eliminar la palabra","answer");
                Helper.pageScroll();input.value="";
            }catch(e){
                console.log(e);
                this.translator.add_to_chat("No se pudo eliminar la palabra","answer");
            }
        }
    }
    deleteClick(e,input){
        e.preventDefault();
         try{
            let word=input.value;
            word= word[0].toUpperCase() + word.slice(1).toLowerCase();
            this.translator.remove_translation(word)?
            this.translator.add_to_chat("Palabra eliminada exitosamente","answer"):
            this.translator.add_to_chat("No se pudo eliminar la palabra","answer");
            Helper.pageScroll();input.value="";
        }catch(e){
            console.log(e);
            this.translator.add_to_chat("No se pudo eliminar la palabra","answer");
        }
    }
    static pageScroll() {
        document.querySelector(".messages").scrollTo({ top: document.querySelector(".messages").scrollHeight, behavior: 'smooth' });
    }
}
export {Helper}