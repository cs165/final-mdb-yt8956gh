class Home{
    constructor(){
        const createButton = document.querySelector("#create");
        this.today = new Date();
        this.createURL = this.createURL.bind(this);
        createButton.addEventListener('click', this.createURL);
    }

    createURL(){

        //let todayString = this.today.toLocaleDateString('en-US');

        fetch('./getid/1')
            .then(
            response => {let json=response.json();console.log(json); return json;},
            response => {console.log(response.status);}
            ).then(
                json => {window.location.href = window.location.href+'id/'+json.key;}
            );

        //const key = 'fdhasfuhsdaf';
        //window.location.href = window.location.href+'id/'+key;
    }
}