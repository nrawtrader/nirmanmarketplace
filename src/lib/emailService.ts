import emailjs from "@emailjs/browser";
import type { Order } from "@/contexts/OrderContext";

// ─────────────────────────────────────────────────────────
// HOW TO SET UP (takes 5 minutes):
//
// 1. Go to https://www.emailjs.com → sign up free
// 2. Add Email Service → choose Gmail → connect your Gmail account
// 3. Create Email Template → use the variables below
// 4. Copy Service ID, Template ID, Public Key
// 5. Create .env.local in project root with these values:
//
//    VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//    VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//    VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
// ─────────────────────────────────────────────────────────

// EmailJS template variables you need in your template:
// {{to_email}}       → your business email
// {{order_id}}       → e.g. NM-260615-1234
// {{customer_name}}  → Ramesh Kumar
// {{customer_phone}} → 9876543210
// {{delivery_address}} → full address
// {{items_list}}     → formatted list of items
// {{order_total}}    → ₹12,500
// {{payment_method}} → Cash on Delivery / UPI / Bank Transfer
// {{estimated_date}} → 18 June 2026

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
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
