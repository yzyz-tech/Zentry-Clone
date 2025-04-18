// import React from "react";
import Character from "./Components/Character";
import Button from "./Components/Button";
import About from "./Components/About";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Character />

      {/* 滚动后的第二个页面 */}
      <About />
      {/* <section className="z-0 min-h-screen bg-blue-500" /> */}
    </main>
  );
};

export default App;
