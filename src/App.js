import React, { useState, useEffect } from 'react'
import './App.css'
import {HiSave} from 'react-icons/hi'
import {MdOutlineStopCircle} from 'react-icons/md'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1 style={{textAlign:'center',color:'azure'}}>Voice AI</h1>
      <div >
        <center>
        <div className="b">
          <h2 style={{color:'azure'}}>Sppech Recordeing Bar</h2>
          {isListening ? <span></span> : <span></span>}
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <button style={{color:'azure'}} onClick={handleSaveNote} disabled={!note}>
            <HiSave/>
          </button> 
          <button style={{color:'azure'}} onClick={() => setIsListening(prevState => !prevState)}>
            <MdOutlineStopCircle/>
          </button>
          </div>
         
          <p style={{color:'azure'}}>{note}</p>
        </div>
        </center>
     
      <center>
        
      </center>
      <center>
      <div className='b'>
          <h2 style={{color:'azure'}}>Saved</h2>
          {savedNotes.map(n => (
            <p style={{color:'azure'}} key={n}>{n}</p>
          ))}
        </div>
      </center>
       
      </div>
    </>
  )
}

export default App
