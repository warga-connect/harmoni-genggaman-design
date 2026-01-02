import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Star } from "lucide-react";

const categories = [
  { id: "all", label: "Semua", emoji: "🏪" },
  { id: "food", label: "Makanan", emoji: "🍲" },
  { id: "service", label: "Jasa", emoji: "🔧" },
  { id: "preloved", label: "Preloved", emoji: "👕" },
  { id: "plants", label: "Tanaman", emoji: "🌿" },
];

const products = [
  {
    id: 1,
    name: "Kue Nastar Homemade",
    price: 75000,
    seller: "Ibu Sari",
    location: "Blok A1/10",
    rating: 4.9,
    reviews: 23,
    category: "food",
    image: "🥧",
  },
  {
    id: 2,
    name: "Jasa Cuci Motor",
    price: 25000,
    seller: "Pak Budi",
    location: "Blok B2/05",
    rating: 4.8,
    reviews: 45,
    category: "service",
    image: "🏍️",
  },
  {
    id: 3,
    name: "Tanaman Monstera",
    price: 150000,
    seller: "Bu Dewi",
    location: "Blok C3/15",
    rating: 5.0,
    reviews: 12,
    category: "plants",
    image: "🌿",
  },
  {
    id: 4,
    name: "Snack Box Arisan",
    price: 50000,
    seller: "Ibu Ani",
    location: "Blok A2/08",
    rating: 4.7,
    reviews: 67,
    category: "food",
    image: "🍱",
  },
  {
    id: 5,
    name: "Tas Branded Preloved",
    price: 350000,
    seller: "Mbak Rina",
    location: "Blok D1/03",
    rating: 4.9,
    reviews: 8,
    category: "preloved",
    image: "👜",
  },
  {
    id: 6,
    name: "Jasa Les Matematika",
    price: 100000,
    seller: "Kak Dian",
    location: "Blok B1/12",
    rating: 5.0,
    reviews: 34,
    category: "service",
    image: "📚",
  },
];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="bg-card px-5 pt-6 pb-4 border-b border-border sticky top-0 z-10">
          <h1 className="text-xl font-bold text-foreground mb-4">Pasar Tetangga</h1>

          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari produk atau jasa..."
                className="pl-10 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product.id}`}
                className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="w-full h-28 bg-muted flex items-center justify-center text-4xl">
                  {product.image}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                    {product.name}
                  </p>
                  <p className="text-base font-bold text-primary mt-1">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-[10px] font-medium text-foreground">{product.rating}</span>
                    <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">
                    {product.seller} • {product.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-muted-foreground">Tidak ada produk ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
