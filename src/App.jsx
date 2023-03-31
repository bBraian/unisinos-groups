import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedClass, setSelectedClass] = useState(1);
  return (
    <div className="App">
      <Header setSelectedClass={setSelectedClass} />
      <Body selectedClass={selectedClass} />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
