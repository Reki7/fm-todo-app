import './App.scss'
import { Provider } from "react-redux";
import { store } from './data/store'
import TodoList from "./components/TodoList.jsx";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <div className='AppBanner'></div>
        <TodoList />
      </div>
    </Provider>
  )
}

export default App
