import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose, IoMdCheckmarkCircle, IoMdStats, IoMdLock } from "react-icons/io";

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
  };

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#12131e] text-white shadow-2xl z-10 flex flex-col max-h-[85vh] md:max-h-[90vh]"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <IoMdClose className="text-lg" />
            </button>

            {/* Banner/Header Image */}
            <div className="relative h-44 sm:h-56 w-full shrink-0">
              <img
                src={product.img}
                alt={product.title}
                className="h-full w-full object-cover brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12131e] to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  {product.location}
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold mt-1 tracking-tight">{product.title}</h2>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              
              {/* Description Card */}
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400 font-mono">Project Summary</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{detailText}</p>
              </motion.div>

              {/* Financial Metrics Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-[#181a29] border border-white/5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">Escrow Buy Price</span>
                  <span className="text-base font-black text-emerald-400 mt-1 block">{buyPrice.replace("Buy Price: ", "")}</span>
                </div>
                <div className="p-3.5 bg-[#181a29] border border-white/5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">Monthly Revenue</span>
                  <span className="text-sm font-bold text-white mt-1.5 block">{mrr.replace("MRR: ", "")}</span>
                </div>
                <div className="p-3.5 col-span-2 sm:col-span-1 bg-[#181a29] border border-white/5 rounded-xl text-center">
                  <span className="text-[10px] text-gray-500 uppercase block font-mono">Traffic Metrics</span>
                  <span className="text-sm font-bold text-white mt-1.5 block">{traffic.replace("Traffic: ", "")}</span>
                </div>
              </motion.div>

              {/* Segment Tabs */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex border-b border-white/5 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`pb-2.5 px-4 font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "features" ? "border-emerald-400 text-emerald-400" : "border-transparent text-gray-500 hover:text-white"
                    }`}
                  >
                    Features List
                  </button>
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2.5 px-4 font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === "details" ? "border-emerald-400 text-emerald-400" : "border-transparent text-gray-500 hover:text-white"
                    }`}
                  >
                    Escrow Details
                  </button>
                </div>

                {/* Tab Contents */}
                {activeTab === "features" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                    {[
                      "Fully configured routing settings",
                      "Automated DNS record transfer",
                      "Visual builder layout preset files",
                      "SSL Certificate active and verified",
                      "Escrow secured payment processing",
                      "Full administrative control access"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <IoMdCheckmarkCircle className="text-emerald-400 mt-0.5 shrink-0 text-base" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <IoMdLock className="text-emerald-400 text-lg shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-xs uppercase tracking-wider">Escrow Protected Route</h4>
                        <p className="text-xs text-gray-400 mt-1">Payments are held securely in escrow and only released once the name servers and asset packages are fully verified in your control panel.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <IoMdStats className="text-[#00C0B5] text-lg shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-xs uppercase tracking-wider">DNS Record Propagation</h4>
                        <p className="text-xs text-gray-400 mt-1">Routes propagation resolves globally in less than 2 hours under verified automated registries.</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

            </div>

            {/* Modal Footer / Action Center */}
            <div className="p-6 bg-[#161725] border-t border-white/5 shrink-0 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-white/10"
              >
                Close Preview
              </button>
              <button
                className="w-full sm:w-auto px-8 py-2.5 bg-emerald-400 hover:bg-emerald-500 text-black rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-emerald-400/10 cursor-pointer"
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
