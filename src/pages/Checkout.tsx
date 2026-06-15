import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useOrders, Order } from "@/contexts/OrderContext";
import { sendOrderNotification } from "@/lib/emailService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, CheckCircle, ArrowLeft, Copy, MessageCircle, Truck, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "",
    state: "", pincode: "", notes: "", paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.address.trim() || form.address.trim().length < 10) e.address = "Please enter your complete address";
    if (!form.city.trim()) e.city = "Please enter your city";
    if (!form.state) e.state = "Please select your state";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setTimeout(async () => {
      const order = addOrder({ items, total: totalPrice, form });
      clearCart();
      setPlacedOrder(order);
      setSubmitting(false);
      // Send email notification to owner (silently — don't block the success screen)
      try { await sendOrderNotification(order); } catch { /* email failed, order still placed */ }
    }, 1200);
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => toast.success("Order ID copied!"));
  };

  const whatsappMsg = (order: Order) =>
    `https://wa.me/919876543210?text=${encodeURIComponent(
      `Hi! I placed an order on Nirman MarketPlace.\nOrder ID: ${order.id}\nName: ${order.form.name}\nMobile: ${order.form.phone}\nTotal: ₹${order.total.toLocaleString("en-IN")}\n\nPlease confirm my order.`
    )}`;

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-lg w-full"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you, <strong>{placedOrder.form.name}</strong>! Our team will call you on{" "}
              <strong>{placedOrder.form.phone}</strong> to confirm delivery.
            </p>

            {/* Order ID box */}
            <div className="rounded-xl border border-border bg-card p-5 mb-4 text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Your Order ID</span>
                <button
                  onClick={() => copyOrderId(placedOrder.id)}
                  className="text-xs text-accent hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <p className="text-xl font-bold text-foreground font-mono tracking-widest">{placedOrder.id}</p>
              <p className="text-xs text-muted-foreground mt-1">Save this to track your order</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4 mb-6 text-left">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Truck className="w-4 h-4 text-accent" />
                Estimated Delivery
              </div>
              <p className="text-foreground font-semibold">{placedOrder.estimatedDelivery}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Delivery to: {placedOrder.form.address}, {placedOrder.form.city} — {placedOrder.form.pincode}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappMsg(placedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full border-green-500 text-green-700 hover:bg-green-50 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Confirm on WhatsApp
                </Button>
              </a>
              <Link to="/track-order" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Truck className="w-4 h-4" />
                  Track Order
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <Link to="/products">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to proceed with checkout</p>
            <Link to="/products">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Field = ({
    id, label, required, error, children,
  }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5" data-error={error ? true : undefined}>
      <Label htmlFor={id} className={error ? "text-destructive" : ""}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">Fill in your details — our team will call you to confirm</p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: <Shield className="w-4 h-4" />, label: "100% Genuine Products" },
              { icon: <Truck className="w-4 h-4" />, label: "Free Delivery" },
              { icon: <Clock className="w-4 h-4" />, label: "3–5 Day Delivery" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
                <span className="text-accent">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6" noValidate>
              {/* Delivery Details */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="name" label="Full Name" required error={errors.name}>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                  </Field>

                  <Field id="phone" label="Mobile Number" required error={errors.phone}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+91</span>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="10-digit number"
                        className={`pl-11 ${errors.phone ? "border-destructive" : ""}`}
                      />
                    </div>
                  </Field>

                  <div className="sm:col-span-2">
                    <Field id="email" label="Email (optional)" error={errors.email}>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field id="address" label="Complete Delivery Address" required error={errors.address}>
                      <Textarea
                        id="address"
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        placeholder="House/Flat No., Building Name, Street, Locality, Area"
                        rows={3}
                        className={errors.address ? "border-destructive" : ""}
                      />
                    </Field>
                  </div>

                  <Field id="city" label="City / Town" required error={errors.city}>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="City or Town"
                      className={errors.city ? "border-destructive" : ""}
                    />
                  </Field>

                  <Field id="state" label="State" required error={errors.state}>
                    <select
                      id="state"
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        errors.state ? "border-destructive" : "border-input"
                      }`}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  <Field id="pincode" label="Pincode" required error={errors.pincode}>
                    <Input
                      id="pincode"
                      value={form.pincode}
                      onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="6-digit pincode"
                      className={errors.pincode ? "border-destructive" : ""}
                    />
                  </Field>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
                <RadioGroup
                  value={form.paymentMethod}
                  onValueChange={(v) => updateField("paymentMethod", v)}
                  className="space-y-3"
                >
                  {[
                    { value: "cod", label: "Cash on Delivery", desc: "Pay when materials arrive at your site" },
                    { value: "upi", label: "UPI / PhonePe / GPay", desc: "Instant payment via UPI — you'll get payment link on WhatsApp" },
                    { value: "bank", label: "Bank Transfer / NEFT", desc: "Transfer to our account — we'll share details after order" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      htmlFor={`pay-${opt.value}`}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        form.paymentMethod === opt.value
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={`pay-${opt.value}`} className="mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Notes */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Delivery Instructions (Optional)</h2>
                <Textarea
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="E.g. Call before delivery, deliver after 10am, leave at site gate..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base h-12"
              >
                {submitting ? "Placing Order..." : `Place Order — ₹${totalPrice.toLocaleString("en-IN")}`}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By placing your order, you agree to our terms. Our team will call to confirm.
              </p>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Order Summary ({totalItems} items)
                </h2>
                <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-start py-2 border-b border-border last:border-0">
                      <div className="w-12 h-12 rounded-lg bg-secondary/40 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.image && item.product.image !== "/placeholder.svg" ? (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-0.5" />
                        ) : (
                          <ShoppingBag className="w-4 h-4 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-tight">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.quantity} × ₹{item.product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST</span>
                    <span className="text-muted-foreground">Included</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-3 mt-2">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 font-medium">Free delivery on all orders!</p>
                  <p className="text-xs text-green-600 mt-0.5">Materials delivered to your construction site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
