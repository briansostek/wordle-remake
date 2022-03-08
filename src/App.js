import React from "react";
import './App.css';

const GUESSES=6;
var currGuess=0;


var correctWord=prompt("Enter the word to be played", randomWord()).toLowerCase();
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
        wordList.push(<Word/>);
        wordList.push(<br/>);
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
  function randomWord()
  {
    const url= "https://api.dictionaryapi.dev/api/v2/entries/en/"+word;
        
    fetch(url).then(response => processResponse(response,word));
  }
  function processResponse(response,word)
  {
      if(response.ok)
        {
            changeTiles(word);
            
                
        }
  }
  function changeTiles(word)
  {
      
      let tileColl = document.getElementsByTagName("textarea");
      var tiles = [].slice.call(tileColl);
      tiles= tiles.slice(currGuess*LETTERS);
      var letList=correctWord.split('');
      if(word===correctWord)
      {
          tiles.forEach(element => {
              element.className="Letter-correct";
              element.disabled=true;
          });
          setTimeout(()=> alert('you win'),1000);
        
        return;
      }
      for(var i=0; i<LETTERS; i++)
      {
          tiles[i].disabled=true;
          if(word[i]===correctWord[i])
          {
            if(letList.includes(word[i]))
            tiles[i].className="Letter-correct";
            const index= letList.indexOf(word[i]);
              letList.splice(index,1);
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
      if(currGuess===GUESSES)
      {
          alert("You lose!");
          return;
      }
      document.getElementById("guess"+currGuess).hidden=false;
  }




export default App;