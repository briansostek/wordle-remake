import React from "react";
import './App.css';

const GUESSES=6;
var currGuess=0;


var correctWord=prompt("Enter the word to be played").toLowerCase();
const LETTERS= correctWord.length;
class App extends React.Component
{
    
    renderWords()
    {
        return <Word/>;
    }
    render() 
    {
        var wordList=[];
        wordList.push(<div> <Word/> </div>);
        for(var i=1; i<GUESSES; i++)
        {
            wordList.push(<div className="wordBox" id={"guess"+i} hidden="true"> <Word/> </div>);
            wordList.push(<br/>);
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
        return <textarea maxLength={1} id={this.props.id} type="text" className={this.props.className}></textarea>;
    }

}
function getGuess()
{
   let tileColl= document.getElementsByTagName('textarea');
   var tiles = [].slice.call(tileColl);
   tiles=tiles.slice(currGuess*LETTERS);
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
            isWord(guess.toLowerCase());
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
                alert('you win');
                
        }
  }
  function changeTiles(word)
  {
      
      let tileColl = document.getElementsByTagName("textarea");
      var tiles = [].slice.call(tileColl);
      tiles= tiles.slice(currGuess*LETTERS);
      var letList=correctWord.split('');
      for(var i=0; i<LETTERS; i++)
      {
          tiles[i].readonly=true;
          if(word[i]===correctWord[i])
          {
            tiles[i].className="Letter-correct";
          }
          else if(correctWord.includes(word[i]))
          {
              if(letList.includes(word[i]))
              tiles[i].className="Letter-almost";
              const index= letList.indexOf(word[i]);
              letList.splice(index,1);
          }
          else
          {
              tiles[i].className="Letter";
          }
          
      }
      currGuess++;
      document.getElementById("guess"+currGuess).hidden=false;
  }




export default App;