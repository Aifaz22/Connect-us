import "./App.css";
import NavBar from "./components/navbar";
import MainContent from "./components/maincontent";
import Login from "./components/login";
import RegisterUser from "./components/register";

function App() {
  return (
    <div className="App">
      <h1>ConnectUs</h1>
      <NavBar />
      <MainContent />
      {/* <RegisterUser /> */}
    </div>
  );
}

export default App;
