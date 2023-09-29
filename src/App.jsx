import { useState } from 'react'

function App() {

  const [ score, setScore ] = useState({
    userScore: 0,
    compScore: 0
  })

  const [ result, setResult ] = useState('Paper covers Rock.')
  
  function convertToWord(n){
    if(n === 0){ return 'Rock'}
    if(n === 1){ return 'Paper'}
    if(n === 2){return 'Scissors'}
    else{return "Computer's choice"}

  }

  function updateScore() {
    
  }

  function win(userChoice, compChoice){
    setResult(convertToWord(userChoice) + ' beats ' + convertToWord(compChoice) + ". You win!")
  }

  function lose(userChoice, compChoice){
    setResult(convertToWord(userChoice) + ' loses to ' + convertToWord(compChoice) + ". You lost...")
  }

  function draw(userChoice, compChoice){
    setResult(convertToWord(userChoice) + ' equals to ' + convertToWord(compChoice) + ". It's a draw!")
  }

  async function game(userChoice){

    const bet = document.getElementById('bet').value;

    const value = ethers.utils.parseEther(bet);

    // Unscribe, why not work((((
    await contract.off("GamePlayed");
    // userScore_span.removeEventListener('DOMSubtreeModified', updateScore);
    // compScore_span.removeEventListener('DOMSubtreeModified', updateScore);

    // Subscribe
    const eventName = "GamePlayed";
    await contract.on(eventName, (player, isWinner, outcome, userChoice, compChoice, event) => {
        console.log(`Player: ${player}, Winner: ${isWinner}, Outcome: ${outcome}`);
        const compChoiceInt = parseInt(compChoice.toString());
        if(outcome === "TIE"){draw(userChoice, compChoiceInt)}
        else if(outcome === "WIN"){win(userChoice, compChoiceInt)}
        else if(outcome === "LOSE"){lose(userChoice, compChoiceInt)}
    });

    await contract.playgame(userChoice,  { value: value });

}

async function viewHistory(){
    const eventName = "GamePlayed";
    const filter = contract.filters.GamePlayed();

    const events = await contract.queryFilter(filter);

    events.forEach((event) => {
        const player = event.args.player;
        const isWinner = event.args.isWinner;
        const outcome = event.args.outcome;
        const userChoice = event.args.userChoice;
        const compChoice = parseInt(event.args.compChoice.toString());
        
        history.innerHTML +=  `<br> Player: ${player}, Winner: ${isWinner}, Outcome: ${outcome} <br>Where User choice - ${convertToWord(userChoice)}, Computer choice - ${convertToWord(compChoice)}<br><br>`;
    });
}

  return (
    <>
      <div className='header'>
        <h1>Rock Paper Scissors</h1>
      </div>
    
    <div className="result">
        <p>{result}</p>
    </div>
    <br/>
    <div className="betclass">
        <div className="betpart">Your bet: (in TBNB)</div>
        <div className="betpart"><input type="text" id="bet" /></div>
    </div>

    <div className="choices">
        <div className="choice" id="r" onClick={() => {game(0)}}>
            <img src="rock.png" alt="" style={{width: '350px'}}/>
        </div>
        <div className="choice" id="p" onClick={() => {game(1)}}>
            <img src="paper.png" alt="" style={{width: '350px'}}/>
        </div>
        <div className="choice" id="s" onClick={() => {game(2)}}>
            <img src="scissors.png" alt="" style={{width: '350px'}}/>
        </div>
    </div>

    <p id="action-msg">Make your choice.</p>
    
    <div className="gamehistory">
        <button onClick={viewHistory}>Game History</button> <p style={{fontSize: 'x-small'}}>if not shown, try click twice or wait longer</p>
        <p><span id="history"></span></p>
    </div>
    </>
  )
}

export default App
