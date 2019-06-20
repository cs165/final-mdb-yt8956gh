class editEntry{
    constructor(entryShow, entryText, entryEdit, dateString, textString){

        this.entryShow = entryShow;
        this.entryText = entryText;
        this.entryEdit = entryEdit;

        this.editCard = document.querySelector("#edit-card");
        this.dateDiv = document.querySelector("#card-date");
        this.textArea = document.querySelector("#edit-area");
        this.dateString = dateString;
        this.textString = textString;

        this.show = this.show.bind(this);
        this.clickOtherSpace = this.clickOtherSpace.bind(this);

        this.entryText.addEventListener("click", this.show);
        this.entryEdit.addEventListener("click", this.clickOtherSpace, false);
        this.editCard.addEventListener("click",this.doNothing);

        this.textArea.textContent = this.textString;
    }

    show(){
        this.entryShow.classList.add("blur");
        this.entryEdit.classList.remove("inactive");
        this.dateDiv.textContent = this.dateString;
    }

    hide(){
        this.entryShow.classList.remove("blur");
        this.entryEdit.classList.add("inactive");
    }

    clickOtherSpace(event){
        this.hide();
        console.log("wrapper");
    }

    doNothing(event){
        event.stopPropagation();
        console.log("Card");
    }

    updateString(dateString, textString){
        this.dateString = dateString;
        this.textString = textString;
        this.textArea.value = this.textString;
    }
}