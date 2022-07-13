class Hangman {
  constructor(arrData) {
    this.arrData= arrData ;
    this.letters = [];
    this.score = [];
    this.errorsLeft = 10;
    this.secretObj = this.arrData[this._getNumber()] 
  }
  // get of get word a index 
  _getNumber() {
    let random = Math.floor(Math.random() * this.arrData.length);
    return random;
  }
// Checking to see if the game is over 
  isFinished() {
    return !this.gameStatus().includes("_") ;
  }

//Checks if there is the letter I put in the name of the team
  askLetter(letter) {
    letter = letter.toUpperCase();
    console.log(this.letters);
    if (this.letters.indexOf(letter) > -1) {
      return alert('u ask this letter');
    }
    this.letters.push(letter);
    let correct = this.secretObj.teamName.toUpperCase().indexOf(letter) > -1;
    if (!correct) {
      this.errorsLeft -= 1;
    }
    if(!this.gameStatus().includes("_")){
      this.letters=[]
      return -1;
    }
    return correct;
  }
  //Splits the team name into letters and inserts a lower hyphen in place of the letter
  gameStatus() {
    let that =this;
    let wordStatus  = [];
    let splitWord = this.secretObj.teamName.toUpperCase().split("");
    splitWord.forEach(function (letter) {
      if (that.letters.indexOf(letter) > -1) {
        wordStatus.push(letter);
      } else {
        wordStatus.push("_");
      }
    });
    return wordStatus;
  }
  
}