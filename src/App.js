import React from "react";
import './App.css';
const LETTERS= 6;
var guessNum=1;

var correctWord='square';
class App extends React.Component
{
    renderWords(i)
    {
        return <Word/>;
    }
    render() 
    {
        var wordList=[];
        for(var i=0; i<guessNum; i++)
        {
            wordList.push(this.renderWords(i));
        }
        return wordList;
    } 
}
class Word extends React.Component
{
    renderLetter(i)
    {
        return <Letter text=" " id={i} className="Letter"/>;
    }
    render()
    {
        var letterList= [];
        for(var i=0; i<LETTERS; i++)
        {
            letterList.push(this.renderLetter(i));
        }
        return letterList;
    }
}
class Letter extends React.Component
{
    
    render() {
        return <textarea maxLength={1} id={this.props.id} pattern="![^a-zA-Z0-9]" className={this.props.className}></textarea>;
    }

}
function getGuess(props)
{
   let tileColl= document.getElementsByTagName('textarea');
   var tiles = [].slice.call(tileColl);
   tiles=tiles.slice(-6);
   var text="";
   for(var i=0; i<tiles.length; i++)
    text+=tiles[i].value;
    return text;
}
window.addEventListener('keypress', function (e) {
   if(e.key=== "Enter")
   {
       processGuess();
   }
  }, false);

  function processGuess()
  {
        var guess= getGuess();
        if(guess.length===LETTERS)
        {
            isWord(guess);
        }

  }
  function isWord(word)
  {
        const url= "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
        
        fetch(url).then(response => processResponse(response,word)); 
  }
  function processResponse(response,word)
  {
      if(response.ok)
        {
            changeTiles(word);
            if(word===correctWord)
                console.log('you win');
                
        }
  }
  function changeTiles(word)
  {
      guessNum++;
      let tileColl = document.getElementsByTagName("textarea");
      var tiles = [].slice.call(tileColl);
      tiles= tiles.slice(-LETTERS);
      console.log(tiles);
      for(var i=0; i<LETTERS; i++)
      {
          if(word[i]===correctWord[i])
          {
            tiles[i].className="Letter-correct";
          }
          else if(correctWord.includes(word[i]))
          {
              tiles[i].className="Letter-almost";
          }
      }
  }
 

export default App;