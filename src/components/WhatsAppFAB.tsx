import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "919876543210";

const WhatsAppFAB = () => {
  const [open, setOpen] = useState(false);

  const quickMessages = [
    { label: "Need a price quote", msg: "Hi! I need a price quote for construction materials." },
    { label: "Track my order", msg: "Hi! I want to track my order." },
    { label: "Ask a question", msg: "Hi! I have a question about your products." },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-600 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Nirman Support</p>
                <p className="text-green-100 text-xs">Typically replies in minutes</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white rounded-xl p-3 shadow-sm mb-4 text-sm text-gray-700">
                <p>👋 Hello! How can we help you today?</p>
              </div>
              <p className="text-xs text-gray-500 mb-3 font-medium">Quick messages:</p>
              <div className="space-y-2">
                {quickMessages.map((m) => (
                  <a
                    key={m.label}
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m.msg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm bg-white border border-green-200 text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    {m.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call: +91 98765 43210
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Open Chat
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center transition-colors relative"
        aria-label="WhatsApp Support"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">1</span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppFAB;
