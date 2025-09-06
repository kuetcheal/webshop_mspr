export default function CartDrawer() {
  return (
    <div className="w-80 p-6 flex flex-col items-center text-center">
      <h2 className="text-lg font-bold mb-6">Panier</h2>
      <div className="text-gray-500">Votre panier est vide.</div>
      <button className="mt-6 px-4 py-2 bg-purple-600 text-white rounded">
        Parcourez nos produits
      </button>
    </div>
  );
}
