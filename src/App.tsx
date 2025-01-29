import './App.css'
import StartImage from './assets/icons/startimage.svg'
import Logo from './assets/icons/logo.svg'
import { Button } from './components/Button.js'
import ResetIcon from './assets/icons/reset.svg'

function App() {
  return (
    <div className="flex items-start gap-6">
      <img src={StartImage} alt="Canvas start image"></img>
      <div className="text-primary flex flex-grow items-center gap-3">
        <img src={Logo} alt="Logo" width={64}></img>
        <div className="flex-grow text-[32px] font-bold">CanvasEditor</div>
        <Button variant="text" icon={ResetIcon}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default App
