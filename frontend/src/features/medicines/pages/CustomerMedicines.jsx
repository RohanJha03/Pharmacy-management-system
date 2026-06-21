import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, ShoppingCart, ShoppingBag, Plus, Minus } from "lucide-react";
import API from "../../../services/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

export default function CustomerMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartQty, setCartQty] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    "tablet", "capsule", "syrup", "injection", "ointment", "drops",
    "iv_fluid", "medical_device", "surgical", "personal_care",
    "nutrition", "baby_care", "veterinary", "ayurvedic", "others",
  ];

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines");
      setMedicines(data.data || []);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to load medicines"
      );
    }
  };

  const filtered = medicines
    .filter((m) => m.productName?.toLowerCase().includes(search.toLowerCase()))
    .filter((m) => selectedCategory ? m.productCategory === selectedCategory : true);

  const handleQtyChange = (id, value) => {
    const val = Math.max(1, Number(value) || 1);
    setCartQty({ ...cartQty, [id]: val });
  };

  const increaseQty = (id) => {
    const current = cartQty[id] || 1;
    setCartQty({ ...cartQty, [id]: current + 1 });
  };

  const decreaseQty = (id) => {
    const current = cartQty[id] || 1;
    if (current > 1) {
      setCartQty({ ...cartQty, [id]: current - 1 });
    }
  };

  const handleAddToCart = (medicine) => {
    const qty = Number(cartQty[medicine._id]) || 1;
    if (qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const userId = user?._id || user?.id;
    if (userId) {
      try {
        const savedCart = localStorage.getItem(`reviewOrders_${userId}`);
        let cartItems = savedCart ? JSON.parse(savedCart) : [];

        const existingIndex = cartItems.findIndex((item) => item.medicineId === medicine._id);
        if (existingIndex > -1) {
          cartItems[existingIndex].qty += qty;
          cartItems[existingIndex].total = cartItems[existingIndex].price * cartItems[existingIndex].qty;
        } else {
          cartItems.push({
            medicineId: medicine._id,
            medicine: medicine.productName,
            category: medicine.productCategory,
            mrp: medicine.mrp,
            discount: medicine.discount,
            price: medicine.price,
            qty: qty,
            total: medicine.price * qty
          });
        }
        localStorage.setItem(`reviewOrders_${userId}`, JSON.stringify(cartItems));
        toast.success(`${medicine.productName} added to cart! 🛒`);
      } catch (err) {
        console.error("Cart save error:", err);
        toast.error("Failed to add item to cart");
      }
    }
  };

  const handleBuyNow = (medicine) => {
    // Add to cart
    handleAddToCart(medicine);
    // Redirect to review orders cart checkout page
    navigate("/dashboard/review-orders");
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight">Shop Medicines</h1>
          <p className="text-sm text-gray-500 mt-1">Browse, search, and purchase premium medicines</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search medicines..."
            className="input input-bordered w-full md:w-72 rounded-2xl bg-white border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`btn rounded-2xl border-0 text-white flex items-center gap-2 ${
              showFilters ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-800 hover:bg-emerald-900"
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      {/* FILTERS */}
      {showFilters && (
        <div className="card bg-white shadow-sm border border-base-200 mb-8 rounded-3xl overflow-hidden">
          <div className="card-body p-6">
            <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                  className={`btn btn-sm rounded-full capitalize transition-all duration-200 ${
                    selectedCategory === cat 
                      ? "bg-emerald-800 text-white border-0 hover:bg-emerald-900" 
                      : "btn-outline border-gray-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-800 text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium text-lg">No Medicines Found</p>
          <p className="text-gray-400 text-sm mt-1">Try resetting your search query or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((med) => {
            const qty = cartQty[med._id] || 1;
            const fallbackImage = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60";
            
            return (
              <div 
                key={med._id} 
                className="card bg-white border border-[#e7ece9] shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition duration-200 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden shrink-0">
                  <img 
                    src={med.image || fallbackImage} 
                    alt={med.productName} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {med.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                      {med.discount}% OFF
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-emerald-900/90 text-white font-bold text-xs px-2.5 py-1 rounded-full capitalize shadow-sm">
                    {med.productCategory}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                    {med.manufacturer || "General"}
                  </span>
                  <h2 className="text-lg font-bold text-[#111827] mt-1 leading-snug hover:text-emerald-800 cursor-pointer">
                    {med.productName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-grow">
                    {med.description || "High-quality pharmaceutical product sourced from verified distributors."}
                  </p>

                  <div className="h-4" />

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 shrink-0">
                    <span className="text-2xl font-extrabold text-[#0f5c2e]">
                      ₹{med.price?.toFixed(2)}
                    </span>
                    {med.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{med.mrp?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="h-5" />

                  {/* Qty Selector & Actions */}
                  <div className="space-y-3 shrink-0">
                    {/* Qty Select */}
                    <div className="flex items-center justify-between border border-[#e5e7eb] rounded-2xl p-1 bg-[#f9fafb]">
                      <span className="text-xs text-gray-500 font-semibold pl-3">Quantity</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => decreaseQty(med._id)} 
                          className="btn btn-xs btn-ghost btn-circle text-gray-500 hover:text-emerald-800"
                        >
                          <Minus size={14} />
                        </button>
                        <input 
                          type="number" 
                          min="1"
                          value={qty} 
                          onChange={(e) => handleQtyChange(med._id, e.target.value)}
                          className="w-12 text-center bg-transparent border-0 font-bold text-sm text-gray-800 focus:ring-0 focus:outline-none"
                        />
                        <button 
                          onClick={() => increaseQty(med._id)} 
                          className="btn btn-xs btn-ghost btn-circle text-gray-500 hover:text-emerald-800"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Actions buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleAddToCart(med)}
                        className="btn btn-outline border-[#0f5c2e] hover:bg-[#0f5c2e] hover:border-[#0f5c2e] text-[#0f5c2e] hover:text-white rounded-2xl h-11 min-h-[44px] text-xs font-bold transition duration-200"
                      >
                        <ShoppingCart size={14} className="mr-1" /> Add to Cart
                      </button>
                      <button 
                        onClick={() => handleBuyNow(med)}
                        className="btn bg-[#0f5c2e] hover:bg-[#0c4d27] border-0 text-white rounded-2xl h-11 min-h-[44px] text-xs font-bold shadow-sm transition duration-200"
                      >
                        <BagIcon size={14} className="mr-1" /> Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Inline fallback icon for Buy Now
function BagIcon({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
}