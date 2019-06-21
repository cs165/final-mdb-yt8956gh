class editEntry{
    constructor(entryEditScreen, entryTextContainer, updateEntryShowScreen, bookid, dateString){

        this.entryTextContainer = entryTextContainer;
        this.dateString = dateString;
        this.bookid = bookid;
        this.entryEditScreen = entryEditScreen;
        this.updateEntryShowScreen = updateEntryShowScreen;
        this.entryShowScreen = document.querySelector("#entry-show-screen");
        this.editCard = document.querySelector("#edit-card");
        this.dateDiv = document.querySelector("#card-date");
        this.textArea = document.querySelector("#edit-area");
        this.checkButton = document.querySelector("#checked");

        this.show = this.show.bind(this);
        this.checked = this.checked.bind(this);

        this.entryTextContainer.addEventListener("click", this.show);
        this.editCard.addEventListener("click",this.doNothing);
        this.entryEditScreen.addEventListener("click", this.checked);
        this.checkButton.addEventListener("click", this.checked);
    }

    show(){
        this.entryShowScreen.classList.add("blur");
        this.entryEditScreen.classList.remove("inactive");
    }

    hide(){
        this.entryShowScreen.classList.remove("blur");
        this.entryEditScreen.classList.add("inactive");
    }

    async checked(){

        const requestJson = {bookid:this.bookid, date:this.dateString, text:this.textArea.value};
        console.log(requestJson);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestJson)
        };

        await fetch("../setEntry", fetchOptions);

        this.updateEntryShowScreen();

        this.hide();
    }

    doNothing(event){
        event.stopPropagation();
    }

    updateString(dateString, textString){
        this.dateDiv.textContent = this.dateString = dateString;
        this.textArea.value = textString;
    }
}