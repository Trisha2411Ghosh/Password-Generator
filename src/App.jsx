import { useState , useCallback , useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(number) str+="0123456789"
    if(character) str+="!@#$%^&*()_+-=[]{}|;:',.<>?~`/"
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass+=str.charAt(char);
    }
    setPassword(pass)
  } , [length,number,character,setPassword])

  const copytoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,number,character,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-600 bg-gray-600'>
        <h1 className='text-center text-white text-3xl px-4 py-4 font-bold my-3'>Generate Your Password</h1>
        <div className='flex shadow-md rounded-md overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full rounded-sm px-3 py-1'
          placeholder='Password'
          ref={passwordRef}
          readOnly
          />
          <button 
          className='bg-blue-700 outline-none shrink-0 rounded-sm px-4 py-2 text-white cursor-pointer hover:bg-green-900'
          onClick={copytoClipboard}>Copy</button>
        </div>
        <div>
          <div className='flex justify-center gap-x-3 text-base font-semibold py-3 accent-blue-600'>
              <input 
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={ (e) => {setLength(e.target.value)}}
              />
              <label htmlFor='range'>Length : {length}</label>

              <div className='space-x-3'></div>

              <input 
              type="checkbox"
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }}
              className="cursor-pointer"
              />
              <label htmlFor="number">Numbers</label>

              <div className='space-x-3'></div>

              <input 
              type="checkbox" 
              defaultChecked={character}
              className="cursor-pointer"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
              />
              <label>Special Character</label>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-white font-bold text-xl">
      Engineered by <a href="https://github.com/Trisha2411Ghosh" font-semibold target="_blank" className="underline">Trisha</a> 💖
      </div>
    </>
  )
}

export default App
