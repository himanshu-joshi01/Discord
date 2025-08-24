import './App.css'
import { Shell } from './Components/Shell'
import { ThemeProvider } from './Context/ThemeProvider'
import DiscordUI from './DiscordUi'
import ElegantChatUI from './ElegantChatUI'
import ModernChat from './ModernChat'
import ModernChatApp from './ModernChatApp'


function App() {

  return (
    <>
    {/* <DiscordUI/> */}
    {/* <ElegantChatUI/> */}
    {/* <ModernChatApp/> */}
    {/* <div className="mt-20">
      
    <ModernChat />
    </div> */}
<ThemeProvider>
  <Shell/>
</ThemeProvider>
</>
  )
}

export default App
