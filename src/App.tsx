import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Products from "./pages/Products";
import SteelDetail from "./pages/SteelDetail";
import HouseDesigns from "./pages/HouseDesigns";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OrderProvider>
          <CartProvider>
            <CartDrawer />
            <WhatsAppFAB />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/products" element={<Products />} />
              <Route path="/steel/:id" element={<SteelDetail />} />
              <Route path="/designs" element={<HouseDesigns />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </OrderProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
