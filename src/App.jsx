import Character from "./Components/Character";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Features from "./Components/Features";
import Story from "./Components/Story";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Character />
      <About /> {/* 滚动后的第二个页面 */}
      <Features />
      <Story />
    </main>
  );
};

export default App;
