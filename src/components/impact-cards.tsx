import React from 'react';
import { 
  AlertTriangle, 
  Info, 
  Lightbulb, 
  XCircle, 
  Quote,
  CheckCircle,
  Zap
} from 'lucide-react';

// Type definitions
type CardType = 'warning' | 'note' | 'tip' | 'error' | 'quote' | 'success' | 'important';

interface ImpactCardProps {
  type: CardType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface CardConfig {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  titleColor: string;
  defaultTitle: string;
}

// Configuration for each card type
const cardConfigs: Record<CardType, CardConfig> = {
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-50',
    borderColor: 'border-l-amber-500',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-800',
    defaultTitle: 'Warning'
  },
  note: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-500',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    defaultTitle: 'Note'
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'bg-green-50',
    borderColor: 'border-l-green-500',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    defaultTitle: 'Tip'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-l-red-500',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    defaultTitle: 'Error'
  },
  quote: {
    icon: Quote,
    bgColor: 'bg-purple-50',
    borderColor: 'border-l-purple-500',
    iconColor: 'text-purple-600',
    titleColor: 'text-purple-800',
    defaultTitle: 'Quote'
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-50',
    borderColor: 'border-l-emerald-500',
    iconColor: 'text-emerald-600',
    titleColor: 'text-emerald-800',
    defaultTitle: 'Success'
  },
  important: {
    icon: Zap,
    bgColor: 'bg-orange-50',
    borderColor: 'border-l-orange-500',
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-800',
    defaultTitle: 'Important'
  }
};

// Main ImpactCard component
const ImpactCard: React.FC<ImpactCardProps> = ({ 
  type, 
  title, 
  children, 
  className = '' 
}) => {
  const config = cardConfigs[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`
      flex gap-4 p-4 rounded-lg border-l-4 
      ${config.bgColor} 
      ${config.borderColor} 
      ${className}
    `}>
      <div className="flex-shrink-0">
        <Icon className={`w-6 h-6 ${config.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-lg mb-2 ${config.titleColor}`}>
          {displayTitle}
        </h4>
        <div className="text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Convenience components for each type
const WarningCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="warning" {...props} />
);

const NoteCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="note" {...props} />
);

const TipCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="tip" {...props} />
);

const ErrorCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="error" {...props} />
);

const QuoteCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="quote" {...props} />
);

const SuccessCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="success" {...props} />
);

const ImportantCard: React.FC<Omit<ImpactCardProps, 'type'>> = (props) => (
  <ImpactCard type="important" {...props} />
);

// Demo component showing all card types
const ImpactCardDemo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Impact Card Components</h1>
      
      <WarningCard title="Safety Warning">
        <p><strong>Indiana state law requires everyone over the age of 18 to report suspected child abuse or neglect.</strong> This means you need to do this even when you aren't formally involved with a youth program.</p>
        <p className="mt-2"><strong>Failure to report is a Class B misdemeanor.</strong></p>
      </WarningCard>

      <NoteCard>
        <p>This is a general information note. Use this for providing additional context or clarifying information that helps users understand the topic better.</p>
      </NoteCard>

      <TipCard title="Pro Tip">
        <p>Always test your components in multiple browsers and screen sizes. This ensures a consistent experience across different devices and platforms.</p>
      </TipCard>

      <ErrorCard title="Common Mistake">
        <p>Don't forget to add proper TypeScript types to your components. This prevents runtime errors and improves developer experience with better IntelliSense.</p>
      </ErrorCard>

      <SuccessCard title="Well Done!">
        <p>You've successfully implemented the impact card component system. These cards will make your tutorials much more engaging and easier to follow.</p>
      </SuccessCard>

      <ImportantCard title="Key Requirement">
        <p>All form submissions must be validated both on the client-side and server-side to ensure data integrity and security.</p>
      </ImportantCard>

      <QuoteCard title="Design Philosophy">
        <p><em>"Good design is as little design as possible. Less, but better - because it concentrates on the essential aspects."</em></p>
        <p className="mt-2">— Dieter Rams</p>
      </QuoteCard>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white dark:bg-main p-3 rounded border font-mono">
            {`<WarningCard title="Custom Title">
  <p>Your warning content here</p>
</WarningCard>`}
          </div>
          <div className="bg-white dark:bg-main p-3 rounded border font-mono">
            {`<ImpactCard type="tip" title="Advanced Tip">
  <p>Custom card with specific type</p>
</ImpactCard>`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCardDemo;
export { 
  ImpactCard, 
  WarningCard, 
  NoteCard, 
  TipCard, 
  ErrorCard, 
  QuoteCard, 
  SuccessCard, 
  ImportantCard,
  type ImpactCardProps,
  type CardType
};