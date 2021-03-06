class showEntry{
    constructor(forwardButton,backButton,dateText){
        this.forwardButton = forwardButton;
        this.backButton = backButton;
        this.dateText = dateText;

        this.entryText = document.querySelector("#entry-text");
        this.entryTextContainer = document.querySelector("#entry-text-container");
        this.entryEditScreen = document.querySelector("#entry-edit-screen");
        this.back2HomeButton = document.querySelector("#back-to-home");
        this.date = new Date();
        this.options = { month: 'long', day: 'numeric' };

        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);
        this.loadData = this.loadData.bind(this);

        this.backButton.addEventListener('click',this.back);
        this.forwardButton.addEventListener('click', this.forward);
        this.back2HomeButton.addEventListener('click',
            ()=>{
            let tmp = window.location.href;
            const regExp = /\/id\/\w*/;
            window.location.href = tmp.replace(regExp,"");
        });


        this.getBookId();

        this.editEntry = new editEntry(this.entryEditScreen, this.entryTextContainer, this.loadData, this.bookid,this.date2String(this.date));
        this.loadData().catch(error=>{console.log(error);});
    }

    async loadData(){

        //用fetch抓日程資料
        this.dateText.textContent = this.date.toLocaleDateString('en-US', this.options);
        const response = await fetch(`/getEntry/${this.bookid}/${this.date2String(this.date)}`);
        const json = await response.json();
        this.entryText.innerHTML = json.text.replace(new RegExp('\n', 'g'),"<br>");
        this.editEntry.updateString(this.date2String(this.date),json.text);

        console.log(json);
    }

    getBookId(){
        const urlPathString = window.location.pathname;
        const parts = urlPathString.split("/");
        this.bookid = parts[parts.length-1];
    }

    date2String(date){
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    forward(){
        this.date.setDate(this.date.getDate()+1);
        this.loadData().catch(error=>{console.log(error);});
    }

    back(){
        this.date.setDate(this.date.getDate()-1);
        this.loadData().catch(error=>{console.log(error);});
    }
}