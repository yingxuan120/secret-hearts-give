import { Button } from "@/components/ui/button";
import { HandHeart, Heart, Shield } from "lucide-react";
import { DonationCard, ImpactStats, WalletConnect, WalletButton } from "@/components/DonationComponents";
import { HowItWorksModal, StartGivingModal } from "@/components/DonationFlow";
import { CreateCauseModal } from "@/components/CreateCauseModal";
import { useAllCauses } from "@/hooks/useContract";
import heartIcon from "@/assets/heart-icon.png";

const Index = () => {
  // Get causes from contract
  const { causes, isLoading } = useAllCauses();
  
  // Fallback to sample data if no causes from contract
  const displayCauses = causes && causes.length > 0 ? causes : [
    {
      id: 0,
      title: "Clean Water Initiative",
      description: "Providing clean drinking water to remote communities worldwide",
      goal: 50000,
      raised: 32847,
      donors: 156
    },
    {
      id: 1,
      title: "Education for All",
      description: "Supporting educational programs for underprivileged children",
      goal: 75000,
      raised: 48293,
      donors: 203
    },
    {
      id: 2,
      title: "Emergency Relief Fund",
      description: "Rapid response to natural disasters and humanitarian crises",
      goal: 100000,
      raised: 67841,
      donors: 298
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Wallet Button - Fixed Top Right */}
      <WalletButton />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src={heartIcon} 
              alt="Heart" 
              className="w-20 h-20 mx-auto mb-6 heart-pulse" 
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Give Privately. <br />
              <span className="text-heart-primary">
                Impact Publicly.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your donation amounts remain encrypted to avoid social signaling. 
              Only the total impact is revealed, creating genuine charitable giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StartGivingModal />
              <HowItWorksModal />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <HandHeart className="w-12 h-12 text-heart-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your donation amounts are encrypted and never revealed publicly
              </p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-heart-primary mx-auto mb-4 heart-pulse" />
              <h3 className="text-xl font-semibold mb-2">Genuine Impact</h3>
              <p className="text-muted-foreground">
                Give from the heart without worrying about social perception
              </p>
            </div>
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-heart-primary mx-auto mb-4 heart-pulse" />
              <h3 className="text-xl font-semibold mb-2">Heart-Centered Security</h3>
              <p className="text-muted-foreground">
                FHE-encrypted donations with blockchain transparency for collective impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Connection - Removed from center, now in top right */}

      {/* Impact Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ImpactStats />
        </div>
      </section>

      {/* Active Causes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Active Causes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Support causes that matter to you. Your individual contribution remains private, 
              but together we create visible change.
            </p>
            <div className="flex justify-center">
              <CreateCauseModal />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-2 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              displayCauses.map((cause, index) => (
              <DonationCard key={index} {...cause} causeId={cause.id} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={heartIcon} alt="Heart" className="w-8 h-8" />
            <span className="text-xl font-semibold">Private Charity</span>
          </div>
          <p className="text-muted-foreground">
            Empowering genuine philanthropy through privacy-first donations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;