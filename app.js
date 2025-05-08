// Harek button lai access garna
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;      // playerX,playerO kasko paalo pahila
let count=0; // to track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// 8. 
const resetGame= ()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

};

// 1. harek button(individual box) daabne bittikai event listener add garna 

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){            
       // playerO
            box.innerText="O";
            turnO=false;  // player x ko turn aayo

        }else{                
      // playerX
            box.innerText="X";
            turnO=true;  
        }
        box.disabled=true; // 2. button dabne bittikai disable garna
        count++;

        // 3. button dabne bittikai koi winner vayoki
        let isWinner=checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw =()=>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// 7. 
const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};



// 8.  
const enableBoxes =()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};


// 7. 
const showWinner =(winner)=>{
    msg.innerText=`Congratulations!, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();  // 1 winner vayesake paxi button disable garna

}

// 4. winner check garne
// winPatterns vitra loop chalaune
const checkWinner = () =>{
    for (let pattern of winPatterns)
    {
        let pos1Val=boxes[pattern[0]].innerText; // harek boxes ko pattern ko 0
        let pos2Val=boxes[pattern[1]].innerText; // harek boxes ko pattern ko 1
        let pos3Val=boxes[pattern[2]].innerText; // harek boxes ko pattern ko 2

        // 5.  pos1 pos2  pos3 k same value chhan
        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){  // koi khaali ta chhaina
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);  //7.
                return true;
            }

        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

