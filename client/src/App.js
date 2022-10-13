import './App.css';
import MainPage from './components/MainPage';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Expenses from './components/Expenses';
import ExpenseForm from './components/ExpenseForm';
import EditExpense from './components/EditExpense';
import Login from './components/Login';
import Register from './components/Register';
import GetExpense from './components/GetExpense';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard/:username' element={<Expenses/>} />
          <Route path='/new-expense' element={<ExpenseForm/>} />
          <Route path='/edit-expense/:id' element={<EditExpense/>} />
          <Route path='/expense/:id' element={<GetExpense/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
