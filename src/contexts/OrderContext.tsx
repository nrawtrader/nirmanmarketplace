import { createContext, useContext, useState, ReactNode } from "react";
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
  status: "confirmed" | "processing" | "dispatched" | "delivered";
  estimatedDelivery: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "placedAt" | "status" | "estimatedDelivery">) => Order;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

const generateOrderId = () => {
  const date = new Date();
  const prefix = "NM";
  const dateStr = `${date.getFullYear().toString().slice(-2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}-${dateStr}-${random}`;
};

const getEstimatedDelivery = () => {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 3);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("nirman-orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addOrder = (data: Omit<Order, "id" | "placedAt" | "status" | "estimatedDelivery">) => {
    const order: Order = {
      ...data,
      id: generateOrderId(),
      placedAt: new Date().toISOString(),
      status: "confirmed",
      estimatedDelivery: getEstimatedDelivery(),
    };
    setOrders((prev) => {
      const updated = [order, ...prev];
      localStorage.setItem("nirman-orders", JSON.stringify(updated));
      return updated;
    });
    return order;
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
