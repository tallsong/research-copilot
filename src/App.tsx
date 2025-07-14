import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, BookOpen, Users, MessageSquare, Menu, X, Search, Download, Share2, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sidebarItems: SidebarItem[] = [
    { id: 'pdf', name: 'PDF', icon: <FileText className="w-5 h-5" />, active: true },
    { id: 'summary', name: 'Summary', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'snippets', name: 'Snippets', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'poll', name: 'Poll', icon: <Users className="w-5 h-5" /> },
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
          {/* Document Viewer */}
          <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">
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
                    <p className="text-sm">{message.text}</p>
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
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                  Slow
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                  Sophew
                </button>
              </div>
            </div>
          </div>
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