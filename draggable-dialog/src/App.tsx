import { useState } from 'react'
import './App.css'
import { Modal } from './components/modal/Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="App">
      {isModalOpen && <Modal/>}
      <button className='modal-button' onClick={() => setIsModalOpen(prev => !prev)}>{isModalOpen ? <>Close</> : <>Open</>}</button>
    </div>
  )
}

export default App
