import { useState, useCallback, useEffect,useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef hook
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*(){}[]?+-_<>`"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed,setPassword
  ]);

  const copyPassClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className='w-50  text-center m-auto mt-5 py-4 rounded text-light  ' style={{ backgroundColor: 'rgb(1,9,15)' }}>
        <h4 className='text-center text-white'>Password Generator</h4>
        <form>
          <div className='row g-2 d-flex justify-content-center'>
            <div className="col-auto w-50">
              <input type="text" value={password} className="form-control" placeholder="Password" readOnly ref={passwordRef} />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary mb-3" onClick={copyPassClipboard}>Copy</button>
            </div>
            <div className='row w-75 g-3 d-flex justify-content-around '>
              <div className="col-auto d-flex">
                <input type="range" min={8} max={32} value={length} className='me-2' style={{ cursor: 'pointer' }} id='range' onChange={(e) => { setLength(e.target.value) }} />
                <label htmlFor='range'>Length:{length}</label>
              </div>
              <div className="col-auto d-flex">
                <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' className='me-2' style={{ cursor: 'pointer' }} onChange={() => setNumberAllowed((prev) => !prev)} />
                <label htmlFor='numberInput'>Number</label>
              </div>
              <div className="col-auto d-flex">
                <input type='checkbox' defaultChecked={charAllowed} id='charInput' className='me-2' style={{ cursor: 'pointer' }} onChange={() => setCharAllowed((prev) => !prev)} />
                <label htmlFor='charInput'>Character</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
