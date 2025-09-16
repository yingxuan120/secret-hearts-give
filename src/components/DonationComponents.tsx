import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, TrendingUp, Globe } from "lucide-react";
import { DonatePrivatelyModal } from "@/components/DonationFlow";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import heartIcon from "@/assets/heart-icon.png";

const DonationCard = ({ 
  title, 
  description, 
  goal, 
  raised, 
  donors,
  causeId = 0
}: {
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  causeId?: number;
}) => {
  const percentage = (raised / goal) * 100;

  return (
    <Card className="gradient-card shadow-gentle border-0 transition-gentle hover:shadow-heart">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-heart-primary heart-pulse" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Raised: ${raised.toLocaleString()}</span>
            <span>Goal: ${goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="gradient-hero h-2 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{donors} anonymous donors</p>
        </div>
        <DonatePrivatelyModal 
          title={title}
          description={description}
          goal={goal}
          raised={raised}
          donors={donors}
          causeId={causeId}
        />
      </CardContent>
    </Card>
  );
};

const ImpactStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <Users className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">2,847</p>
        <p className="text-sm text-muted-foreground">Anonymous Donors</p>
      </div>
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <TrendingUp className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">$1,247,892</p>
        <p className="text-sm text-muted-foreground">Total Donated</p>
      </div>
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <Globe className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">100%</p>
        <p className="text-sm text-muted-foreground">Global Impact</p>
      </div>
    </div>
  );
};

const WalletConnect = () => {
  const { isConnected, address } = useAccount();

  return (
    <Card className="gradient-impact shadow-gentle border-0 mb-12">
      <CardContent className="p-8 text-center">
        <img src={heartIcon} alt="Heart" className="w-16 h-16 mx-auto mb-4 heart-pulse" />
        {isConnected ? (
          <>
            <h3 className="text-xl font-semibold mb-2">Wallet Connected!</h3>
            <p className="text-muted-foreground mb-4">
              Connected to: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Your donation amounts remain encrypted. Only you know how much you gave.
            </p>
            <ConnectButton />
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">
              Your donation amounts remain encrypted. Only you know how much you gave.
            </p>
            <ConnectButton />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export { DonationCard, ImpactStats, WalletConnect };