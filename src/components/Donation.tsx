import { useState } from 'react';
import { Coffee, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';
import DonationModal from './DonationModal';

export default function Donation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full",
            "bg-yellow-400 text-yellow-950 font-bold shadow-lg",
            "hover:scale-105 hover:shadow-xl transition-all duration-300",
            "border-2 border-yellow-500/20"
          )}
        >
          <Coffee className="w-5 h-5 fill-current" />
          <span>Support Us</span>
        </button>
      </div>
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export function MobileDonation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="mt-8 p-6 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/50 text-center">
            <h3 className="font-bold text-lg mb-2 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" /> 
                Support Development
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                PureTool is free and privacy-focused. If you find it useful, consider supporting us to keep the servers running!
            </p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 text-yellow-950 font-bold shadow hover:bg-yellow-300 transition-colors w-full sm:w-auto"
            >
                <Coffee className="w-4 h-4" />
                Donate / Support
            </button>
            <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
