import React, { useState } from 'react';
import { cn } from './utils';
import { Button } from './button';
import { Smartphone, Tablet, Monitor, Laptop } from 'lucide-react';

interface DevicePreviewProps {
  children: React.ReactNode;
  className?: string;
}

type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';

const deviceSizes = {
  mobile: { width: 375, height: 812, name: 'iPhone SE' },
  tablet: { width: 768, height: 1024, name: 'iPad' },
  laptop: { width: 1280, height: 800, name: 'MacBook' },
  desktop: { width: 1920, height: 1080, name: 'Desktop' }
};

export function DevicePreview({ children, className }: DevicePreviewProps) {
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const device = deviceSizes[currentDevice];

  const previewStyles = isFullscreen 
    ? { width: '100%', height: '100vh' }
    : { 
        width: currentDevice === 'desktop' ? '100%' : `${device.width}px`,
        height: currentDevice === 'desktop' ? '100%' : `${device.height}px`,
        maxWidth: '100%',
        maxHeight: '80vh'
      };

  return (
    <div className={cn('flex flex-col h-screen bg-gray-100', className)}>
      {/* Device Controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <Button
            variant={currentDevice === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentDevice('mobile')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
          <Button
            variant={currentDevice === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentDevice('tablet')}
          >
            <Tablet className="w-4 h-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={currentDevice === 'laptop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentDevice('laptop')}
          >
            <Laptop className="w-4 h-4 mr-2" />
            Laptop
          </Button>
          <Button
            variant={currentDevice === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentDevice('desktop')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {device.name} - {device.width} x {device.height}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? 'Preview' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Device Preview */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          className={cn(
            'bg-white border shadow-lg overflow-auto',
            currentDevice === 'mobile' && 'rounded-[2rem]',
            currentDevice === 'tablet' && 'rounded-xl',
            (currentDevice === 'laptop' || currentDevice === 'desktop') && 'rounded-lg'
          )}
          style={previewStyles}
        >
          {/* Device Frame */}
          {currentDevice === 'mobile' && (
            <div className="relative h-full">
              {/* Mobile notch/status bar */}
              <div className="h-8 bg-black rounded-t-[2rem] flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex-1 overflow-auto" style={{ height: 'calc(100% - 4rem)' }}>
                {children}
              </div>
              {/* Mobile home indicator */}
              <div className="h-8 bg-black rounded-b-[2rem] flex items-center justify-center">
                <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          )}
          
          {currentDevice !== 'mobile' && (
            <div className="h-full overflow-auto">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Device Info */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Visualizando em: <strong>{device.name}</strong>
          </div>
          <div>
            Resolução: {device.width} x {device.height}px
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente simplificado para testes rápidos
export function QuickDeviceTest({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 p-8">
      {/* Mobile View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Mobile (375px)</h3>
        <div className="w-[375px] mx-auto border rounded-lg overflow-hidden shadow-lg">
          {children}
        </div>
      </div>

      {/* Tablet View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tablet (768px)</h3>
        <div className="w-[768px] mx-auto border rounded-lg overflow-hidden shadow-lg">
          {children}
        </div>
      </div>

      {/* Desktop View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Desktop (1280px)</h3>
        <div className="w-full max-w-[1280px] mx-auto border rounded-lg overflow-hidden shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}