import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, Settings, Users, Plus, Hash, Volume2, Mic, MicOff, Send, Paperclip, Smile, MoreVertical, Bell, Shield, Star, Zap, Activity, Globe } from 'lucide-react';

const ModernChat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeUsers, setActiveUsers] = useState(24);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Alex Chen',
      avatar: 'AC',
      time: '2:34 PM',
      content: 'Just deployed the new neural network optimization! Performance improved by 300% 🚀✨',
      reactions: [{ emoji: '🚀', count: 8 }, { emoji: '💎', count: 4 }, { emoji: '🔥', count: 12 }],
      type: 'message'
    },
    {
      id: 2,
      author: 'Sarah Kim',
      avatar: 'SK',
      time: '2:36 PM',
      content: 'The new design system is absolutely stunning! The micro-interactions feel so smooth and responsive.',
      reactions: [{ emoji: '✨', count: 6 }, { emoji: '🎨', count: 3 }],
      type: 'message'
    },
    {
      id: 3,
      author: 'System',
      avatar: 'SY',
      time: '2:38 PM',
      content: 'Mike Johnson joined the voice channel "Creative Lab"',
      reactions: [],
      type: 'system'
    },
    {
      id: 4,
      author: 'Emma Davis',
      avatar: 'ED',
      time: '2:40 PM',
      content: 'Check out this new prototype! The animations are next-level smooth 🌊',
      reactions: [{ emoji: '🌊', count: 5 }, { emoji: '💫', count: 7 }],
      type: 'message'
    }
  ]);

  const channels = [
    { id: 'general', name: 'general', icon: Hash, unread: 3, activity: 'high', gradient: 'from-violet-500 to-purple-600' },
    { id: 'announcements', name: 'announcements', icon: Star, unread: 0, activity: 'medium', gradient: 'from-amber-500 to-orange-600' },
    { id: 'development', name: 'development', icon: Zap, unread: 7, activity: 'high', gradient: 'from-emerald-500 to-teal-600' },
    { id: 'design', name: 'design', icon: Activity, unread: 2, activity: 'medium', gradient: 'from-pink-500 to-rose-600' },
    { id: 'ai-research', name: 'ai-research', icon: Globe, unread: 1, activity: 'low', gradient: 'from-cyan-500 to-blue-600' },
  ];

  const voiceChannels = [
    { id: 'creative-lab', name: 'Creative Lab', users: 5, activity: 'active' },
    { id: 'focus-zone', name: 'Focus Zone', users: 2, activity: 'active' },
    { id: 'casual-space', name: 'Casual Space', users: 0, activity: 'inactive' },
  ];

  const directMessages = [
    { id: 'alex', name: 'Alex Chen', avatar: 'AC', online: true, unread: true, lastMessage: '2m ago' },
    { id: 'sarah', name: 'Sarah Kim', avatar: 'SK', online: true, unread: false, lastMessage: '1h ago' },
    { id: 'mike', name: 'Mike Johnson', avatar: 'MJ', online: false, unread: false, lastMessage: '3h ago' },
    { id: 'emma', name: 'Emma Davis', avatar: 'ED', online: true, unread: true, lastMessage: '5m ago' },
  ];

  const onlineMembers = [
    { name: 'Alex Chen', avatar: 'AC', status: 'Building the future', activity: 'coding', color: 'from-violet-400 to-purple-600' },
    { name: 'Sarah Kim', avatar: 'SK', status: 'In deep work mode', activity: 'designing', color: 'from-pink-400 to-rose-600' },
    { name: 'Mike Johnson', avatar: 'MJ', status: 'Debugging universe', activity: 'testing', color: 'from-emerald-400 to-teal-600' },
    { name: 'Emma Davis', avatar: 'ED', status: 'Shipping magic', activity: 'managing', color: 'from-amber-400 to-orange-600' },
    { name: 'Tom Wilson', avatar: 'TW', status: 'Coffee break', activity: 'away', color: 'from-gray-400 to-slate-600' },
    { name: 'Lisa Park', avatar: 'LP', status: 'In the zone', activity: 'writing', color: 'from-cyan-400 to-blue-600' },
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        author: 'You',
        avatar: 'YU',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: message,
        reactions: [],
        type: 'message'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const getChannelInfo = (channelId) => {
    const channelMap = {
      general: { name: 'General', description: 'Where innovation begins and ideas flourish', icon: '💫', color: 'from-violet-500 to-purple-600' },
      announcements: { name: 'Announcements', description: 'Important updates that shape our future', icon: '🚀', color: 'from-amber-500 to-orange-600' },
      development: { name: 'Development', description: 'Code that powers tomorrow', icon: '⚡', color: 'from-emerald-500 to-teal-600' },
      design: { name: 'Design', description: 'Crafting beautiful digital experiences', icon: '🎨', color: 'from-pink-500 to-rose-600' },
      'ai-research': { name: 'AI Research', description: 'Exploring the frontiers of artificial intelligence', icon: '🧠', color: 'from-cyan-500 to-blue-600' },
    };
    return channelMap[channelId] || channelMap.general;
  };

  const currentChannel = getChannelInfo(activeChannel);

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'high': return 'bg-emerald-400';
      case 'medium': return 'bg-amber-400';
      case 'low': return 'bg-slate-400';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 text-white font-sans overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Left Sidebar */}
      <div className="w-80 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-10">
        {/* Workspace Header */}
        <div className="p-6">
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative flex items-center space-x-4 p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-purple-500/25">
                N
              </div>
              <div>
                <h2 className="font-black text-xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Nexus Labs</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm text-white/60 font-medium">{activeUsers} minds connected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 overflow-y-auto custom-scrollbar">
          {/* Channels Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Channels</h3>
              <div className="p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                <Plus className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`group relative overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeChannel === channel.id ? 'transform scale-105' : ''
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${channel.gradient} opacity-0 blur-xl transition-opacity duration-500 ${
                      activeChannel === channel.id ? 'opacity-20' : 'group-hover:opacity-10'
                    }`}></div>
                    <div className={`relative flex items-center space-x-4 px-5 py-4 rounded-2xl border transition-all duration-300 ${
                      activeChannel === channel.id
                        ? `bg-gradient-to-r ${channel.gradient} bg-opacity-10 border-white/20 shadow-lg`
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${
                        activeChannel === channel.id ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                      }`} />
                      <span className={`font-semibold transition-colors ${
                        activeChannel === channel.id ? 'text-white' : 'text-white/80 group-hover:text-white'
                      }`}>
                        # {channel.name}
                      </span>
                      <div className="flex items-center space-x-2 ml-auto">
                        <div className={`w-2 h-2 rounded-full ${getActivityColor(channel.activity)}`}></div>
                        {channel.unread > 0 && (
                          <div className="px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs font-bold min-w-[20px] text-center animate-pulse">
                            {channel.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voice Channels */}
          <div className="mb-10">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Voice Spaces</h3>
            <div className="space-y-2">
              {voiceChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="group relative overflow-hidden cursor-pointer"
                >
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    channel.activity === 'active' 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-100' 
                      : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100'
                  } blur-xl`}></div>
                  <div className={`relative flex items-center space-x-4 px-5 py-4 rounded-2xl border transition-all duration-300 ${
                    channel.activity === 'active'
                      ? 'bg-emerald-500/10 border-emerald-500/20 shadow-lg shadow-emerald-500/10'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                  }`}>
                    <Volume2 className={`w-5 h-5 ${
                      channel.activity === 'active' ? 'text-emerald-400' : 'text-white/60 group-hover:text-white/80'
                    }`} />
                    <span className="font-semibold text-white/80 group-hover:text-white">{channel.name}</span>
                    {channel.users > 0 && (
                      <div className="ml-auto flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(channel.users, 3))].map((_, i) => (
                            <div key={i} className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-gray-900"></div>
                          ))}
                        </div>
                        <span className="text-xs text-emerald-400 font-semibold">{channel.users}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Direct Messages</h3>
            <div className="space-y-2">
              {directMessages.map((dm) => (
                <div
                  key={dm.id}
                  className="group relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg">
                        {dm.avatar}
                      </div>
                      {dm.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white/90 group-hover:text-white">{dm.name}</div>
                      <div className="text-xs text-white/50">{dm.lastMessage}</div>
                    </div>
                    {dm.unread && (
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-white/10">
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
                YU
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">Your Name</div>
                <div className="text-xs text-white/60 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Online & Creating</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isMuted ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10 text-white/70'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button className="p-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/70 hover:text-white">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="h-24 border-b border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-between px-8 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentChannel.color} opacity-5`}></div>
          <div className="relative flex items-center space-x-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentChannel.color} rounded-3xl flex items-center justify-center text-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
              {currentChannel.icon}
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                #{currentChannel.name.toLowerCase()}
              </h1>
              <p className="text-white/60 text-lg font-medium">{currentChannel.description}</p>
            </div>
          </div>
          
          <div className="relative flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-6 py-3 bg-emerald-500/20 backdrop-blur-xl rounded-2xl border border-emerald-500/30 shadow-lg">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
              <span className="text-sm font-bold text-emerald-300">{activeUsers} online</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {[Phone, Video, Search, Bell, MoreVertical].map((Icon, index) => (
                <button
                  key={index}
                  className="p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 text-white/70 hover:text-white transform hover:scale-105"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {messages.map((msg, index) => (
                <div key={msg.id} className={`group relative ${msg.type === 'system' ? 'opacity-70' : ''}`}>
                  {msg.type === 'system' ? (
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-xs font-bold">
                          {msg.avatar}
                        </div>
                        <span className="text-sm text-white/70">{msg.content}</span>
                        <span className="text-xs text-white/50">{msg.time}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-3xl"></div>
                      <div className="relative flex space-x-6 p-6 hover:bg-white/5 rounded-3xl transition-all duration-300 border border-transparent hover:border-white/10">
                        <div className={`w-14 h-14 bg-gradient-to-br ${onlineMembers.find(m => m.avatar === msg.avatar)?.color || 'from-indigo-400 to-purple-500'} rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-2xl transform group-hover:scale-105 transition-transform duration-300`}>
                          {msg.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="font-black text-xl text-white">{msg.author}</span>
                            <span className="text-sm text-white/50 bg-white/5 px-3 py-1 rounded-full">{msg.time}</span>
                          </div>
                          <p className="text-white/90 leading-relaxed text-lg mb-4">{msg.content}</p>
                          {msg.reactions.length > 0 && (
                            <div className="flex space-x-3">
                              {msg.reactions.map((reaction, reactionIndex) => (
                                <button
                                  key={reactionIndex}
                                  className="group flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:scale-105"
                                >
                                  <span className="text-lg group-hover:scale-125 transition-transform duration-200">{reaction.emoji}</span>
                                  <span className="text-sm font-bold text-white/80">{reaction.count}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-3 px-6 py-4 bg-white/5 rounded-2xl animate-pulse">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }}></div>
                    ))}
                  </div>
                  <span className="text-white/60">Someone is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-xl">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 group-focus-within:border-white/40 transition-all duration-300 shadow-2xl">
                  <button className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 text-white/70 hover:text-white transform hover:scale-105">
                    <Paperclip className="w-6 h-6" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={`Share your thoughts in #${activeChannel}...`}
                    className="flex-1 bg-transparent outline-none placeholder-white/50 text-white text-lg font-medium"
                  />
                  <button className="p-3 hover:bg-white/10 rounded-2xl transition-all duration-300 text-white/70 hover:text-white transform hover:scale-105">
                    <Smile className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!message.trim()}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Members */}
          <div className="w-96 border-l border-white/10 bg-black/20 backdrop-blur-xl p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-2xl flex items-center space-x-3">
                <Users className="w-6 h-6" />
                <span>Team ({onlineMembers.length})</span>
              </h3>
            </div>
            
            <div className="space-y-4 mb-10">
              {onlineMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
                  <div className="relative flex items-center space-x-4 p-4 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer border border">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-black text-xl text-white">{member.name}</span>
                        <span className="text-sm text-white/50 bg-white/5 px-3 py-1 rounded-full">{member.status}</span>
                      </div>
                      <p className="text-white/90 leading-relaxed text-lg mb-2">{member.status}</p>
                    </div>
                  </div>
                </div>
              ))}   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernChat;
