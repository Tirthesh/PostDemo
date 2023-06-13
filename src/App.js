import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';
import Login from './Login';
import Header from './Header';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<List />} />
          <Route path="post/add" element={<Add />} />
          <Route path="post/edit/:id" element={<Edit />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
