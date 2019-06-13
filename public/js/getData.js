class getData{
    constructor(forwardButton,backButton,dateText){
        this.forwardButton = forwardButton;
        this.backButton = backButton;
        this.dateText = dateText;
        this.date = new Date();
        this.options = { month: 'long', day: 'numeric' };

        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);

        this.backButton.addEventListener('click',this.back);
        this.forwardButton.addEventListener('click', this.forward);

        this.dateText.textContent = this.date.toLocaleDateString('en-US', this.options);

        this.loadDataFirst();
    }

    loadDataFirst(){
        //TODO()
        //切網址，獲得journal token
        //GET: 用fetch抓資料
        //伺服器端寫好GET介面
        //點擊跳出編輯介面
        //POST:

    }

    forward(){
        console.log("forward");
        this.date.setDate(this.date.getDate()+1);
        this.dateText.textContent = this.date.toLocaleDateString('en-US', this.options);
    }

    back(){
        console.log("Back");
        this.date.setDate(this.date.getDate()-1);
        this.dateText.textContent = this.date.toLocaleDateString('en-US', this.options);
    }
}