
class app{
    constructor(){
        const forwardButton = document.querySelector("#forward");
        const backButton = document.querySelector("#back");
        const dateText = document.querySelector("#date");
        this.showEntry = new showEntry(forwardButton,backButton,dateText);
    }
}

const App = new app();
