import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumButtonProps {
  plan: 'plus' | 'pro';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  plan, 
  onClick, 
  className, 
  children 
}) => {
  const planConfig = {
    plus: {
      icon: Star,
      label: 'Upgrade para Plus',
      gradient: 'from-purple-500 to-pink-500',
      glow: 'hover:shadow-purple-500/25'
    },
    pro: {
      icon: Crown,
      label: 'Upgrade para Pro',
      gradient: 'from-orange-500 to-red-500',
      glow: 'hover:shadow-orange-500/25'
    }
  };

  const config = planConfig[plan];
  const Icon = config.icon;

  return (
    <Button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden bg-gradient-to-r',
        config.gradient,
        'text-white font-semibold shadow-glow transition-bounce hover:scale-105',
        config.glow,
        'group',
        className
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <Icon className="w-4 h-4 mr-2 relative z-10" />
      <span className="relative z-10">
        {children || config.label}
      </span>
      
      {plan === 'pro' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
      )}
    </Button>
  );
};