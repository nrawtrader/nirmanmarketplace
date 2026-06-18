import { useState } from "react";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";
import type { Order } from "@/contexts/OrderContext";

const STATUS_STEPS = [
  { key: "confirmed", label: "Order Confirmed", desc: "We received your order", icon: CheckCircle2 },
  { key: "processing", label: "Processing", desc: "Materials being packed", icon: Package },
  { key: "dispatched", label: "Dispatched", desc: "On the way to you", icon: Truck },
  { key: "delivered", label: "Delivered", desc: "Order complete!", icon: CheckCircle2 },
] as const;

const STATUS_INDEX: Record<Order["status"], number> = {
  confirmed: 0,
  processing: 1,
  dispatched: 2,
  delivered: 3,
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState<Order | null | undefined>(undefined);
  const { getOrder, orders } = useOrders();
  const { user, setIsSignInOpen } = useAuth();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    const order = await getOrder(orderId.trim().toUpperCase());
    setFound(order ?? null);
    setSearched(true);
  };

  const currentStep = found ? STATUS_INDEX[found.status] : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your Order ID to see the delivery status of your construction materials.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="rounded-2xl border border-border bg-card p-6 mb-8">
            <Label htmlFor="orderId" className="text-sm font-medium mb-2 block">
              Order ID
            </Label>
            <div className="flex gap-3">
              <Input
                id="orderId"
                value={orderId}
                onChange={(e) => { setOrderId(e.target.value.toUpperCase()); setSearched(false); }}
                placeholder="e.g. NM-260615-1234"
                className="font-mono tracking-wider"
              />
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 shrink-0">
                <Search className="w-4 h-4" />
                Track
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your Order ID was shown on the confirmation page and starts with NM-
            </p>
          </form>

          {/* Results */}
          {searched && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {!found ? (
                <div className="text-center rounded-2xl border border-border bg-card p-10">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">Order not found</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please check your Order ID. It looks like NM-YYMMDD-XXXX
                  </p>
                  <a
                    href="https://wa.me/919198391797"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2 border-green-500 text-green-700 hover:bg-green-50">
                      <MessageCircle className="w-4 h-4" />
                      Ask on WhatsApp
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Order Header */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                        <p className="font-bold text-foreground font-mono text-lg">{found.id}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full capitalize">
                        {found.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Placed On</p>
                        <p className="font-medium text-foreground">
                          {new Date(found.placedAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Estimated Delivery</p>
                        <p className="font-medium text-foreground">{found.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="font-semibold text-foreground mb-6">Delivery Progress</h2>
                    <div className="relative">
                      {/* Connecting line */}
                      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
                      <div
                        className="absolute left-5 top-5 w-0.5 bg-accent transition-all duration-700"
                        style={{ height: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
                      />
                      <div className="space-y-6 relative">
                        {STATUS_STEPS.map((step, i) => {
                          const done = i <= currentStep;
                          const Icon = step.icon;
                          return (
                            <div key={step.key} className="flex items-start gap-4 pl-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                                done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="pt-2">
                                <p className={`text-sm font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>
                                  {step.label}
                                </p>
                                <p className="text-xs text-muted-foreground">{step.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      Delivery Address
                    </h2>
                    <p className="text-sm text-foreground">{found.form.name}</p>
                    <p className="text-sm text-muted-foreground">{found.form.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {found.form.city}, {found.form.state} — {found.form.pincode}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                      <Phone className="w-3.5 h-3.5" />
                      {found.form.phone}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="font-semibold text-foreground mb-4">Items Ordered</h2>
                    <div className="space-y-3">
                      {found.items.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.product.name}</span>
                          <span className="text-muted-foreground">
                            {item.quantity} × ₹{item.product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{found.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Help */}
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm">
                    <p className="font-medium text-green-800 mb-1">Need help with your order?</p>
                    <p className="text-green-700 mb-3">
                      Call us or chat on WhatsApp — we're available 9 AM to 6 PM, Monday to Saturday.
                    </p>
                    <div className="flex gap-3">
                      <a href="tel:+919198391797">
                        <Button size="sm" variant="outline" className="gap-1.5 border-green-500 text-green-700 hover:bg-green-100">
                          <Phone className="w-3.5 h-3.5" />
                          Call Us
                        </Button>
                      </a>
                      <a href={`https://wa.me/919198391797?text=${encodeURIComponent(`Hi! I need help with my order ${found.id}`)}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* My Orders — shown when signed in */}
          {user && orders.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                My Orders
              </h2>
              <div className="space-y-3">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => { setOrderId(order.id); setFound(order); setSearched(true); }}
                    className="w-full text-left rounded-xl border border-border bg-card p-4 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-semibold text-foreground">{order.id}</span>
                      <span className="text-xs bg-green-100 text-green-700 font-medium px-2.5 py-0.5 rounded-full capitalize">{order.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      {" · "}₹{order.total.toLocaleString("en-IN")}
                      {" · "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sign-in prompt for guests */}
          {!user && !searched && (
            <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center">
              <User className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">Sign in to see all your orders</p>
              <p className="text-xs text-muted-foreground mb-3">View order history across all your devices</p>
              <Button size="sm" variant="outline" onClick={() => setIsSignInOpen(true)}>Sign In</Button>
            </div>
          )}

          {/* Helpful tip */}
          {!searched && (
            <div className="text-center p-6 text-sm text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>Can't find your Order ID? Call us at <strong>+91 91983 91797</strong></p>
              <p className="mt-1">We're available Mon–Sat, 9 AM – 6 PM</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
