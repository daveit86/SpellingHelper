const searchTxt=document.querySelector("#search input");
const searchBtn=document.querySelector("#search button");
const spellings=document.querySelector("#spellings");
const separator="?==?";
let list;
spellStored();

searchBtn.addEventListener("click",() => {
    let text=searchTxt.value;
    console.log(`Spell it! button clicked! word is ${text}`);
    if(text!=""){
    spellWord(text);
    searchTxt.value="";
    }
    searchTxt.focus();
    
});

async function spellWord(word)
{
    word=word.trim().toLowerCase();
    console.log(`spellWord: spelling ${word}`);
    let wordSpelling = document.createElement("div");
    wordSpelling.setAttribute("class","wordSpelling");
    wordSpelling.setAttribute("name",word);
    let wordBtn = document.createElement("label");
    wordBtn.textContent = "Remove";
    wordBtn.setAttribute("class","wordBtn");
    wordBtn.addEventListener("click",() => {
        console.log(list);
        wordSpelling.setAttribute("class",wordSpelling.getAttribute("class")+" deleted");
        let nextNode=wordSpelling;
        while(nextNode!=null)
        {
            nextNode.classList.add("moving");
            nextNode=nextNode.nextElementSibling;
        }
        setTimeout(() => {removeMoving();wordSpelling.remove();updateList();},2000);
    });
    wordSpelling.appendChild(wordBtn);
    let letterBox;
    let letterStart;
    let letterSpelling;
    let k;
    
    for(const letter of word)
    {
        console.log(`spelling letter ${letter}`);
        letterSpelling = document.createElement("div");
        letterSpelling.setAttribute("class","letterSpelling");
        letterStart = document.createElement("div");
        letterStart.setAttribute("class","letterStart");
        letterBox = document.createElement("div");
        letterBox.setAttribute("class","letterBox");
        letterStart.textContent = letter;
        letterSpelling.textContent = spellLetter(letter);
        letterBox.appendChild(letterStart)
        letterBox.appendChild(letterSpelling);
        wordSpelling.appendChild(letterBox);
        //await sleep(500);
    }

    function removeMoving()
    {
        let elements = document.querySelectorAll(".moving");
        for(const element of elements)
        {
            element.classList.remove("moving");
        }
    }
    
    spellings.appendChild(wordSpelling);
    console.log(`word: ${word}`);
    //list.push(word);
    //await sleep(2000);
    console.log(list+" "+typeof(list));
    //updateListStorage();
    updateList();
}

function updateList()
{
    console.log("Updating list...");
    let spellings = document.querySelectorAll(".wordSpelling");
    console.log(spellings);
    list = [];
    for(const element of spellings)
    {
        list.push(element.getAttribute("name"));
    }
    updateListStorage();
    console.log("updateList: list="+list);
}

function spellLetter(letter)
{
    switch(letter){
        case 'a': return "Alpha"; break;
        case 'b': return "Bravo"; break;
        case 'c': return "Charlie"; break;
        case 'd': return "Delta"; break;
        case 'e': return "Echo"; break;
        case 'f': return "Foxtrot"; break;
        case 'g': return "Golf"; break;
        case 'h': return "Hotel"; break;
        case 'i': return "India"; break;
        case 'j': return "Juliet"; break;
        case 'k': return "Kilo"; break;
        case 'l': return "Lima"; break;
        case 'm': return "Mike"; break;
        case 'n': return "November"; break;
        case 'o': return "Oscar"; break;
        case 'p': return "Papa"; break;
        case 'q': return "Quebec"; break;
        case 'r': return "Romeo"; break;
        case 's': return "Sierra"; break;
        case 't': return "Tango"; break;
        case 'u': return "Uniform"; break;
        case 'v': return "Victor"; break;
        case 'w': return "Whiskey"; break;
        case 'x': return "X-ray"; break;
        case 'y': return "Yankee"; break;
        case 'z': return "Zulu"; break;
        case '1': return "One"; break;
        case '2': return "Two"; break;
        case '3': return "Three"; break;
        case '4': return "Four"; break;
        case '5': return "Five"; break;
        case '6': return "Six"; break;
        case '7': return "Seven"; break;
        case '8': return "Eight"; break;
        case '9': return "Nine"; break;
        case '0': return "Zero"; break;
        case ' ': return "Space"; break;
        case '.': return "Dot"; break;
        case '-': return "Hyphen"; break;
        case '!': return "Exclamation"; break;
        case '?': return "Question"; break;
        case '\"': return "Quotes"; break;
        case '\'': return "Single Quote"; break;
        case '&': return "And"; break;
        case '@': return "At"; break;
        default: return "";
    }
}

function updateListStorage()
{
    let temp = JSON.stringify(list);
    localStorage.setItem("list",temp);
    console.log(`updateListStorage: Converted array ${list} ${typeof(list)} to JSON ${temp} ${typeof(temp)}`);
}

function getListStorage()
{
    let temp=localStorage.getItem("list");
    console.log("getListStorage: localStorage string="+temp);
    if(temp==null)
    {
        list=[];
    }
    else
    {
        list=JSON.parse(temp);
        //console.log(`getListStorage: Converted JSON ${JSON.parse(temp)} ${typeof(JSON.parse(temp))} to array ${list} ${typeof(list)}`);
    }
}

function spellStored()
{
    getListStorage();
    if(list.length>0)
    {
        console.log("spellStored: found element in list array")
        for(const word of list)
        {
            console.log("spellStored: spelling "+word+" "+typeof(word));
            spellWord(word);
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }