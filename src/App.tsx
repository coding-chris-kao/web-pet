import './App.scss'
import { BorderCollie } from './pet/BorderCollie'

function App() {
  const name = '肉粽'
  const birthDay = '2021-06-14'

  return (
    <div className="App">
      <BorderCollie name={name} birthDay={new Date(birthDay)} />
    </div>
  )
}

export default App
