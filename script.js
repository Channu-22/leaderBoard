const form=document.querySelector("form");
const leaderBoardDiv=document.querySelector("#leaderBoardDiv");

const elements=Array.from(document.forms[0].elements);
elements.pop();
// console.log(elements);
let leaderBoard=[];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const object={
        id:leaderBoard.length,
        fname:elements[0].value,
        lname:elements[1].value,
        country:elements[2].value,
        score:elements[3].value
    };
    // console.log(object);
    
    leaderBoard.push(object);
    // console.log(leaderBoard);

    // clear the form
    clearForm();

    // to sort leaderBoard score
    sortedLeaderBoard();

    printLeaderBoard();
    // console.log(form.submit);
});

function clearForm() {
    elements.forEach((element) => (element.value = ""));
    elements[0].focus();
}

function sortedLeaderBoard(){
    leaderBoard=leaderBoard.sort((a,b)=>{
        return b.score-a.score;
    });
}




function printLeaderBoard(){
    leaderBoardDiv.innerHTML="";
    const fragment=document.createDocumentFragment();

    leaderBoard.forEach((obj) => {

        const parent=document.createElement("div");
        const name=document.createElement("p");
        const country=document.createElement("p");
        const score=document.createElement("p");
        const action=document.createElement("div");
        const del=document.createElement("span");
        const incre5=document.createElement("span");
        const decre5=document.createElement("span");

        parent.classList.add("parent");
        name.innerText=`${obj.fname} ${obj.lname}`;
        // country.innerText=obj.country;
        country.innerText=`${obj.country}`;
        score.innerText=`${obj.score}`;

        action.classList.add("action");

        del.classList.add("fa-solid", "fa-trash");
        del.addEventListener("click",() => deleteData(obj.id))
        
        incre5.innerText="+5";
        decre5.innerText="-5";
        incre5.addEventListener("click", () => modifyScore(obj.id, "+"));
        decre5.addEventListener("click", () => modifyScore(obj.id, "-"));
    

        action.append(del,incre5,decre5);
        parent.append(name,country,score,action);
        fragment.append(parent);
    
    })
    leaderBoardDiv.append(fragment);
}

function deleteData(idToDelete){
    leaderBoard=leaderBoard.filter((existing) =>{
        return existing.id !== idToDelete;
    });

    sortedLeaderBoard();

    printLeaderBoard();
}

function modifyScore(idTomodify,sign){
    if(sign=="+"){
        leaderBoard.map((leaderBoardData) =>{
            if(leaderBoardData.id==idTomodify){
                leaderBoardData.score=Number(leaderBoardData.score) + 5;
            }
        });
    }
    else{
        leaderBoard.map((leaderBoardData) =>{
            if(leaderBoardData.id==idTomodify){
                leaderBoardData.score=Number(leaderBoardData.score) - 5;
            }
        });
    }
     //sorting the leaderBoard
  sortedLeaderBoard();
  
  printLeaderBoard();
}