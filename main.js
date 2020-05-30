

let a =document.querySelector(".control-buttons span");
      
a.addEventListener('click',function(e){
     let name=prompt("your name please")
     if(!name){
         document.querySelector(".name span").innerHTML="<span>unkown</span>"
     }else{
        document.querySelector(".name span").innerHTML=`<span>${name}</span>`;

     }
     let a =document.querySelector(".control-buttons ").remove();

})
//duration 
const duration =1000;

let gameBlocks=document.querySelector(".memory-game-blocks");
let blocks=Array.from(gameBlocks.children);

 let orderRange=[...blocks.keys()]

let dynamiqueRange=[20];

// function randome => pour un nomber 1<=X<=20 
function randome(min,max){
    let a=Math.round(Math.random()*(max-min)+1);
    return a;
    
}  


 
let arrayRandom=[];
 function shuffle(){
   
    arrayRandom.push(randome(1,20));
    let randomNumber=randome(1,20);
    while(arrayRandom.length<20){
        let bool=true;
    arrayRandom.forEach(element => {
        if (element===randomNumber) {
            bool=false;
        } });

    if(!bool){
    
        randomNumber=randome(1,20);
    }else{
        arrayRandom.push(randomNumber);
    }
  }
 
}
shuffle();
blocks.forEach( (block,key) => {
    block.style.order=arrayRandom[key];
    block.addEventListener('click',(e)=>{
        flipBlock(e.currentTarget);
    })
});

 

function flipBlock(selectedElement){
    selectedElement.classList.add("is-flipped");

    let allFlipedBlocks=blocks.filter((flipedBlock)=>flipedBlock.classList.contains("is-flipped"));
    if(allFlipedBlocks.length==2){
         
        stopClicking();
        checkMatchBlocks(allFlipedBlocks[0],allFlipedBlocks[1]);
    }
     
}


// stop clicking 
function stopClicking(){
    gameBlocks.classList.add("no-clicking");

    setTimeout(() => {
        gameBlocks.classList.remove("no-clicking");
    }, duration);
}

 

function checkMatchBlocks(firstElement,secondElement){
    let tries=document.querySelector(".tries span")
    if(firstElement.dataset.technology==secondElement.dataset.technology){
        firstElement.classList.remove("is-flipped");
        secondElement.classList.remove("is-flipped");
        
        firstElement.classList.add("has-match");
        secondElement.classList.add("has-match");
        document.getElementById('success').play();

    }else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        document.getElementById('fail').play();
        setTimeout(() => {
        firstElement.classList.remove("is-flipped");
        secondElement.classList.remove("is-flipped");
        }, duration);
    }
}
