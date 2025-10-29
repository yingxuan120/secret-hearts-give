import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, TrendingUp, Globe } from "lucide-react";
import { DonatePrivatelyModal } from "@/components/DonationFlow";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useCauseCount, useAllCauses } from '@/hooks/useContract';
import { useState, useEffect } from 'react';
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
  const { causes, isLoading } = useAllCauses();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonated: 0,
    globalImpact: 0
  });

  useEffect(() => {
    if (causes && causes.length > 0) {
      const totalDonors = causes.reduce((sum, cause) => sum + (cause.donors || 0), 0);
      const totalDonated = causes.reduce((sum, cause) => sum + (cause.raised || 0), 0);
      const totalGoal = causes.reduce((sum, cause) => sum + (cause.goal || 0), 0);
      const globalImpact = totalGoal > 0 ? Math.round((totalDonated / totalGoal) * 100) : 0;

      setStats({
        totalDonors,
        totalDonated,
        globalImpact
      });
    }
  }, [causes]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-6 gradient-card rounded-lg shadow-gentle">
            <div className="w-8 h-8 bg-muted animate-pulse rounded mx-auto mb-2"></div>
            <div className="h-8 bg-muted animate-pulse rounded mb-2"></div>
            <div className="h-4 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <Users className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">{stats.totalDonors.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Anonymous Donors</p>
      </div>
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <TrendingUp className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">${stats.totalDonated.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Total Donated</p>
      </div>
      <div className="text-center p-6 gradient-card rounded-lg shadow-gentle">
        <Globe className="w-8 h-8 text-heart-primary mx-auto mb-2" />
        <p className="text-2xl font-bold text-foreground">{stats.globalImpact}%</p>
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

const WalletButton = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="fixed top-4 right-4 z-50">
      <ConnectButton />
      {isConnected && (
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
      )}
    </div>
  );
};

export { DonationCard, ImpactStats, WalletConnect, WalletButton };