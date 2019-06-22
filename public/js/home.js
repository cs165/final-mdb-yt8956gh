class Home{
    constructor(){
        this.createButton = document.getElementById("create");
        this.journalListContainer = document.getElementById("journal-container");
        this.journalNameInput = document.getElementById("journal-name");
        this.JournalCount = 0;
        this.createURL = this.createURL.bind(this);
        this.createButton.addEventListener('click', this.createURL);
        this.getJournalList().catch((error)=>{console.log("getJournalList："+error);});
    }

    createURL(){

        let journalName = this.journalNameInput.value;
        const newJournalNumber = this.JournalCount+1;

        if(journalName==="")
            journalName = `untitled-${newJournalNumber}`;

        fetch(`./getId/${newJournalNumber}/${journalName}`)
            .then(
            response => {let json=response.json();console.log(json); return json;},
            response => {console.log(response.status);})
            .then(
                json => {window.location.href = window.location.href+'id/'+json.key;});
    }

    async getJournalList(){

        const response = await fetch('./journal_list');
        const json = await response.json();

        this.JournalCount = json.length;

        console.log(this.JournalCount);
        await this.showJournalList(json);
    }

    addJournal2List(title, url){
        let bookContainer = document.createElement("div");
        let journalBinding = document.createElement("div");
        let journalTitle = document.createElement("div");

        bookContainer.classList.add("journal","journal-flex-container");
        journalBinding.classList.add("journal-binding-side");
        journalTitle.classList.add("journal-title");
        journalTitle.textContent = title;

        bookContainer.appendChild(journalBinding);
        bookContainer.appendChild(journalTitle);

        bookContainer.addEventListener('click',
            function(){console.log(url);window.location.href = window.location.href+url;}.bind(url));

        this.journalListContainer.appendChild(bookContainer);
    }

    showJournalList(journalList){

        for(let key in journalList)
        {
            if(journalList.hasOwnProperty(key)) {
                const journal = journalList[key];
                console.log()
                this.addJournal2List(journal.name, `id/${journal._id}`);
            }
        }
    }
}