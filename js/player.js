class Player {
    constructor() {
        this.index = null
        this.name = null
        this.distance = 0
        this.rank = 0
    }
    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",(data)=>{
           playerCount = data.val();
        });
    }
    updateCount(count) {
      database.ref("/").update({
          playerCount: count
      })
    }
    update() {
       var playerIndex = "players/player"+this.index
       database.ref(playerIndex).set({
           name: this.name,
           distance: this.distance,
           rank: this.rank
       })
    }
    static getPlayerInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value",(data)=>{
           allPlayers = data.val();
        })
    }
    getfinishedPlayers(){
        var finishedPlayersRef = database.ref("finishedPlayers");
        finishedPlayersRef.on("value",(data)=>{
            finishedPlayers = data.val();
        }); 
    }
    static updatefinishedPlayers(){
        console.log("Inside Finished Players");
        database.ref("/").update({
            finishedPlayers: finishedPlayers + 1
        })
    }
}