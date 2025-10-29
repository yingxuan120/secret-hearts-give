import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Heart } from "lucide-react";
import { useCreateCauseSimple } from '@/hooks/useContract';
import { useAccount } from 'wagmi';

export const CreateCauseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetAmount: '',
    duration: '30' // days
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isConnected } = useAccount();
  const { createCauseSimple, isLoading, isSuccess, error } = useCreateCauseSimple();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.description || !formData.targetAmount) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const targetAmount = parseFloat(formData.targetAmount);
      const duration = parseInt(formData.duration) * 24 * 60 * 60; // Convert days to seconds
      
      if (isNaN(targetAmount) || targetAmount <= 0) {
        throw new Error('Target amount must be a positive number');
      }
      
      if (isNaN(duration) || duration <= 0) {
        throw new Error('Duration must be a positive number');
      }

      await createCauseSimple(
        formData.name,
        formData.description,
        targetAmount,
        duration
      );

      if (isSuccess) {
        // Reset form
        setFormData({
          name: '',
          description: '',
          targetAmount: '',
          duration: '30'
        });
        setIsOpen(false);
        alert('Cause created successfully!');
      }
    } catch (err: any) {
      console.error('Error creating cause:', err);
      alert(`Error creating cause: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-hero text-white hover:opacity-90 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Create New Cause
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-heart-primary" />
            Create New Cause
          </DialogTitle>
          <DialogDescription>
            Start a new charitable cause to make a positive impact in the world.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cause Name *</Label>
            <Input
              id="name"
              placeholder="Enter cause name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your cause and its impact"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount ($) *</Label>
              <Input
                id="targetAmount"
                type="number"
                placeholder="50000"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                min="1"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days) *</Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">
              Error: {error.message || 'Failed to create cause'}
            </div>
          )}
          
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading || !isConnected}
              className="gradient-hero text-white"
            >
              {isSubmitting || isLoading ? 'Creating...' : 'Create Cause'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
