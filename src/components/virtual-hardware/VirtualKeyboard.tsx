import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';

interface VirtualKeyboardProps {
  onNotePlay?: (note: string, velocity: number) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onNotePlay }) => {
  const [velocity, setVelocity] = useState([80]);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

  const handleNotePress = (note: string) => {
    if (note) {
      setActiveNotes(prev => new Set([...prev, note]));
      onNotePlay?.(note, velocity[0]);
      setTimeout(() => {
        setActiveNotes(prev => {
          const newSet = new Set(prev);
          newSet.delete(note);
          return newSet;
        });
      }, 200);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>V-Keyboard Pro</span>
          <Badge variant="outline">Virtual Hardware</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Velocity:</span>
          <Slider
            value={velocity}
            onValueChange={setVelocity}
            max={127}
            min={1}
            step={1}
            className="flex-1 max-w-xs"
          />
          <span className="text-sm text-muted-foreground">{velocity[0]}</span>
        </div>
        
        <div className="relative">
          {/* White Keys */}
          <div className="flex">
            {whiteKeys.map((note, index) => (
              <Button
                key={`${note}-white`}
                variant={activeNotes.has(note) ? "default" : "outline"}
                className="h-32 w-12 rounded-none border-r border-gray-300 last:border-r-0"
                onMouseDown={() => handleNotePress(note)}
              >
                <span className="text-xs mt-auto mb-2">{note}</span>
              </Button>
            ))}
          </div>
          
          {/* Black Keys */}
          <div className="absolute top-0 flex">
            {blackKeys.map((note, index) => (
              note ? (
                <Button
                  key={`${note}-black`}
                  variant={activeNotes.has(note) ? "default" : "secondary"}
                  className="h-20 w-8 rounded-none bg-gray-800 text-white hover:bg-gray-700 ml-8 first:ml-8"
                  style={{ marginLeft: index === 0 ? '32px' : index === 2 ? '64px' : '32px' }}
                  onMouseDown={() => handleNotePress(note)}
                >
                  <span className="text-xs mt-auto mb-1">{note}</span>
                </Button>
              ) : (
                <div key={`empty-${index}`} className="w-8 ml-8" />
              )
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualKeyboard;