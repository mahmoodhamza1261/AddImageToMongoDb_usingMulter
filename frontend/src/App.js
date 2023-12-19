import logo from './logo.svg';
import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Image from './components/ImageUpload';

function App() {
  return (
    <div className="App">
      <Link to="/imagePage">Image upload</Link>
      <Routes>
        <Route path="/imagePage" element={<Image/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
