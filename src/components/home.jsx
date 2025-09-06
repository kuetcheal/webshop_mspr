import { Button } from "@mui/material";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
         Bienvenue sur mon site voiture
      </h1>
      
      {/* Bouton MUI */}
      <Button variant="contained" color="primary">
        Bouton MUI
      </Button>

      <h1>bonnjour à tous</h1>

      {/* Bouton Tailwind */}
      <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
        Bouton Tailwind
      </button>
    </div>
  );
}

export default App;
