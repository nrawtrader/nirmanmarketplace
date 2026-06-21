import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import SignInDialog from "@/components/SignInDialog";

// Lazy load all pages — improves initial load speed significantly
const Index = lazy(() => import("./pages/Index"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Products = lazy(() => import("./pages/Products"));
const SteelDetail = lazy(() => import("./pages/SteelDetail"));
const HouseDesigns = lazy(() => import("./pages/HouseDesigns"));
const Checkout = lazy(() => import("./pages/Checkout"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <CartDrawer />
              <WhatsAppFAB />
              <SignInDialog />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/steel/:id" element={<SteelDetail />} />
                  <Route path="/designs" element={<HouseDesigns />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/blog" element={<Blogs />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
