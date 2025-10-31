import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, HandHeart, Eye, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useMakeDonation } from '@/hooks/useContract';

const HowItWorksModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-heart-primary" />
            How Private Charity Works
          </DialogTitle>
          <DialogDescription>
            Learn about our privacy-first approach to charitable giving
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-heart-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-heart-primary">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your crypto wallet to start making private donations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-heart-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-heart-primary">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Choose Your Cause</h3>
                <p className="text-sm text-muted-foreground">
                  Select from verified charitable causes that matter to you
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-heart-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-heart-primary">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Donate Privately</h3>
                <p className="text-sm text-muted-foreground">
                  Your donation amount is encrypted - only you know how much you gave
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-heart-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-heart-primary">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">See Collective Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Watch as the total raised increases, showing real community impact
                </p>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <HandHeart className="w-4 h-4 text-heart-primary" />
              <span>Zero-knowledge proofs ensure your privacy</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
              <Eye className="w-4 h-4 text-heart-primary" />
              <span>Full transparency of total impact</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StartGivingModal = () => {
  const [step, setStep] = useState(1);
  const { isConnected } = useAccount();

  const handleWalletConnect = () => {
    if (isConnected) {
      setStep(2);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="donate" size="lg">
          Start Giving Anonymously
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-heart-primary heart-pulse" />
            Start Your Charitable Journey
          </DialogTitle>
          <DialogDescription>
            Begin making a difference while protecting your privacy
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-heart-primary/10 flex items-center justify-center">
                <HandHeart className="w-8 h-8 text-heart-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                To start donating privately, we need to connect your crypto wallet. 
                This enables secure, anonymous transactions.
              </p>
            </div>
            <div className="space-y-3">
              <ConnectButton />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Your wallet address and donation amounts remain completely private
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wallet Connected!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                You're all set to start making private donations. 
                Choose a cause below to make your first contribution.
              </p>
            </div>
            <div className="space-y-3">
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer border-2 hover:border-heart-primary/50 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Clean Water Initiative</h4>
                    <p className="text-sm text-muted-foreground">156 donors • $32,847 raised</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-heart-primary" />
                </div>
              </Card>
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer border-2 hover:border-heart-primary/50 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Education for All</h4>
                    <p className="text-sm text-muted-foreground">203 donors • $48,293 raised</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-heart-primary" />
                </div>
              </Card>
              <Card className="p-4 hover:bg-secondary/50 cursor-pointer border-2 hover:border-heart-primary/50 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Emergency Relief Fund</h4>
                    <p className="text-sm text-muted-foreground">298 donors • $67,841 raised</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-heart-primary" />
                </div>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const DonatePrivatelyModal = ({ 
  title, 
  description, 
  goal, 
  raised, 
  donors,
  causeId = 0 // Add causeId prop
}: {
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  causeId?: number;
}) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [step, setStep] = useState(1);
  const { makeDonation, isLoading, isSuccess, error } = useMakeDonation();

  const handleDonate = async () => {
    console.log('[Donate] Clicked', { causeId, donationAmount });
    if (!donationAmount) {
      console.warn('[Donate] No amount entered');
      return;
    }

    setStep(2);

    try {
      // 调用内部已处理FHE加密的捐赠函数
      await makeDonation(causeId, donationAmount);

      // 简化处理：直接进入成功页，后续可接入交易回执等待
      console.log('[Donate] Submitted successfully');
      setStep(3);
    } catch (err) {
      console.error('Donation failed:', err);
      alert(err instanceof Error ? err.message : 'Donation failed');
      setStep(1); // Reset to step 1 on error
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="donate" className="w-full">
          Donate Privately
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-heart-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Donation Amount (ETH)</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="0.1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-heart-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-heart-primary/10" onClick={() => setDonationAmount("0.05")}>
                  0.05 ETH
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-heart-primary/10" onClick={() => setDonationAmount("0.1")}>
                  0.1 ETH
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-heart-primary/10" onClick={() => setDonationAmount("0.5")}>
                  0.5 ETH
                </Badge>
              </div>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HandHeart className="w-4 h-4 text-heart-primary" />
                <span className="text-sm font-medium">Privacy Guaranteed</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your donation amount will be encrypted and never revealed publicly. 
                Only the total raised for this cause will be updated.
              </p>
            </div>
            <Button 
              onClick={handleDonate} 
              className="w-full" 
              variant="donate"
              disabled={!donationAmount || isLoading}
            >
              Donate {donationAmount} ETH Privately
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 mx-auto rounded-full border-4 border-heart-primary/20 border-t-heart-primary animate-spin"></div>
            <h3 className="text-lg font-semibold">Processing Your Donation</h3>
            <p className="text-sm text-muted-foreground">
              Encrypting your donation amount and processing the transaction...
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Donation Successful!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your private donation has been processed. Thank you for making a difference!
              </p>
              <div className="p-4 bg-secondary/50 rounded-lg text-left">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• Your donation amount remains private</div>
                  <div>• The cause total has been updated</div>
                  <div>• Transaction recorded on blockchain</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { HowItWorksModal, StartGivingModal, DonatePrivatelyModal };