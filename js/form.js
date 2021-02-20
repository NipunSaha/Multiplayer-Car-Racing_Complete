class Form{
    constructor(){
        this.title = createElement("h1");
        this.input = createInput("Name");
        this.button = createButton("Play");
        this.greeting = createElement("h2");
        this.reset = createButton("RESET");
    }

    hide(){
        this.title.hide();
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }

    display(){
        this.title.html("Car Racing Game");
        this.title.position(displayWidth/2-50, 0);
        this.input.position(displayWidth/2-40, displayHeight/2-80);
        this.button.position(displayWidth/2 + 30, displayHeight/2);
        this.reset.position(displayWidth-100,30);

        this.button.mousePressed(()=>{
            this.button.hide();
            this.input.hide();
            player.name = this.input.value();
            playerCount +=1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Welcome " + player.name);
            this.greeting.position(displayWidth/2-70, displayHeight/4);
        });
        this.reset.mousePressed(()=>{
            database.ref("/").update({
                gameState: 0,
                playerCount: 0,
                finishedPlayers: 0,
                players: null
            })
        })

    }
}