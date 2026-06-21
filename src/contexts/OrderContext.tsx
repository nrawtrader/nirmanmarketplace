import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  collection, addDoc, query, where, getDocs, doc, getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthContext";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes: string;
    paymentMethod: string;
  };
  placedAt: string;
  status: "pending" | "confirmed" | "processing" | "dispatched" | "delivered";
  estimatedDelivery: string;
  userId?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "placedAt" | "status" | "estimatedDelivery">) => Promise<Order>;
  getOrder: (id: string) => Promise<Order | undefined>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

const generateOrderId = () => {
  const date = new Date();
  const dateStr = `${date.getFullYear().toString().slice(-2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `NM-${dateStr}-${random}`;
};

const getEstimatedDelivery = () => {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 3);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
};

const isFirebaseConfigured = () =>
  !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

const loadLocalOrders = (): Order[] => {
  try {
    const saved = localStorage.getItem("nirman-orders");
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveLocalOrders = (orders: Order[]) => {
  localStorage.setItem("nirman-orders", JSON.stringify(orders));
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(loadLocalOrders);
  const configured = isFirebaseConfigured();

  // When user signs in, load their orders from Firestore
  useEffect(() => {
    if (!configured || !user || !db) {
      setOrders(loadLocalOrders());
      return;
    }
    const fetchOrders = async () => {
      try {
        const q = query(collection(db!, "orders"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        const firestoreOrders = snap.docs.map((d) => d.data() as Order);
        // merge with local orders (in case they placed an order before signing in)
        const local = loadLocalOrders();
        const merged = [
          ...firestoreOrders,
          ...local.filter((lo) => !firestoreOrders.find((fo) => fo.id === lo.id)),
        ].sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
        setOrders(merged);
      } catch {
        setOrders(loadLocalOrders());
      }
    };
    fetchOrders();
  }, [user, configured]);

  const addOrder = async (data: Omit<Order, "id" | "placedAt" | "status" | "estimatedDelivery">): Promise<Order> => {
    const order: Order = {
      ...data,
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      status: "pending",
      estimatedDelivery: getEstimatedDelivery(),
      userId: user?.uid,
    };

    // Always save locally
    setOrders((prev) => {
      const updated = [order, ...prev];
      saveLocalOrders(updated);
      return updated;
    });

    // Also save to Firestore if configured and user is signed in
    if (configured && user && db) {
      try {
        await addDoc(collection(db!, "orders"), order);
      } catch {
        // Firestore save failed — order is still in localStorage
      }
    }

    return order;
  };

  const getOrder = async (id: string): Promise<Order | undefined> => {
    // Check in-memory first
    const inMemory = orders.find((o) => o.id === id);
    if (inMemory) return inMemory;

    // If Firebase configured, search Firestore
    if (configured && db) {
      try {
        const q = query(collection(db!, "orders"), where("id", "==", id));
        const snap = await getDocs(q);
        if (!snap.empty) return snap.docs[0].data() as Order;
      } catch { /* ignore */ }
    }

    // Fallback: localStorage
    return loadLocalOrders().find((o) => o.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
