import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, Settings, Users, Plus, Hash, Volume2, Mic, MicOff, Send, Paperclip, Smile, MoreVertical, Bell, Shield, Star } from 'lucide-react';

const ModernChatApp = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Alex Chen',
      avatar: 'AC',
      time: '2:34 PM',
      content: 'Hey everyone! Just pushed the latest updates to the design system. The new components are looking great! 🎨',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 1 }]
    },
    {
      id: 2,
      author: 'Sarah Kim',
      avatar: 'SK',
      time: '2:36 PM',
      content: 'Awesome work Alex! The color palette improvements make everything feel so much more cohesive.',
      reactions: [{ emoji: '💯', count: 2 }]
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: 'MJ',
      time: '2:38 PM',
      content: 'I\'m reviewing the new API endpoints now. The documentation is crystal clear - great job on that!',
      reactions: []
    }
  ]);

  const channels = [
    { id: 'general', name: 'general', icon: Hash, unread: true },
    { id: 'announcements', name: 'announcements', icon: Star, unread: false },
    { id: 'development', name: 'development', icon: Hash, unread: true },
    { id: 'design', name: 'design', icon: Hash, unread: false },
    { id: 'marketing', name: 'marketing', icon: Hash, unread: false },
  ];

  const voiceChannels = [
    { id: 'meeting-room', name: 'Meeting Room', icon: Volume2, active: false },
    { id: 'casual-hangout', name: 'Casual Hangout', icon: Volume2, active: true, users: 3 },
  ];

  const directMessages = [
    { id: 'alex', name: 'Alex Chen', avatar: 'AC', online: true, unread: false },
    { id: 'sarah', name: 'Sarah Kim', avatar: 'SK', online: true, unread: true },
    { id: 'mike', name: 'Mike Johnson', avatar: 'MJ', online: false, unread: false },
    { id: 'emma', name: 'Emma Davis', avatar: 'ED', online: true, unread: false },
  ];

  const onlineMembers = [
    { name: 'Alex Chen', avatar: 'AC', status: 'Building the future' },
    { name: 'Sarah Kim', avatar: 'SK', status: 'In a meeting' },
    { name: 'Mike Johnson', avatar: 'MJ', status: 'Coding' },
    { name: 'Emma Davis', avatar: 'ED', status: 'Available' },
    { name: 'Tom Wilson', avatar: 'TW', status: 'Away' },
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        author: 'You',
        avatar: 'YU',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: message,
        reactions: []
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getChannelInfo = (channelId) => {
    const channelMap = {
      general: { name: 'General', description: 'Main discussion channel for the team', icon: '💬' },
      announcements: { name: 'Announcements', description: 'Important updates and news', icon: '📢' },
      development: { name: 'Development', description: 'Technical discussions and code reviews', icon: '💻' },
      design: { name: 'Design', description: 'Creative discussions and design reviews', icon: '🎨' },
      marketing: { name: 'Marketing', description: 'Marketing strategies and campaigns', icon: '📈' },
    };
    return channelMap[channelId] || channelMap.general;
  };

  const currentChannel = getChannelInfo(activeChannel);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      {/* Left Sidebar */}
      <div className="w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Workspace Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg">
              N
            </div>
            <div>
              <h2 className="font-bold text-lg">Nexus Team</h2>
              <p className="text-sm text-white/60">24 members online</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-6 overflow-y-auto">
          {/* Channels Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Channels</h3>
              <Plus className="w-4 h-4 text-white/60 hover:text-white cursor-pointer" />
            </div>
            <div className="space-y-1">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                      activeChannel === channel.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-4 border-purple-400'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white/70" />
                    <span className="font-medium"># {channel.name}</span>
                    {channel.unread && (
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voice Channels */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Voice Channels</h3>
            <div className="space-y-1">
              {voiceChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    channel.active ? 'bg-green-500/20 border border-green-500/30' : 'hover:bg-white/5'
                  }`}
                >
                  <Volume2 className={`w-5 h-5 ${channel.active ? 'text-green-400' : 'text-white/70'}`} />
                  <span className="font-medium">{channel.name}</span>
                  {channel.users && (
                    <span className="ml-auto text-xs text-white/60">{channel.users}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Direct Messages</h3>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <div
                  key={dm.id}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-semibold">
                      {dm.avatar}
                    </div>
                    {dm.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                    )}
                  </div>
                  <span className="font-medium">{dm.name}</span>
                  {dm.unread && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center font-bold">
              YU
            </div>
            <div className="flex-1">
              <div className="font-semibold">Your Name</div>
              <div className="text-xs text-white/60">Online</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <Settings className="w-4 h-4 p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">
              {currentChannel.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">#{currentChannel.name.toLowerCase()}</h1>
              <p className="text-sm text-white/60">{currentChannel.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">24 online</span>
            </div>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="flex space-x-4 group hover:bg-white/5 p-4 rounded-2xl transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-lg">{msg.author}</span>
                      <span className="text-sm text-white/50">{msg.time}</span>
                    </div>
                    <p className="text-white/90 leading-relaxed">{msg.content}</p>
                    {msg.reactions.length > 0 && (
                      <div className="flex space-x-2 mt-3">
                        {msg.reactions.map((reaction, index) => (
                          <button
                            key={index}
                            className="flex items-center space-x-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-xs">{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-white/70" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${activeChannel}`}
                  className="flex-1 bg-transparent outline-none placeholder-white/50 text-white"
                />
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-white/70" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Members */}
          <div className="w-80 border-l border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Members ({onlineMembers.length})</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {onlineMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center font-bold">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{member.name}</div>
                    <div className="text-sm text-white/60 truncate">{member.status}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <h4 className="font-semibold text-white/70 mb-4">Quick Actions</h4>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Shield className="w-5 h-5" />
                <span>Moderation</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                <Settings className="w-5 h-5" />
                <span>Channel Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernChatApp;