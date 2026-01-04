
import React, { useState } from 'react';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "Share Kindly",
    description: "Give away items you no longer need to neighbors who can use them.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800",
    color: "bg-emerald-50"
  },
  {
    title: "Trade Fairly",
    description: "Swap books, clothes, or tools in a way that respects everyone involved.",
    image: "https://images.unsplash.com/photo-1556742049-13efd9341ed8?auto=format&fit=crop&q=80&w=800",
    color: "bg-amber-50"
  },
  {
    title: "Trust Deeply",
    description: "Every member is verified. Build your kindness score through positive interactions.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    color: "bg-sky-50"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-500 ${steps[currentStep].color}`}>
      {/* Header with Skip */}
      <div className="p-6 flex justify-between items-center">
        <Logo size="sm" />
        <button 
          onClick={onComplete}
          className="text-sm font-bold text-stone-400 hover:text-stone-600 px-4 py-2"
        >
          Skip
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="relative w-full max-w-sm aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl mb-8">
          <img 
            src={steps[currentStep].image} 
            className="absolute inset-0 w-full h-full object-cover"
            alt={steps[currentStep].title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left">
             <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
          </div>
        </div>
        
        <div className="max-w-xs mx-auto">
          <p className="text-stone-600 text-lg leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-8 pb-12 flex flex-col items-center gap-8">
        <div className="flex gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-10 bg-emerald-500' : 'w-2 bg-stone-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className={`w-full max-w-sm font-bold py-5 rounded-3xl shadow-xl transition-all active:scale-95 ${
            currentStep === steps.length - 1 
            ? 'bg-emerald-600 text-white shadow-emerald-200' 
            : 'bg-stone-900 text-white shadow-stone-200'
          }`}
        >
          {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
