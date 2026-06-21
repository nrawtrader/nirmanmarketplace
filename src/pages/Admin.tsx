import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle2, Clock, LogIn } from "lucide-react";
import type { Order } from "@/contexts/OrderContext";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "nirman2024";

const STATUS_OPTIONS: Order["status"][] = ["pending", "confirmed", "processing", "dispatched", "delivered"];

const STATUS_COLORS: Record<Order["status"], string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  confirmed:  "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  dispatched: "bg-orange-100 text-orange-800",
  delivered:  "bg-green-100 text-green-800",
};

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("nirman-admin") === "1");
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("nirman-admin", "1");
      setAuthed(true);
    } else {
      setPwError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!authed || !db) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db!, "orders"), orderBy("placedAt", "desc"));
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => d.data() as Order));
      } catch {
        // Firestore not set up or rules blocking — ignore
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [authed]);

  const updateStatus = async (orderId: string, status: Order["status"]) => {
    if (!db) return;
    setUpdating(orderId);
    try {
      const q = query(collection(db!, "orders"));
      const snap = await getDocs(q);
      const docRef = snap.docs.find((d) => d.data().id === orderId)?.ref;
      if (docRef) {
        await updateDoc(docRef, { status });
        setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
      }
    } finally {
      setUpdating(null);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Nirman MarketPlace</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwError(""); }}
              autoFocus
            />
            {pwError && <p className="text-xs text-destructive">{pwError}</p>}
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Orders Dashboard</h1>
          <p className="text-xs text-muted-foreground">Nirman MarketPlace Admin</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { sessionStorage.removeItem("nirman-admin"); setAuthed(false); }}>
          Logout
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono font-bold text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(order.placedAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="font-medium text-foreground">{order.form.name}</p>
                    <p className="text-muted-foreground">+91 {order.form.phone}</p>
                    {order.form.email && <p className="text-muted-foreground">{order.form.email}</p>}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">{order.form.address}</p>
                    <p className="text-muted-foreground text-xs">{order.form.city}, {order.form.state} — {order.form.pincode}</p>
                  </div>
                </div>

                <div className="text-sm mb-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-muted-foreground">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold text-foreground border-t border-border mt-2 pt-2">
                    <span>Total</span>
                    <span>₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Status update buttons */}
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(order.id, s)}
                      disabled={order.status === s || updating === order.id}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-all
                        ${order.status === s
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {order.form.notes && (
                  <p className="text-xs text-muted-foreground mt-3 italic">Note: {order.form.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
