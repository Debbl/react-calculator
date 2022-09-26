import Footer from "@/components/Footer";
import Counter from "./components/Counter";

function App() {
  return (
    <div className="h-full overflow-auto pt-10 text-center text-gray-700 dark:bg-slate-800 dark:text-gray-300/80">
      <Counter />
      <Footer />
    </div>
  );
}

export default App;
