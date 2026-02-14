import { useState } from 'react';
import { Cloud, Upload, Download, Server, Gift } from 'lucide-react';
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
      icon: <Upload className="w-6 h-6 text-blue-500" />,
      title: 'Auto Backup',
      description: 'Automatically backup all documents to secure cloud storage',
      status: 'coming-soon',
    },
    {
      icon: <Download className="w-6 h-6 text-green-500" />,
      title: 'Cloud Sync',
      description: 'Access your documents from anywhere with real-time synchronization',
      status: 'coming-soon',
    },
    {
      icon: <Server className="w-6 h-6 text-purple-500" />,
      title: 'Remote Storage',
      description: 'Store unlimited documents with 99.9% uptime guarantee',
      status: 'coming-soon',
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
      
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-500" />
            Cloud Resources
          </DialogTitle>
          <DialogDescription>
            Manage your cloud storage and document synchronization settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Coming Soon Banner */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-blue-900">Cloud Features Coming Soon!</h3>
                <p className="text-sm text-blue-700 mt-1">
                  We're working on exciting cloud features to enhance your document management experience.
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
                <div className="shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Storage Used</span>
                <span className="font-medium">Local Storage Only</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Backup Status</span>
                <span className="font-medium text-yellow-600">Manual Only</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cloud Sync</span>
                <span className="font-medium text-gray-500">Not Available</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full" disabled>
            <Cloud className="w-4 h-4 mr-2" />
            Enable Cloud Features (Coming Soon)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CloudResourcesPanel;