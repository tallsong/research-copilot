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

interface DemoPaper {
  title: string;
  authors: string[];
  abstract: string;
  content: string;
  sections: {
    title: string;
    content: string;
  }[];
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
  const [demoPaper, setDemoPaper] = useState<DemoPaper | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate demo paper
  const generateDemoPaper = () => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      const paper: DemoPaper = {
        title: "Adaptive Neural Network Optimization for Resource-Constrained Environments",
        authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Aisha Patel"],
        abstract: "This paper presents a novel approach to neural network optimization specifically designed for resource-constrained environments. Our method combines adaptive layer pruning, quantization frameworks, and memory-efficient training techniques to achieve significant performance improvements while maintaining accuracy. Through comprehensive evaluation on five benchmark datasets, we demonstrate a 23% improvement in inference speed, 60% reduction in memory usage, and only 0.3% accuracy loss compared to full-precision models.",
        content: `# Adaptive Neural Network Optimization for Resource-Constrained Environments

## Abstract

This paper presents a novel approach to neural network optimization specifically designed for resource-constrained environments. Our method combines adaptive layer pruning, quantization frameworks, and memory-efficient training techniques to achieve significant performance improvements while maintaining accuracy.

## 1. Introduction

The deployment of deep neural networks in resource-constrained environments such as mobile devices, IoT sensors, and edge computing platforms presents significant challenges. Traditional neural networks require substantial computational resources and memory, making them impractical for many real-world applications.

Recent advances in model compression and optimization have shown promise, but existing approaches often sacrifice accuracy for efficiency or require extensive manual tuning. This work addresses these limitations by proposing an adaptive optimization framework that automatically balances performance and resource utilization.

## 2. Related Work

### 2.1 Neural Network Pruning
Previous work in neural network pruning has focused on removing redundant connections and neurons. Magnitude-based pruning removes weights below a certain threshold, while structured pruning removes entire channels or layers. However, these approaches often require careful hyperparameter tuning and may not adapt well to different architectures.

### 2.2 Quantization Techniques
Quantization reduces the precision of neural network weights and activations, typically from 32-bit floating-point to 8-bit integers. Post-training quantization is simple to implement but may result in significant accuracy loss, while quantization-aware training maintains better accuracy but requires retraining.

## 3. Methodology

### 3.1 Adaptive Layer Pruning
Our adaptive layer pruning algorithm dynamically identifies and removes redundant computational paths during inference. The importance score for layer l is calculated as:

**I(l) = α·A(l) + β·C(l)**

Where A(l) represents the activation magnitude and C(l) represents the computational cost. The parameters α and β are learned during training to optimize the trade-off between accuracy and efficiency.

### 3.2 Quantization Framework
We implement a hybrid quantization approach that combines:
- **Static quantization** for weights during model compilation
- **Dynamic quantization** for activations during inference
- **Mixed-precision** support for critical layers

### 3.3 Memory-Efficient Training
Our training procedure incorporates gradient accumulation and checkpoint techniques to reduce peak memory usage by up to 40% without affecting convergence.

## 4. Experimental Results

### 4.1 Datasets and Setup
We evaluated our approach on five benchmark datasets:
- CIFAR-10 (image classification)
- ImageNet (large-scale image recognition)
- IMDB (sentiment analysis)
- CoNLL-2003 (named entity recognition)
- SQuAD (question answering)

### 4.2 Performance Metrics
Our method achieves:
- **23% faster inference time** compared to baseline models
- **97.8% accuracy retention** (only 0.3% drop from full precision)
- **60% reduction in memory footprint** during training
- **35% lower power consumption** on mobile devices

### 4.3 Comparison with State-of-the-Art
Compared to existing optimization techniques, our approach demonstrates superior performance across all metrics while requiring minimal manual tuning.

## 5. Discussion

### 5.1 Scalability
The proposed method scales effectively across different model architectures and sizes. Larger models benefit more from our optimization techniques, with memory savings increasing proportionally to model complexity.

### 5.2 Limitations
While our approach shows significant improvements, there are some limitations:
- Initial training time is increased by approximately 15%
- The method requires careful validation for safety-critical applications
- Performance gains may vary depending on hardware architecture

## 6. Conclusion and Future Work

This research enables the deployment of sophisticated AI models on edge devices, opening new possibilities for mobile AI applications. Our adaptive optimization framework provides an effective solution for resource-constrained environments while maintaining high accuracy.

Future work will explore:
- Automated hyperparameter tuning using reinforcement learning
- Cross-domain generalization for different application areas
- Integration with emerging hardware accelerators
- Real-time adaptation based on available resources

## References

[1] Chen, S., et al. "Efficient Neural Network Compression for Mobile Applications." ICML 2023.
[2] Rodriguez, M., et al. "Adaptive Quantization in Deep Learning." NeurIPS 2022.
[3] Patel, A., et al. "Memory-Efficient Training of Large Neural Networks." ICLR 2023.
[4] Wang, L., et al. "Dynamic Pruning for Real-Time Inference." AAAI 2023.
[5] Thompson, K., et al. "Hardware-Aware Neural Architecture Search." CVPR 2022.`,
        sections: [
          {
            title: "Introduction",
            content: "The deployment of deep neural networks in resource-constrained environments such as mobile devices, IoT sensors, and edge computing platforms presents significant challenges..."
          },
          {
            title: "Methodology",
            content: "Our adaptive layer pruning algorithm dynamically identifies and removes redundant computational paths during inference..."
          },
          {
            title: "Experimental Results",
            content: "We evaluated our approach on five benchmark datasets: CIFAR-10, ImageNet, IMDB, CoNLL-2003, and SQuAD..."
          },
          {
            title: "Conclusion",
            content: "This research enables the deployment of sophisticated AI models on edge devices, opening new possibilities for mobile AI applications..."
          }
        ]
      };
      
