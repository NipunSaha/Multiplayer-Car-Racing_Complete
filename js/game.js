class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
             gameState = data.val();
        });
       
    }

    update(state){
        database.ref("/").update({
            gameState: state
        })
    }

    async start(){
       if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref("playerCount").once("value");
          if (playerCountRef.exists()){
              playerCount = playerCountRef.val();
              player.getCount();
          }
          form = new Form();
          console.log(form);
          form.display();
       }
       car1 = createSprite(100,200);
       car1.addImage(car1IMG);
       car2 = createSprite(300,200);
       car2.addImage(car2IMG);
       car3 = createSprite(500,200);
       car3.addImage(car3IMG);
       car4 = createSprite(700,200);
       car4.addImage(car4IMG);
       cars = [car1,car2,car3,car4];

       finishedPoint = false;
    }
    play(){
        form.hide();
        Player.getPlayerInfo();
        player.getfinishedPlayers();
        console.log(finishedPlayers);
        if(allPlayers !== undefined){
           //var displayPosition = 100;
           background(90);
           image(trackIMG, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
           var index = 0;
           var x = 175;
           var y;
           for(var plr in allPlayers){
               index = index + 1;
               x +=200;
               y = displayHeight - allPlayers[plr].distance;
               cars[index-1].x = x;
               cars[index-1].y = y;
               if (index === player.index){
                   stroke(10);
                   fill("red");
                   ellipse(x,y,80,80);
                   camera.position.x = displayWidth/2;
                   camera.position.y = cars[index-1].y;
               }
               //displayPosition +=20;
               textSize(20);
               textAlign(CENTER);
               fill("yellow");
               text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y + 70);
           } 
        }
        if (keyDown(UP_ARROW) && player.index !== null && finishedPoint !== true){
              player.distance+= 10;
              player.update();
        }
        if(player.distance > 3700 && finishedPoint === false){
            finishedPoint = true;
            Player.updatefinishedPlayers();
            console.log("Updated Finished Players are " + finishedPlayers);
            player.rank = finishedPlayers;
            player.update();
        }
        drawSprites();
    }
    displayRank(){
        camera.position.x = 0;
        camera.position.y = 0;
        Player.getPlayerInfo();
        imageMode(CENTER);
        image(bronzeIMG, -displayWidth/4, displayHeight/9-100, 200, 240);
        image(silverIMG, displayWidth/4, displayHeight/10-100, 220,270);
        image(goldIMG, 0, -100, 250,300);
        fill("yellow");
        textSize(35);
        textAlign(CENTER);
        stroke("yellow");
        //strokeWeight(2);
        for(var plr in allPlayers){
            if(allPlayers[plr].rank === 1){
                text("1st : " + allPlayers[plr].name, 0, 85);
            }else if(allPlayers[plr].rank === 2){
                text("2nd : " + allPlayers[plr].name, displayWidth/4, displayHeight/10+75);
            }else if(allPlayers[plr].rank === 3){
                text("3rd : " + allPlayers[plr].name, -displayWidth/4, displayHeight/9 + 75);
            }else{
                textSize(30);
                text("Better Luck Next Time : " + allPlayers[plr].name, 0, 225);
            }
        }
    }
}
