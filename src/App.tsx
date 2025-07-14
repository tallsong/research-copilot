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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Research Copilot. I can help you understand complex research papers by explaining equations, defining terms, and providing summaries. What would you like to explore?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeView, setActiveView] = useState('pdf');
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newSnippetTitle, setNewSnippetTitle] = useState('');
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sidebarItems: SidebarItem[] = [
    { id: 'pdf', name: 'PDF', icon: <FileText className="w-5 h-5" />, active: activeView === 'pdf' },
    { id: 'summary', name: 'Summary', icon: <BookOpen className="w-5 h-5" />, active: showSummary },
    { id: 'snippets', name: 'Snippets', icon: <MessageSquare className="w-5 h-5" />, active: activeView === 'snippets' },
    { id: 'poll', name: 'Poll', icon: <Users className="w-5 h-5" />, active: activeView === 'poll' },
    { id: 'share', name: 'Share', icon: <Share2 className="w-5 h-5" /> }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('equation') || lowerText.includes('formula') || lowerText.includes('math')) {
      return 'I can help explain mathematical concepts step by step. Mathematical equations often represent relationships between variables. For example, if you have an equation like E = mc², this shows that energy (E) equals mass (m) times the speed of light (c) squared. Would you like me to break down a specific equation from your paper?';
    }
    
    if (lowerText.includes('define') || lowerText.includes('what is') || lowerText.includes('meaning')) {
      return 'I\'d be happy to define technical terms for you. Academic papers often use specialized vocabulary that can be challenging. I can provide clear, simple explanations of complex concepts. Could you highlight the specific term you\'d like me to define?';
    }
    
    if (lowerText.includes('summary') || lowerText.includes('summarize') || lowerText.includes('main point')) {
      return 'I can provide comprehensive summaries of research papers. This includes breaking down the main hypothesis, methodology, key findings, and conclusions. A good summary helps you quickly understand whether a paper is relevant to your research. Would you like me to summarize a specific section or the entire paper?';
    }
    
    if (lowerText.includes('complex') || lowerText.includes('difficult') || lowerText.includes('understand')) {
      return 'Breaking down complex concepts is my specialty! I can explain difficult ideas using simpler language, provide analogies, and walk through step-by-step reasoning. Think of me as your personal research tutor. What specific concept would you like me to clarify?';
    }
    
    return 'I understand you\'re looking for help with your research. I can assist with explaining equations, defining technical terms, providing summaries, and breaking down complex concepts. Feel free to highlight any text from your paper or ask me specific questions about the content you\'re reading.';
  };

  const generatePaperSummary = (): string => {
    return `**📋 Paper Summary: Adaptive Gradient Descent Optimization**

**🎯 Main Contribution:**
This paper introduces a novel machine learning optimization algorithm that combines momentum-based optimization with dynamic learning rate adjustment, achieving faster convergence on complex datasets.

**🔍 Key Problem Addressed:**
Traditional gradient descent methods struggle with convergence in high-dimensional spaces and non-convex loss landscapes, often requiring manual hyperparameter tuning.

**💡 Proposed Solution:**
• **Adaptive Learning Rate Scheduling**: Dynamic adjustment based on gradient variance analysis
• **Momentum Adaptation**: Coefficient adapts based on gradient direction consistency
• **Automatic Hyperparameter Tuning**: Reduces need for manual parameter adjustment

**📊 Key Results:**
• CIFAR-10: 50% faster convergence (75 vs 150 epochs compared to SGD)
• ImageNet: 50% improvement (150 vs 300 epochs)
• Penn Treebank: 44% faster (45 vs 80 epochs)

**🔬 Methodology:**
The algorithm monitors gradient statistics in real-time and adjusts learning rates using the formula: α(t) = α₀ × (1 + β₁ × var(g(t))) / (1 + β₂ × ||g(t)||²)

**🚀 Impact & Applications:**
• Most effective during early training stages when exploring parameter space
• Automatically reduces learning rate as model converges for fine-tuning
• Applicable to distributed training and meta-learning scenarios

**🔮 Future Directions:**
Extension to distributed training environments and meta-learning applications for improved efficiency in machine learning systems.`;
  };

  const handleSummaryClick = () => {
    setShowSummary(!showSummary);
    setActiveView('pdf');
    if (!showSummary) {
      const summaryMessage: Message = {
        id: Date.now().toString(),
        text: generatePaperSummary(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, summaryMessage]);
    }
  };

  const handleSidebarClick = (itemId: string) => {
    if (itemId === 'summary') {
      handleSummaryClick();
    } else if (itemId === 'snippets') {
      setActiveView('snippets');
      setShowSummary(false);
    } else if (itemId === 'poll') {
      setActiveView('poll');
      setShowSummary(false);
    } else if (itemId === 'pdf') {
      setActiveView('pdf');
      setShowSummary(false);
    } else if (itemId === 'share') {
      handleShare();
    }
  };

  const handleShare = () => {
    const shareData = {
      title: 'Research Copilot Session',
      text: 'Check out this research paper analysis',
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCreateSnippet = () => {
    if (selectedText && newSnippetTitle) {
      const newSnippet: Snippet = {
        id: Date.now().toString(),
        title: newSnippetTitle,
        content: selectedText,
        timestamp: new Date(),
        tags: ['research', 'important'],
        source: 'Current Paper'
      };
      
      setSnippets(prev => [...prev, newSnippet]);
      setSelectedText('');
      setNewSnippetTitle('');
      
      // Add snippet to chat as well
      const snippetMessage: Message = {
        id: Date.now().toString(),
        text: `📝 **Snippet Created: ${newSnippet.title}**\n\n"${newSnippet.content}"\n\n*Saved to your snippets collection*`,
        isUser: false,
        timestamp: new Date(),
        isSnippet: true,
        snippetTitle: newSnippet.title
      };
      setMessages(prev => [...prev, snippetMessage]);
    }
  };

  const handleCreatePoll = () => {
    if (newPollQuestion && newPollOptions.every(opt => opt.trim())) {
      const newPoll: Poll = {
        id: Date.now().toString(),
        question: newPollQuestion,
        options: newPollOptions.map((text, index) => ({
          id: `option-${index}`,
          text,
          votes: 0
        })),
        totalVotes: 0,
        isActive: true,
        timestamp: new Date()
      };
      
      setPolls(prev => [...prev, newPoll]);
      setNewPollQuestion('');
      setNewPollOptions(['', '']);
      setShowCreatePoll(false);
      
      // Add poll to chat
      const pollMessage: Message = {
        id: Date.now().toString(),
        text: `🗳️ **New Poll Created**\n\n**${newPoll.question}**\n\n${newPoll.options.map((opt, i) => `${i + 1}. ${opt.text}`).join('\n')}\n\n*Poll is now active for voting*`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, pollMessage]);
    }
  };

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map(option => 
            option.id === optionId 
              ? { ...option, votes: option.votes + 1 }
              : option
          ),
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
  };

  const addPollOption = () => {
    setNewPollOptions(prev => [...prev, '']);
  };

  const removePollOption = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
    }
  };

  const handleExplainSelection = () => {
    if (selectedText) {
      handleSendMessage(`Explain: "${selectedText}"`);
      setSelectedText('');
    }
  };

  const samplePaperContent = `
    Abstract
    
    This paper presents a novel approach to machine learning optimization through adaptive gradient descent methods. We propose a new algorithm that combines momentum-based optimization with dynamic learning rate adjustment, resulting in faster convergence and improved performance on complex datasets.
    
    1. Introduction
    
    Machine learning optimization has been a central focus of research for decades. Traditional gradient descent methods, while effective, often struggle with convergence in high-dimensional spaces and non-convex loss landscapes. Recent advances in optimization theory have led to the development of adaptive methods that can automatically adjust their parameters based on the characteristics of the problem at hand.
    
    The key challenge in optimization lies in balancing exploration and exploitation. Too aggressive optimization can lead to overshooting optimal solutions, while conservative approaches may result in slow convergence. Our proposed method addresses this challenge through a novel adaptive mechanism that monitors gradient statistics and adjusts the learning rate accordingly.
    
    2. Methodology
    
    Our approach builds upon the Adam optimizer but introduces several key innovations:
    
    2.1 Adaptive Learning Rate Scheduling
    
    We propose a dynamic learning rate adjustment mechanism based on gradient variance analysis. The learning rate α(t) at time step t is calculated as:
    
    α(t) = α₀ × (1 + β₁ × var(g(t))) / (1 + β₂ × ||g(t)||²)
    
    Where α₀ is the initial learning rate, β₁ and β₂ are hyperparameters, var(g(t)) represents the variance of gradients, and ||g(t)||² is the L2 norm of the gradient vector.
    
    2.2 Momentum Adaptation
    
    Traditional momentum methods use a fixed momentum coefficient. Our approach adapts this coefficient based on the consistency of gradient directions:
    
    μ(t) = μ₀ × (1 - exp(-λ × consistency(g(t))))
    
    Where μ₀ is the base momentum, λ is a scaling factor, and consistency(g(t)) measures the alignment of recent gradients.
    
    3. Experimental Results
    
    We evaluated our method on several benchmark datasets including CIFAR-10, ImageNet, and Penn Treebank. The results demonstrate significant improvements in convergence speed and final performance compared to standard optimization methods.
    
    Table 1: Comparison of convergence rates
    Dataset | SGD | Adam | Proposed Method
    CIFAR-10 | 150 epochs | 100 epochs | 75 epochs
    ImageNet | 300 epochs | 200 epochs | 150 epochs
    Penn Treebank | 80 epochs | 60 epochs | 45 epochs
    
    4. Discussion
    
    The experimental results show that our adaptive optimization method consistently outperforms traditional approaches across different domains. The key insight is that optimization should be viewed as a dynamic process where parameters are continuously adjusted based on the current state of the learning process.
    
    One particularly interesting finding is that the adaptive learning rate mechanism is most effective during the early stages of training, when the model is still exploring the parameter space. As training progresses and the model begins to converge, the algorithm automatically reduces the learning rate to fine-tune the solution.
    
    5. Conclusion
    
    We have presented a novel optimization algorithm that combines adaptive learning rate scheduling with momentum adaptation. The method demonstrates superior performance across multiple benchmarks and provides a principled approach to automatic hyperparameter tuning in deep learning.
    
    Future work will focus on extending this approach to other optimization challenges, including distributed training and meta-learning scenarios. We believe that adaptive optimization methods represent a promising direction for improving the efficiency and effectiveness of machine learning systems.
  `;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Research Copilot</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out`}>
          <div className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-purple-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Content Area */}
          <div className="flex-1 bg-slate-50 overflow-hidden">
            {activeView === 'pdf' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Research Content</h2>
                    <div 
                      className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
                      onMouseUp={handleTextSelection}
                    >
                      {samplePaperContent.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-sm leading-6">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'snippets' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Research Snippets</h2>
                      <div className="text-sm text-slate-500">
                        {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} saved
                      </div>
                    </div>
                    
                    {selectedText && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-2">Create Snippet from Selection</h3>
                        <div className="mb-3 p-3 bg-white border rounded text-sm text-slate-600">
                          "{selectedText}"
                        </div>
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Enter snippet title..."
                            value={newSnippetTitle}
                            onChange={(e) => setNewSnippetTitle(e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={handleCreateSnippet}
                            disabled={!newSnippetTitle.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                          >
                            Save Snippet
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {snippets.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No snippets saved yet</p>
                          <p className="text-sm">Highlight text in the PDF to create your first snippet</p>
                        </div>
                      ) : (
                        snippets.map((snippet) => (
                          <div key={snippet.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-slate-800">{snippet.title}</h3>
                              <span className="text-xs text-slate-500">
                                {snippet.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-600 text-sm mb-3 italic">"{snippet.content}"</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {snippet.tags.map((tag) => (
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
                </div>
              </div>
            )}

            {activeView === 'poll' && (
              <div className="h-full p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Research Polls</h2>
                      <button
                        onClick={() => setShowCreatePoll(true)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Create Poll
                      </button>
                    </div>

                    {showCreatePoll && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-slate-800 mb-4">Create New Poll</h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Enter poll question..."
                            value={newPollQuestion}
                            onChange={(e) => setNewPollQuestion(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Options:</label>
                            {newPollOptions.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  placeholder={`Option ${index + 1}...`}
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...newPollOptions];
                                    newOptions[index] = e.target.value;
                                    setNewPollOptions(newOptions);
                                  }}
                                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {newPollOptions.length > 2 && (
                                  <button
                                    onClick={() => removePollOption(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={addPollOption}
                              className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              + Add Option
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={handleCreatePoll}
                              disabled={!newPollQuestion.trim() || !newPollOptions.every(opt => opt.trim())}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                            >
                              Create Poll
                            </button>
                            <button
                              onClick={() => setShowCreatePoll(false)}
                              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      {polls.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No polls created yet</p>
                          <p className="text-sm">Create a poll to gather opinions on research topics</p>
                        </div>
                      ) : (
                        polls.map((poll) => (
                          <div key={poll.id} className="border border-slate-200 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="font-semibold text-slate-800 text-lg">{poll.question}</h3>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  poll.isActive 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {poll.isActive ? 'Active' : 'Closed'}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {poll.totalVotes} vote{poll.totalVotes !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {poll.options.map((option) => {
                                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                                return (
                                  <div key={option.id} className="relative">
                                    <button
                                      onClick={() => handleVote(poll.id, option.id)}
                                      disabled={!poll.isActive}
                                      className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-slate-700">{option.text}</span>
                                        <span className="text-sm text-slate-500">
                                          {option.votes} ({percentage.toFixed(1)}%)
                                        </span>
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
                </div>
              </div>
            )}

            {/* Text Selection Tooltip */}
            {selectedText && activeView === 'pdf' && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-50">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleExplainSelection}
                    className="flex items-center space-x-2 hover:bg-purple-700 px-3 py-1 rounded-full transition-colors"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Explain</span>
                  </button>
                  <div className="w-px h-4 bg-purple-400" />
                  <button
                    onClick={() => setActiveView('snippets')}
                    className="flex items-center space-x-2 hover:bg-purple-700 px-3 py-1 rounded-full transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Save Snippet</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Remove the old document viewer section */}
          <div className="max-w-4xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Research Content</h2>
                <div 
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
                  onMouseUp={handleTextSelection}
                >
                  {samplePaperContent.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-sm leading-6">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
                {selectedText && (
                  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <button
                      onClick={handleExplainSelection}
                      className="flex items-center space-x-2 hover:bg-purple-700 transition-colors"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Explain Selected Text</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Chat Panel */}
          <div className="w-96 bg-slate-100 border-l border-slate-300 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">AI Assistants</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-200'
                  }`}>
                    <div className="text-sm">
                      {message.text.includes('**') ? (
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: message.text
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/•/g, '•')
                              .replace(/\n/g, '<br/>')
                          }}
                        />
                      ) : (
                        <p>{message.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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
              {/* This section will be removed */}
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