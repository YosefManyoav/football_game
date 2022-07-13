// create a variable

let inpLig = document.querySelector('.inpLig');
let table = document.querySelector('.table');
let input = document.querySelector('.input');
let hangman;
let letters = document.querySelector('#letters');
let currentWord = document.querySelector('#currentWord');
let hangmanDiv = document.querySelector('#hangman');
// create function to create the game
function getTeam(){
  fetch(
    // Calling the API
    `https://api-football-standings.azharimm.site/leagues/${inpLig.value}.1/standings?season=2021&sort=asc`
  )
    .then(function (res) {
      //Translates the API
      return res.json();
    })
    .then(function (data) {  
      //Taking data from the API
      let infoData = data.data.standings;
      let arrData = infoData.map(function (teams) {
      //Taking data I need and turning it into an object
        let obj = { teamName: teams.team.displayName, teamImg: teams.team.logos[0].href }
        return teams = obj
      })

      console.log(arrData);
      //Calling CLASS from OOP and inserting the object I created into it
       hangman = new Hangman(arrData);
       
       console.log(hangman.secretObj.teamName);
       //Create an image taken from the object
       hangmanDiv.innerHTML = `
       <img id="" class="imgTeam d-flex justify-content-center w-100" src="${hangman.secretObj.teamImg}">
      `
       function show() {
       //create a variable that takes the letters I write in input
        let x = hangman.askLetter(input.value);
        console.log(x);
        // if do not have a place in input then ...
        if(x === -1){
          //create the getTeam function
          input.removeEventListener('keyup', play)
          getTeam()
        }
        //create in letters div a words warehouse
        letters.textContent = hangman.letters;
        // create in currentWord a bottom dash
        currentWord.innerHTML = hangman.gameStatus()
        input.value = ''
      }
      // event called the play() function called the show() function
      input.addEventListener('keyup', play)
      function play(e){
        // Let the keyup work when you enter
        if (e.key === 'Enter') {
          show();
        }
      }
    })
  
    .catch(function (err) {
         console.log(err);
    });
  
}
// call back the getTeam function
getTeam()

inpLig.addEventListener('keyup', function(e){
  if (e.key === 'Enter'){
    getTeam()
    input.style.display='flex';

  }
})




