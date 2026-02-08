import { useState } from 'react';
import { Coffee, X, QrCode } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [activeTab, setActiveTab] = useState<'global' | 'cn'>('global');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Coffee className="w-5 h-5 text-yellow-500" />
            Support PureTool
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-muted m-4 rounded-lg">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'global' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Global (PayPal/Card)
          </button>
          <button
            onClick={() => setActiveTab('cn')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'cn' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            WeChat / Alipay
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-2">
          {activeTab === 'global' ? (
            <div className="text-center space-y-6">
              <p className="text-sm text-muted-foreground">
                Support us via Buy Me a Coffee. Accepts PayPal and Credit Cards.
              </p>
              <a
                href="https://buymeacoffee.com/"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 rounded-xl bg-[#FFDD00] text-[#000000] font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
              >
                <Coffee className="w-5 h-5 inline-block mr-2 mb-1" />
                Buy me a coffee
              </a>
              <div className="text-xs text-muted-foreground">
                Secure payment processed by Buy Me a Coffee
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-sm text-muted-foreground">
                Scan QR code with WeChat or Alipay
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="aspect-square bg-muted rounded-xl flex items-center justify-center border-2 border-green-500/20 relative overflow-hidden">
                    {/* Placeholder for WeChat QR */}
                    <div className="text-center p-2">
                      <QrCode className="w-8 h-8 mx-auto text-green-600 mb-1" />
                      <span className="text-xs font-bold text-green-600">WeChat Pay</span>
                      <p className="text-[10px] text-muted-foreground mt-1">Add image to public/wechat.jpg</p>
                    </div>
                    <img 
                      src="/wechat.jpg" 
                      alt="WeChat Pay" 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                  <span className="text-xs font-medium">WeChat</span>
                </div>

                <div className="space-y-2">
                  <div className="aspect-square bg-muted rounded-xl flex items-center justify-center border-2 border-blue-500/20 relative overflow-hidden">
                    {/* Placeholder for Alipay QR */}
                    <div className="text-center p-2">
                      <QrCode className="w-8 h-8 mx-auto text-blue-600 mb-1" />
                      <span className="text-xs font-bold text-blue-600">Alipay</span>
                      <p className="text-[10px] text-muted-foreground mt-1">Add image to public/alipay.jpg</p>
                    </div>
                    <img 
                      src="/alipay.jpg" 
                      alt="Alipay" 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                  <span className="text-xs font-medium">Alipay</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
