import emailjs from "@emailjs/browser";
import type { Order } from "@/contexts/OrderContext";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const ESTIMATE_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ESTIMATE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || "nirmantradersjnk@gmail.com";

export const sendOrderNotification = async (order: Order): Promise<void> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    // EmailJS not configured — skip silently (still saves to localStorage)
    console.warn("EmailJS not configured. Order saved locally only.");
    return;
  }

  const itemsList = order.items
    .map((i) => `• ${i.product.name} × ${i.quantity} = ₹${(i.product.price * i.quantity).toLocaleString("en-IN")}`)
    .join("\n");

  const paymentLabels: Record<string, string> = {
    cod: "Cash on Delivery",
    upi: "UPI Transfer",
    bank: "Bank Transfer",
  };

  const templateParams = {
    to_email: OWNER_EMAIL,
    order_id: order.id,
    customer_name: order.form.name,
    customer_phone: order.form.phone,
    customer_email: order.form.email || "Not provided",
    delivery_address: `${order.form.address}, ${order.form.city}, ${order.form.state} - ${order.form.pincode}`,
    items_list: itemsList,
    order_total: `₹${order.total.toLocaleString("en-IN")}`,
    payment_method: paymentLabels[order.form.paymentMethod] || order.form.paymentMethod,
    estimated_date: order.estimatedDelivery,
    notes: order.form.notes || "None",
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};

interface EstimateRequestItem {
  brand: string;
  dimension: string;
  quantity: number;
  unit: string;
  category: string;
}

export const sendEstimateNotification = async (data: {
  name: string;
  mobile: string;
  items: EstimateRequestItem[];
}): Promise<void> => {
  if (!SERVICE_ID || !ESTIMATE_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS estimate template not configured.");
    return;
  }

  const itemsList = data.items
    .map((i) => `• ${i.brand}${i.dimension ? ` (${i.dimension})` : ""} — ${i.quantity} ${i.unit}`)
    .join("\n");

  await emailjs.send(SERVICE_ID, ESTIMATE_TEMPLATE_ID, {
    to_email: OWNER_EMAIL,
    customer_name: data.name,
    customer_phone: data.mobile,
    items_list: itemsList,
  }, PUBLIC_KEY);
};
