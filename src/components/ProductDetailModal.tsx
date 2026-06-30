import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, TrendingUp, Lock } from "lucide-react";

export type ProductData = {
  img: string;
  title: string;
  description: string;
  location: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData | null;
};

export default function ProductDetailModal({ isOpen, onClose, product }: Props) {
  if (!product) return null;

  // Extract MRR, Traffic, and Buy Price details from the description string
  const descParts = product.description.split(" | ");
  const buyPrice = descParts[0] || "Buy Now";
  const mrr = descParts[1] || "MRR: N/A";
  const traffic = descParts[2] || "Traffic: N/A";
  const detailText = descParts.slice(3).join(" | ") || product.description;

  const [activeTab, setActiveTab] = React.useState<"features" | "details">("features");

  // Framer Motion Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } as const;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
          
          {/* Backdrop Overlay */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-black/5 bg-midnight-void text-star-white shadow-2xl z-10 flex flex-col max-h-[85vh] md:max-h-[90vh]"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 border border-black/5 text-star-white hover:bg-black/10 transition-colors cursor-pointer"
            >
              <X className="text-lg" />
            </button>

            {/* Banner/Header Image */}
            <div className="relative h-44 sm:h-56 w-full shrink-0">
              <img
                src={product.img}
                alt={product.title}
                className="h-full w-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-void to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-cosmic-teal bg-cosmic-teal/10 border border-cosmic-teal/20 px-2 py-0.5 rounded font-bold">
                  {product.location}
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold mt-1 tracking-tight text-star-white">{product.title}</h2>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              
              {/* Description Card */}
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-muted-steel font-mono">Project Summary</h3>
                <p className="text-sm text-muted-steel leading-relaxed font-light">{detailText}</p>
              </motion.div>

              {/* Financial Metrics Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-abyss-panel border border-black/5 rounded-xl text-center">
                  <span className="text-[10px] text-muted-steel uppercase block font-mono">Escrow Buy Price</span>
                  <span className="text-base font-black text-cosmic-teal mt-1 block">{buyPrice.replace("Buy Price: ", "")}</span>
                </div>
                <div className="p-3.5 bg-abyss-panel border border-black/5 rounded-xl text-center">
                  <span className="text-[10px] text-muted-steel uppercase block font-mono">Monthly Revenue</span>
                  <span className="text-sm font-bold text-star-white mt-1.5 block">{mrr.replace("MRR: ", "")}</span>
                </div>
                <div className="p-3.5 col-span-2 sm:col-span-1 bg-abyss-panel border border-black/5 rounded-xl text-center">
                  <span className="text-[10px] text-muted-steel uppercase block font-mono">Traffic Metrics</span>
                  <span className="text-sm font-bold text-star-white mt-1.5 block">{traffic.replace("Traffic: ", "")}</span>
                </div>
              </motion.div>

              {/* Segment Tabs */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex border-b border-black/5 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-2.5 px-4 font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "features" ? "border-cosmic-teal text-cosmic-teal" : "border-transparent text-muted-steel hover:text-cosmic-teal"
                    }`}
                  >
                    Features List
                  </button>
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2.5 px-4 font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "details" ? "border-cosmic-teal text-cosmic-teal" : "border-transparent text-muted-steel hover:text-cosmic-teal"
                    }`}
                  >
                    Escrow Details
                  </button>
                </div>

                {/* Tab Contents */}
                {activeTab === "features" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-steel">
                    {[
                      "Fully configured routing settings",
                      "Automated DNS record transfer",
                      "Visual builder layout preset files",
                      "SSL Certificate active and verified",
                      "Escrow secured payment processing",
                      "Full administrative control access"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="text-cosmic-teal mt-0.5 shrink-0 text-base" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 text-sm text-muted-steel">
                    <div className="flex items-start gap-3 p-3 bg-abyss-panel rounded-xl border border-black/5">
                      <Lock className="text-cosmic-teal text-lg shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-star-white text-xs uppercase tracking-wider">Escrow Protected Route</h4>
                        <p className="text-xs text-muted-steel mt-1 leading-relaxed">Payments are held securely in escrow and only released once the name servers and asset packages are fully verified in your control panel.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-abyss-panel rounded-xl border border-black/5">
                      <TrendingUp className="text-sunset-coral text-lg shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-star-white text-xs uppercase tracking-wider">DNS Record Propagation</h4>
                        <p className="text-xs text-muted-steel mt-1 leading-relaxed">Routes propagation resolves globally in less than 2 hours under verified automated registries.</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

            </div>

            {/* Modal Footer / Action Center */}
            <div className="p-6 bg-abyss-panel border-t border-black/5 shrink-0 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-black/5 hover:bg-black/10 text-star-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-black/5 cursor-pointer"
              >
                Close Preview
              </button>
              <button
                className="w-full sm:w-auto px-8 py-2.5 bg-cosmic-teal hover:opacity-90 text-white rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-cosmic-teal/10 cursor-pointer"
              >
                Acquire coordinates
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
