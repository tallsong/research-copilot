import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, BookOpen, Users, MessageSquare, Menu, X, Search, Download, Share2, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isSnippet?: boolean;
  snippetTitle?: string;
}

interface Snippet {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  tags: string[];
  source: string;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  timestamp: Date;
}

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ... [rest of the component code remains the same until the return statement]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* ... [rest of the JSX remains the same until the Chat Input section] */}
      
      {/* Chat Input */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Ask me anything about the research paper..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 placeholder-slate-500"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;