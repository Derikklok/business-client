import { useState } from 'react';
import { Cloud, Upload, Download, Server, Gift, Sparkles, Clock, AlertCircle, Settings, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const CloudResourcesPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: <Upload className="w-5 h-5 text-blue-600" />,
      title: 'Auto Backup',
      description: 'Automatically backup all documents to secure cloud storage with 256-bit encryption and versioning',
      status: 'coming-soon',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
    },
    {
      icon: <Download className="w-5 h-5 text-green-600" />,
      title: 'Cloud Sync',
      description: 'Access your documents from anywhere with real-time synchronization across all devices and platforms',
      status: 'coming-soon',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 border-green-200',
    },
    {
      icon: <Server className="w-5 h-5 text-purple-600" />,
      title: 'Remote Storage',
      description: 'Store unlimited documents with 99.9% uptime guarantee and instant retrieval worldwide',
      status: 'coming-soon',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
    },
  ];

  const statusItems = [
    {
      label: 'Storage Type',
      value: 'Local Storage Only',
      icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
      valueColor: 'text-orange-600',
    },
    {
      label: 'Backup Status', 
      value: 'Manual Only',
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
      valueColor: 'text-yellow-600',
    },
    {
      label: 'Cloud Sync',
      value: 'Not Available',
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      valueColor: 'text-red-600',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors"
        >
          <Cloud className="w-4 h-4" />
          <span className="hidden sm:inline">Cloud Resources</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="flex flex-col max-w-5xl w-[95vw] sm:w-[90vw] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-lg">
        {/* Header with Gradient Background */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-4 sm:px-8 py-4 sm:py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary/15 rounded-lg">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl sm:text-3xl font-bold text-foreground mb-2">
                  Cloud Resources
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Manage your cloud storage and document synchronization settings
                </DialogDescription>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-yellow-100 text-yellow-700">
                    Coming Soon
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    Local Storage Active
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content Sections */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 sm:space-y-6 px-4 sm:px-8 py-4 sm:py-6">
            
            {/* Current Status Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                Current Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {statusItems.map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                      {item.icon}
                      {item.label}
                    </div>
                    <p className={`font-semibold ${item.valueColor}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Coming Soon Banner */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Announcement
              </h3>
              <div className="relative bg-linear-to-r from-blue-50 via-purple-50 to-blue-50 border border-blue-200 rounded-xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-100 rounded-full translate-y-8 -translate-x-8 opacity-30"></div>
                
                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-900 text-lg mb-2">Cloud Features Coming Soon!</h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      We're working on exciting cloud features to enhance your document management experience with enterprise-grade security, automatic backups, and seamless collaboration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Gift className="w-4 h-4 text-primary" />
                Upcoming Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="p-6 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        </div>
                        <Badge variant="secondary" className="bg-white/80 text-gray-600 border border-gray-200 shadow-sm mb-3">
                          Coming Soon
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Benefits Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    <Shield className="w-3 h-3" />
                    Enterprise Security
                  </div>
                  <p className="text-sm text-foreground">256-bit encryption and secure cloud storage</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    <Zap className="w-3 h-3" />
                    Instant Access
                  </div>
                  <p className="text-sm text-foreground">Access documents from anywhere, anytime</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    <Globe className="w-3 h-3" />
                    Global Sync
                  </div>
                  <p className="text-sm text-foreground">Real-time synchronization across all devices</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                    <Clock className="w-3 h-3" />
                    Automatic Backup
                  </div>
                  <p className="text-sm text-foreground">Never lose your important documents</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Sticky Footer */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end px-4 sm:px-8 py-4 border-t border-border bg-muted/30 shrink-0 sticky bottom-0 z-10">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="min-w-24 w-full sm:w-auto"
          >
            Close
          </Button>
          <Button 
            className="gap-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 min-w-32 w-full sm:w-auto"
            disabled
          >
            <Cloud className="w-4 h-4" />
            Enable (Coming Soon)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CloudResourcesPanel;