      setDemoPaper(paper);
      setIsLoading(false);
      
      // Add welcome message to chat
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `📄 **Demo paper loaded successfully!**\n\n**"${paper.title}"**\n\nBy: ${paper.authors.join(', ')}\n\nI'm ready to help you analyze this research paper. You can:\n• Ask questions about the content\n• Request a summary\n• Save important snippets\n• Create polls for discussion\n\nWhat would you like to explore first?`,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, welcomeMessage]);
    }, 2000);
  };
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
        text: demoPaper 
          ? `Based on the research paper "${demoPaper.title}", I can help you understand the key concepts. The paper focuses on neural network optimization for resource-constrained environments. What specific aspect would you like me to explain in more detail?`
          : "Please upload a PDF first so I can analyze the research paper and provide detailed explanations.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSummary = () => {
    if (!demoPaper) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Please upload a PDF first to generate a summary.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }
    
    const summaryMessage: Message = {
      id: Date.now().toString(),
      text: `# 📋 Research Paper Summary

**Title:** ${demoPaper.title}
**Authors:** ${demoPaper.authors.join(', ')}

## 🎯 **Main Contribution**
${demoPaper.abstract}

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
          <div className="flex-1 bg-slate-100">
            {!demoPaper ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <h3 className="text-xl font-semibold text-slate-600 mb-2">Processing PDF...</h3>
                      <p className="text-slate-500">Generating demo research paper</p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-600 mb-2">PDF Reader</h3>
                      <p className="text-slate-500 mb-4">Upload a research paper to get started</p>
                      <button 
                        onClick={generateDemoPaper}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Upload PDF
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                {/* PDF Header */}
                <div className="bg-white border-b border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-slate-800 mb-2">{demoPaper.title}</h1>
                      <p className="text-slate-600 mb-3">By: {demoPaper.authors.join(', ')}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>📄 Research Paper</span>
                        <span>🔬 Machine Learning</span>
                        <span>📅 2024</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                        ✓ Loaded
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* PDF Content */}
                <div className="p-6">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 max-w-4xl mx-auto">
                    <div 
                      className="prose prose-slate max-w-none"
                      onMouseUp={() => {
                        const selection = window.getSelection();
                        const selectedText = selection?.toString().trim();
                        if (selectedText && selectedText.length > 10) {
                          setSelectedText(selectedText);
                          // Show tooltip or modal for snippet creation
                          if (window.confirm(`Save "${selectedText.substring(0, 50)}..." as a snippet?`)) {
                            setShowSnippetModal(true);
                          }
                        }
                      }}
                      style={{ 
                        lineHeight: '1.8',
                        fontSize: '16px',
                        fontFamily: 'Georgia, serif'
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ 
                        __html: demoPaper.content
                          // First handle headers
                          .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-slate-800 mt-6 mb-3">$1</h3>')
                          .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-slate-800 mt-8 mb-4">$1</h2>')
                          .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-slate-900 mt-8 mb-6">$1</h1>')
                          // Handle bold text
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>')
                          // Handle code blocks
                          .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-700">$1</code>')
                          // Handle bullet points
                          .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
                          // Handle numbered lists
                          .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
                          // Handle paragraphs - split by double newlines first
                          .split('\n\n')
                          .map(paragraph => {
                            // Skip if it's already a header or list item
                            if (paragraph.includes('<h1') || paragraph.includes('<h2') || paragraph.includes('<h3') || 
                                paragraph.includes('<li') || paragraph.trim() === '') {
                              return paragraph;
                            }
                            // Wrap in paragraph tags
                            return `<p class="mb-4 text-slate-700 leading-relaxed">${paragraph.replace(/\n/g, '<br>')}</p>`;
                          })
                          .join('')
                          // Clean up any empty paragraphs
                          .replace(/<p class="mb-4 text-slate-700 leading-relaxed"><\/p>/g, '')
                      }} />
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-6 flex justify-center space-x-4">
                    <button
                      onClick={handleSummary}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Generate Summary</span>
                    </button>
                    <button
                      onClick={() => setShowPollModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Vote className="w-4 h-4" />
                      <span>Create Poll</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
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