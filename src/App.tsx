import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, BookOpen, Users, MessageSquare, Menu, X, Search, Download, Share2, Bot, FileDown, Vote } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentView, setCurrentView] = useState('pdf');
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [showSnippetModal, setShowSnippetModal] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState('');
  const [showPollModal, setShowPollModal] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question about the research paper. Let me analyze the content and provide you with a detailed explanation.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSummary = () => {
    const summaryMessage: Message = {
      id: Date.now().toString(),
      text: `# 📋 Research Paper Summary

## 🎯 **Main Contribution**
This paper addresses the critical problem of improving neural network efficiency in resource-constrained environments through novel architectural optimizations.

## 💡 **Proposed Solution**
• **Adaptive Layer Pruning**: Dynamic removal of redundant neural network layers during inference
• **Quantization Framework**: 8-bit precision optimization without significant accuracy loss  
• **Memory-Efficient Training**: Novel gradient accumulation technique reducing memory usage by 40%

## 📊 **Key Results**
• **Performance**: 23% faster inference time compared to baseline models
• **Accuracy**: Maintained 97.8% accuracy (only 0.3% drop from full precision)
• **Memory**: 60% reduction in memory footprint during training
• **Energy**: 35% lower power consumption on mobile devices

## 🔬 **Methodology**
The authors employed a three-stage optimization pipeline:
1. **Static Analysis**: Identifying redundant computational paths
2. **Dynamic Pruning**: Real-time layer importance scoring using: *I(l) = α·A(l) + β·C(l)*
3. **Validation**: Comprehensive testing across 5 benchmark datasets

## 🚀 **Impact & Future Work**
This research enables deployment of sophisticated AI models on edge devices, opening new possibilities for mobile AI applications. Future work will explore automated hyperparameter tuning and cross-domain generalization.`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, summaryMessage]);
  };

  const handleSaveSnippet = () => {
    if (!selectedText.trim() || !snippetTitle.trim()) return;
    
    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title: snippetTitle,
      content: selectedText,
      timestamp: new Date(),
      tags: ['research', 'important'],
      source: 'Research Paper'
    };
    
    setSnippets(prev => [...prev, newSnippet]);
    
    // Add to chat
    const snippetMessage: Message = {
      id: Date.now().toString(),
      text: `Saved snippet: "${snippetTitle}"`,
      isUser: false,
      timestamp: new Date(),
      isSnippet: true,
      snippetTitle: snippetTitle
    };
    
    setMessages(prev => [...prev, snippetMessage]);
    
    setShowSnippetModal(false);
    setSnippetTitle('');
    setSelectedText('');
  };

  const handleCreatePoll = () => {
    if (!newPollQuestion.trim() || newPollOptions.filter(opt => opt.trim()).length < 2) return;
    
    const pollOptions: PollOption[] = newPollOptions
      .filter(opt => opt.trim())
      .map((opt, index) => ({
        id: `option-${index}`,
        text: opt.trim(),
        votes: 0
      }));
    
    const newPoll: Poll = {
      id: Date.now().toString(),
      question: newPollQuestion,
      options: pollOptions,
      totalVotes: 0,
      isActive: true,
      timestamp: new Date()
    };
    
    setPolls(prev => [...prev, newPoll]);
    setShowPollModal(false);
    setNewPollQuestion('');
    setNewPollOptions(['', '']);
  };

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => 
          option.id === optionId 
            ? { ...option, votes: option.votes + 1 }
            : option
        );
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
  };

  const sidebarItems: SidebarItem[] = [
    { id: 'pdf', name: 'PDF Reader', icon: <FileText className="w-5 h-5" />, active: currentView === 'pdf' },
    { id: 'snippets', name: 'Snippets', icon: <FileDown className="w-5 h-5" />, active: currentView === 'snippets' },
    { id: 'polls', name: 'Polls', icon: <Vote className="w-5 h-5" />, active: currentView === 'polls' },
    { id: 'summary', name: 'Summary', icon: <BookOpen className="w-5 h-5" />, active: false },
    { id: 'collaborate', name: 'Collaborate', icon: <Users className="w-5 h-5" />, active: false },
    { id: 'chat', name: 'Chat History', icon: <MessageSquare className="w-5 h-5" />, active: false },
  ];

  const renderMainContent = () => {
    switch (currentView) {
      case 'snippets':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Saved Snippets</h2>
              <button
                onClick={() => {
                  setSelectedText('Sample research text for demonstration');
                  setShowSnippetModal(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Snippet
              </button>
            </div>
            
            <div className="space-y-4">
              {snippets.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No snippets saved yet. Highlight text from the paper to create your first snippet.</p>
                </div>
              ) : (
                snippets.map(snippet => (
                  <div key={snippet.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-800">{snippet.title}</h3>
                      <span className="text-xs text-slate-500">{snippet.timestamp.toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600 mb-3 line-clamp-3">{snippet.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {snippet.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">{snippet.source}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      case 'polls':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Research Polls</h2>
              <button
                onClick={() => setShowPollModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Poll
              </button>
            </div>
            
            <div className="space-y-6">
              {polls.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Vote className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No polls created yet. Create a poll to gather opinions on research topics.</p>
                </div>
              ) : (
                polls.map(poll => (
                  <div key={poll.id} className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-slate-800 text-lg">{poll.question}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${poll.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {poll.isActive ? 'Active' : 'Closed'}
                        </span>
                        <span className="text-xs text-slate-500">{poll.totalVotes} votes</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {poll.options.map(option => {
                        const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                        return (
                          <div key={option.id} className="relative">
                            <button
                              onClick={() => poll.isActive && handleVote(poll.id, option.id)}
                              disabled={!poll.isActive}
                              className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors disabled:cursor-not-allowed"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-slate-700">{option.text}</span>
                                <span className="text-sm text-slate-500">{option.votes} ({percentage.toFixed(1)}%)</span>
                              </div>
                              <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 text-xs text-slate-500">
                      Created {poll.timestamp.toLocaleDateString()} at {poll.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex-1 bg-slate-100 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">PDF Reader</h3>
              <p className="text-slate-500">Upload a research paper to get started</p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Upload PDF
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-600" />
            <span className="font-bold text-slate-800">Research Copilot</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.id === 'summary') {
                      handleSummary();
                    } else {
                      setCurrentView(item.id);
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.active 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Share Session</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800">
              {currentView === 'pdf' && 'PDF Reader'}
              {currentView === 'snippets' && 'Snippets'}
              {currentView === 'polls' && 'Polls'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Main Content */}
          {renderMainContent()}
          
          {/* Chat Panel */}
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">AI Assistant</h3>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Ask me anything about the research paper!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {message.isSnippet ? (
                        <div className="flex items-center space-x-2">
                          <FileDown className="w-4 h-4" />
                          <span className="text-sm">{message.text}</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                      )}
                      <div className={`text-xs mt-1 ${message.isUser ? 'text-purple-200' : 'text-slate-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center space-x-2 mb-2">
                <button
                  onClick={handleSummary}
                  className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                >
                  📋 Summary
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Ask me anything about the research paper..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snippet Modal */}
      {showSnippetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Save Snippet</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={snippetTitle}
                  onChange={(e) => setSnippetTitle(e.target.value)}
                  placeholder="Enter snippet title..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowSnippetModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSnippet}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Snippet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Poll Modal */}
      {showPollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Create Poll</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Question</label>
                <input
                  type="text"
                  value={newPollQuestion}
                  onChange={(e) => setNewPollQuestion(e.target.value)}
                  placeholder="Enter poll question..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Options</label>
                {newPollOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updated = [...newPollOptions];
                        updated[index] = e.target.value;
                        setNewPollOptions(updated);
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {newPollOptions.length > 2 && (
                      <button
                        onClick={() => {
                          const updated = newPollOptions.filter((_, i) => i !== index);
                          setNewPollOptions(updated);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewPollOptions([...newPollOptions, ''])}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  + Add Option
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowPollModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}

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