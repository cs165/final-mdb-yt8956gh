class showEntry{
    constructor(forwardButton,backButton,dateText){
        this.forwardButton = forwardButton;
        this.backButton = backButton;
        this.dateText = dateText;

        const entryText = document.querySelector("#entry-text");
        const entryShow = document.querySelector("#entry-show");
        const entryEdit = document.querySelector("#entry-edit");
        this.entryShow = entryShow;
        this.entryText = entryText;
        this.entryEdit = entryEdit;
        this.date = new Date();
        this.options = { month: 'long', day: 'numeric' };

        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);

        this.backButton.addEventListener('click',this.back);
        this.forwardButton.addEventListener('click', this.forward);

        const urlPathString = window.location.pathname;
        const parts = urlPathString.split("/");

        this.bookid = parts[parts.length-1];

        this.loadData();

        this.editEntry = new editEntry(this.entryShow, this.entryText, this.entryEdit, this.date2String(this.date), this.entryText.textContent);
    }

    async loadData(){

        //用fetch抓日程資料
        this.dateText.textContent = this.date.toLocaleDateString('en-US', this.options);
        const response = await fetch(`/getEntry/${this.bookid}/${this.date2String(this.date)}`);
        const json = await response.json();
        this.entryText.textContent = json.text;
        this.editEntry.updateString(this.date2String(this.date),json.text);

        console.log(json);
    }

    date2String(date){
        const dataStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        console.log(dataStr);
        return dataStr;
    }

    forward(){
        this.date.setDate(this.date.getDate()+1);
        this.loadData();
    }

    back(){
        this.date.setDate(this.date.getDate()-1);
        this.loadData();
    }
}