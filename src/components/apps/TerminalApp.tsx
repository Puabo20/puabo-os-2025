import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'PUABO OS Terminal v2.0.0', timestamp: new Date() },
    { type: 'output', content: 'Type "help" for available commands', timestamp: new Date() },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help - Show this help message',
      '  clear - Clear terminal',
      '  ls - List files and directories',
      '  ps - Show running processes',
      '  status - Show system status',
      '  deploy - Deploy application',
      '  logs - Show application logs',
      '  restart - Restart services',
    ],
    clear: () => {
      setLines([]);
      return [];
    },
    ls: () => [
      'apps/',
      'config/',
      'logs/',
      'scripts/',
      'package.json',
      'docker-compose.yml',
      '.env',
    ],
    ps: () => [
      'PID    NAME           STATUS    CPU    MEM',
      '1234   puabo-api      running   12%    256MB',
      '1235   puabo-web      running   8%     128MB',
      '1236   database       running   15%    512MB',
      '1237   redis          running   2%     64MB',
    ],
    status: () => [
      'System Status: ONLINE',
      'CPU Usage: 45%',
      'Memory Usage: 62%',
      'Disk Usage: 78%',
      'Network: 23 Mbps',
      'Uptime: 15d 7h 23m',
    ],
    deploy: () => [
      'Starting deployment...',
      'Building application...',
      'Creating Docker image...',
      'Pushing to registry...',
      'Updating services...',
      'Deployment completed successfully!',
    ],
    logs: () => [
      '[2024-01-15 10:30:15] INFO: Server started',
      '[2024-01-15 10:30:16] INFO: Database connected',
      '[2024-01-15 10:31:22] INFO: User authenticated',
      '[2024-01-15 10:32:45] INFO: File uploaded',
      '[2024-01-15 10:33:12] INFO: Stream started',
    ],
    restart: () => [
      'Restarting services...',
      'Stopping puabo-api... OK',
      'Stopping puabo-web... OK',
      'Starting puabo-api... OK',
      'Starting puabo-web... OK',
      'All services restarted successfully!',
    ],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCmd && !commandHistory.includes(trimmedCmd)) {
      setCommandHistory(prev => [...prev, trimmedCmd]);
    }
    
    // Add command line
    setLines(prev => [...prev, { 
      type: 'command', 
      content: `$ ${cmd}`, 
      timestamp: new Date() 
    }]);

    // Execute command
    if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands]();
      if (output.length > 0) {
        setLines(prev => [...prev, ...output.map(line => ({
          type: 'output' as const,
          content: line,
          timestamp: new Date()
        }))]);
      }
    } else if (trimmedCmd) {
      setLines(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${trimmedCmd}`, 
        timestamp: new Date() 
      }]);
    }

    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setCurrentCommand(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>PUABO Terminal</span>
          <Badge variant="outline">System Console</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={terminalRef}
          className="bg-black text-green-400 p-4 font-mono text-sm h-96 overflow-y-auto"
        >
          {lines.map((line, index) => (
            <div key={index} className={`
              ${line.type === 'command' ? 'text-white font-bold' : ''}
              ${line.type === 'error' ? 'text-red-400' : ''}
              ${line.type === 'output' ? 'text-green-400' : ''}
            `}>
              {line.content}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-white font-bold">$ </span>
            <Input
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none text-green-400 font-mono focus:ring-0 focus:outline-none p-0 ml-1"
              placeholder="Enter command..."
              autoFocus
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerminalApp;