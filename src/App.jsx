import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='header'>
        <h1>Rock Paper Scissors</h1>
      </div>
    
    <div className="result">
        <p>Paper covers Rock.</p>
    </div>
    <br/>
    <div className="betclass">
        <div className="betpart">Your bet: (in TBNB)</div>
        <div className="betpart"><input type="text" id="bet" /></div>
    </div>

    <div className="choices">
        <div className="choice" id="r">
            <img src="rock.png" alt="" style={{width: '350px'}}/>
        </div>
        <div className="choice" id="p">
            <img src="paper.png" alt="" style={{width: '350px'}}/>
        </div>
        <div className="choice" id="s">
            <img src="scissors.png" alt="" style={{width: '350px'}}/>
        </div>
    </div>

    <p id="action-msg">Make your choice.</p>
    
    <div className="gamehistory">
        <button>Game History</button> <p style={{fontSize: 'x-small'}}>if not shown, try click twice or wait longer</p>
        <p><span id="history"></span></p>
    </div>
    </>
  )
}

export default App
