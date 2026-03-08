import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ShoppingCart, Send } from "lucide-react";
import { toast } from "sonner";

type MaterialCategory = "cement" | "steel" | "sanitary";

interface EstimateItem {
  id: string;
  category: MaterialCategory;
  brand: string;
  quantity: number;
  unit: string;
}

const materialOptions: Record<MaterialCategory, { brands: string[]; unit: string }> = {
  cement: {
    brands: ["UltraTech OPC 53", "ACC Gold PPC", "Ambuja Plus", "Dalmia DSP", "Birla A1", "Shree Ultra"],
    unit: "bags (50kg)",
  },
  steel: {
    brands: ["TATA Tiscon TMT", "JSW NeoSteel TMT", "SAIL TMT", "Rathi TMT (RHL)", "Kamdhenu TMT", "Vizag Steel TMT"],
    unit: "tons",
  },
  sanitary: {
    brands: ["Hindware", "Jaquar", "Cera", "Astral CPVC", "Parryware", "Kohler"],
    unit: "pieces",
  },
};

const EstimateForm = ({ trigger }: { trigger?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<EstimateItem[]>([
    { id: crypto.randomUUID(), category: "cement", brand: "", quantity: 1, unit: "bags (50kg)" },
  ]);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), category: "cement", brand: "", quantity: 1, unit: "bags (50kg)" }]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: Partial<EstimateItem>) => {
    setItems(items.map((i) => {
      if (i.id !== id) return i;
      const updated = { ...i, ...field };
      if (field.category) {
        updated.brand = "";
        updated.unit = materialOptions[field.category].unit;
      }
      return updated;
    }));
  };

  const handleSubmit = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!mobile || mobile.length < 10) { toast.error("Please enter a valid mobile number"); return; }
    const emptyBrand = items.find((i) => !i.brand);
    if (emptyBrand) { toast.error("Please select a brand for all items"); return; }

    toast.success("Estimate request submitted! We'll contact you shortly.");
    setOpen(false);
    setItems([{ id: crypto.randomUUID(), category: "cement", brand: "", quantity: 1, unit: "bags (50kg)" }]);
    setMobile("");
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-6">
            <ShoppingCart className="w-4 h-4 mr-2" /> Get Estimate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Material Estimate</DialogTitle>
          <p className="text-sm text-muted-foreground">Add items you need and we'll send you the best prices.</p>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Your Name</Label>
              <Input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Mobile Number</Label>
              <Input placeholder="10-digit number" type="tel" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Materials Needed</Label>
            {items.map((item, idx) => (
              <div key={item.id} className="p-3 rounded-lg border border-border bg-secondary/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Item {idx + 1}</span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="text-destructive hover:text-destructive/80 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* Category */}
                  <Select value={item.category} onValueChange={(v) => updateItem(item.id, { category: v as MaterialCategory })}>
                    <SelectTrigger className="text-xs h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cement">Cement</SelectItem>
                      <SelectItem value="steel">Steel</SelectItem>
                      <SelectItem value="sanitary">Sanitary</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Brand */}
                  <Select value={item.brand} onValueChange={(v) => updateItem(item.id, { brand: v })}>
                    <SelectTrigger className="text-xs h-9">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialOptions[item.category].brands.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Quantity */}
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                      className="text-xs h-9"
                    />
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" size="sm" onClick={addItem} className="w-full border-dashed">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
            </Button>
          </div>

          {/* Summary */}
          {items.some((i) => i.brand) && (
            <div className="p-3 rounded-lg bg-muted text-xs space-y-1">
              <p className="font-medium text-foreground mb-2">Summary</p>
              {items.filter((i) => i.brand).map((item) => (
                <div key={item.id} className="flex justify-between text-muted-foreground">
                  <span>{item.brand}</span>
                  <span>{item.quantity} {item.unit}</span>
                </div>
              ))}
            </div>
          )}

          <Button onClick={handleSubmit} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11">
            <Send className="w-4 h-4 mr-2" /> Submit Estimate Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstimateForm;
