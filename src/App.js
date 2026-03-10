import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Notfound from './components/Notfound';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Sokogarden</h1>
        </header>
        {/* Below are our different routes and their rendered components */}
        <Routes>
          <Route path="/getproducts" element={<Getproducts />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
