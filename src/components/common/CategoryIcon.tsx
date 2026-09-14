import React from 'react';
import {
  Camera,
  Video,
  HardDrive,
  Cpu,
  Wifi,
  Cable,
  Server,
  Fingerprint,
  ShieldCheck,
  Database,
  Network,
  Wrench,
  Monitor,
  Lock,
  Radio,
  Sliders,
  CheckCircle2,
  Activity,
  Terminal,
  Cloud,
  ShieldAlert,
  Laptop,
  Layers,
  HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Camera: <Camera className={className} />,
    Video: <Video className={className} />,
    HardDrive: <HardDrive className={className} />,
    Cpu: <Cpu className={className} />,
    Wifi: <Wifi className={className} />,
    Cable: <Cable className={className} />,
    Server: <Server className={className} />,
    Fingerprint: <Fingerprint className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    Database: <Database className={className} />,
    Network: <Network className={className} />,
    Wrench: <Wrench className={className} />,
    Monitor: <Monitor className={className} />,
    Lock: <Lock className={className} />,
    Radio: <Radio className={className} />,
    Sliders: <Sliders className={className} />,
    CheckCircle2: <CheckCircle2 className={className} />,
    Activity: <Activity className={className} />,
    Terminal: <Terminal className={className} />,
    Cloud: <Cloud className={className} />,
    ShieldAlert: <ShieldAlert className={className} />,
    Laptop: <Laptop className={className} />,
    Layers: <Layers className={className} />
  };

  return iconMap[name] || <Monitor className={className} />;
};

