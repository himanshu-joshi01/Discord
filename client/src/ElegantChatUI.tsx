import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Video, 
  Settings, 
  Plus, 
  Mic, 
  MicOff, 
  Headphones,
  VolumeX,
  Phone,
  Users,
  Calendar,
  Search,
  Bell,
  Sparkles,
  Smile,
  Paperclip,
  Send,
  MoreVertical,
  Filter,
  Star,
  Zap,
  Activity,
  ChevronDown,
  ChevronRight,
  Archive,
  Pin,
  Heart,
  ThumbsUp,
  Eye,
  Bookmark,
  Share2,
  Download,
  Copy,
  ArrowRight,
  Minimize2,
  Maximize2
} from 'lucide-react';

const ElegantChatUI = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState('product-design');
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showQuickActions, setShowQuickActions] = useState(false);

  const workspaces = [
    { 
      id: 0, 
      name: 'Design Studio', 
      color: 'from-purple-500 to-pink-500',
      icon: '🎨',
      members: 24,
      activity: 'high'
    },
    { 
      id: 1, 
      name: 'Engineering', 
      color: 'from-blue-500 to-cyan-500',
      icon: '⚡',
      members: 18,
      activity: 'medium'
    },
    { 
      id: 2, 
      name: 'Marketing', 
      color: 'from-emerald-500 to-teal-500',
      icon: '📈',
      members: 12,
      activity: 'low'
    },
    { 
      id: 3, 
      name: 'Leadership', 
      color: 'from-amber-500 to-orange-500',
      icon: '👑',
      members: 8,
      activity: 'medium'
    }
  ];

  const channels = {
    'Product Development': [
      { name: 'product-design', type: 'text', priority: 'high', unread: 12, lastActive: '2m' },
      { name: 'user-research', type: 'text', priority: 'medium', unread: 3, lastActive: '1h' },
      { name: 'prototyping', type: 'text', priority: 'low', unread: 0, lastActive: '3h' },
    ],
    'Collaboration Spaces': [
      { name: 'brainstorm-lounge', type: 'voice', priority: 'high', participants: 6, lastActive: 'now' },
      { name: 'focus-room', type: 'voice', priority: 'medium', participants: 2, lastActive: '5m' },
      { name: 'creative-sync', type: 'video', priority: 'low', participants: 0, lastActive: '1d' },
    ],
    'Events & Meetings': [
      { name: 'weekly-standup', type: 'event', time: 'Today 2:00 PM', attendees: 18 },
      { name: 'design-review', type: 'event', time: 'Tomorrow 10:00 AM', attendees: 8 },
    ]
  };

  const messages = [
    {
      id: 1,
      user: 'Sarah Chen',
      role: 'Design Lead',
      avatar: '👩‍💼',
      time: '2:34 PM',
      content: 'The new interface mockups are ready for review. I\'ve incorporated all the feedback from last week\'s session.',
      attachments: [{ name: 'UI_Mockups_v3.fig', type: 'figma' }],
      reactions: [{ emoji: '🔥', count: 8 }, { emoji: '👏', count: 12 }, { emoji: '💯', count: 4 }],
      priority: 'high'
    },
    {
      id: 2,
      user: 'Alex Rodriguez',
      role: 'Senior Developer',
      avatar: '👨‍💻',
      time: '2:45 PM',
      content: 'Looks incredible! The attention to detail in the micro-interactions is outstanding. How feasible are these animations from a technical perspective?',
      reactions: [{ emoji: '👍', count: 6 }, { emoji: '🤔', count: 2 }],
      priority: 'medium'
    },
    {
      id: 3,
      user: 'Maya Patel',
      role: 'UX Researcher',
      avatar: '📊',
      time: '2:52 PM',
      content: 'Based on our latest user testing, these designs score 94% on usability metrics. The navigation flow has improved significantly!',
      reactions: [{ emoji: '🎉', count: 15 }, { emoji: '📈', count: 7 }],
      priority: 'high'
    },
    {
      id: 4,
      user: 'You',
      role: 'Product Designer',
      avatar: '✨',
      time: '3:01 PM',
      content: 'Thank you all for the amazing feedback! I\'m excited to see how users respond to these improvements. Should we schedule a design handoff session?',
      reactions: [{ emoji: '🚀', count: 9 }],
      priority: 'medium'
    }
  ];

  const teamMembers = [
    { 
      name: 'Sarah Chen', 
      role: 'Design Lead', 
      avatar: '👩‍💼', 
      status: 'online', 
      activity: 'Reviewing designs',
      expertise: ['UI/UX', 'Design Systems']
    },
    { 
      name: 'Alex Rodriguez', 
      role: 'Senior Developer', 
      avatar: '👨‍💻', 
      status: 'in-call', 
      activity: 'In brainstorm-lounge',
      expertise: ['React', 'TypeScript']
    },
    { 
      name: 'Maya Patel', 
      role: 'UX Researcher', 
      avatar: '📊', 
      status: 'away', 
      activity: 'User interview',
      expertise: ['Research', 'Analytics']
    },
    { 
      name: 'Jordan Kim', 
      role: 'Creative Director', 
      avatar: '🎭', 
      status: 'online', 
      activity: 'Available',
      expertise: ['Brand', 'Strategy']
    },
    { 
      name: 'Riley Thompson', 
      role: 'Product Manager', 
      avatar: '📋', 
      status: 'busy', 
      activity: 'Planning session',
      expertise: ['Strategy', 'Roadmaps']
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      online: 'bg-emerald-400 shadow-emerald-400/50',
      away: 'bg-amber-400 shadow-amber-400/50',
      busy: 'bg-red-400 shadow-red-400/50',
      'in-call': 'bg-blue-400 shadow-blue-400/50 animate-pulse'
    };
    return <div className={`w-3 h-3 rounded-full ${styles[status]} shadow-lg border-2 border-white`} />;
  };

  const PriorityIndicator = ({ priority }) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return <div className={`w-1 h-full rounded-full ${colors[priority]} opacity-60`} />;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 overflow-hidden">
      {/* Workspace Sidebar */}
      <div className="w-20 bg-white/70 backdrop-blur-xl border-r border-white/20 flex flex-col items-center py-6 space-y-4 shadow-xl">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
          C
        </div>
        
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="relative group">
            <button
              onClick={() => setSelectedWorkspace(workspace.id)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 shadow-lg relative overflow-hidden ${
                selectedWorkspace === workspace.id
                  ? `bg-gradient-to-br ${workspace.color} text-white scale-110 shadow-2xl`
                  : 'bg-white/80 hover:bg-white hover:scale-105 hover:shadow-xl backdrop-blur-sm'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
              <span className="relative z-10">{workspace.icon}</span>
            </button>
            
            {/* Activity indicator */}
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              workspace.activity === 'high' ? 'bg-emerald-400' : 
              workspace.activity === 'medium' ? 'bg-amber-400' : 'bg-slate-400'
            } shadow-lg`} />
            
            {/* Tooltip */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              <div className="font-medium">{workspace.name}</div>
              <div className="text-slate-300 text-xs">{workspace.members} members</div>
            </div>
          </div>
        ))}
        
        <button className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 hover:from-indigo-100 hover:to-purple-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg group">
          <Plus size={24} className="text-slate-600 group-hover:text-indigo-600" />
        </button>
      </div>

      {/* Channel Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white/50 backdrop-blur-xl border-r border-white/20 flex flex-col transition-all duration-300 shadow-lg`}>
        {!sidebarCollapsed && (
          <>
            {/* Workspace Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {workspaces[selectedWorkspace].name}
                  </h2>
                  <p className="text-sm text-slate-500">{workspaces[selectedWorkspace].members} members</p>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-2 hover:bg-white/60 rounded-xl transition-colors"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  <Video size={16} className="inline mr-2" />
                  Start Call
                </button>
                <button className="p-2 bg-white/60 hover:bg-white/80 rounded-xl transition-colors shadow-md">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="p-4 border-b border-white/20">
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search channels, messages..."
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all backdrop-blur-sm"
                />
              </div>
              
              <div className="flex space-x-2">
                {['all', 'unread', 'mentions'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      activeFilter === filter
                        ? 'bg-indigo-100 text-indigo-700 shadow-md'
                        : 'text-slate-600 hover:bg-white/60'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {Object.entries(channels).map(([category, channelList]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                    <span>{category}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-3" />
                  </h3>
                  
                  <div className="space-y-1">
                    {channelList.map((channel) => (
                      <button
                        key={channel.name}
                        onClick={() => setSelectedChannel(channel.name)}
                        className={`w-full p-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                          selectedChannel === channel.name
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-[1.02]'
                            : 'hover:bg-white/60 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-xl ${
                              selectedChannel === channel.name ? 'bg-white/20' : 'bg-gradient-to-br from-slate-100 to-slate-200'
                            }`}>
                              {channel.type === 'text' && <MessageSquare size={16} />}
                              {channel.type === 'voice' && <Mic size={16} />}
                              {channel.type === 'video' && <Video size={16} />}
                              {channel.type === 'event' && <Calendar size={16} />}
                            </div>
                            <PriorityIndicator priority={channel.priority} />
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">{channel.name}</div>
                            <div className={`text-xs ${
                              selectedChannel === channel.name ? 'text-white/70' : 'text-slate-500'
                            }`}>
                              {channel.lastActive && `Active ${channel.lastActive} ago`}
                              {channel.time && channel.time}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            {channel.unread > 0 && (
                              <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center shadow-lg">
                                {channel.unread > 99 ? '99+' : channel.unread}
                              </div>
                            )}
                            {channel.participants > 0 && (
                              <div className="flex items-center text-xs space-x-1">
                                <Users size={12} />
                                <span>{channel.participants}</span>
                              </div>
                            )}
                            {channel.attendees && (
                              <div className="text-xs text-slate-500">
                                {channel.attendees} attendees
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {selectedChannel === channel.name && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* User Panel */}
            <div className="p-4 border-t border-white/20 bg-gradient-to-r from-white/40 to-white/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    ✨
                  </div>
                  <StatusBadge status="online" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">You</div>
                  <div className="text-sm text-slate-500">Product Designer</div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-white/60 rounded-xl transition-colors">
                    <Bell size={16} />
                  </button>
                  <button className="p-2 hover:bg-white/60 rounded-xl transition-colors">
                    <Settings size={16} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        
        {sidebarCollapsed && (
          <div className="p-4">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-full p-3 hover:bg-white/60 rounded-xl transition-colors flex items-center justify-center"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
        {/* Channel Header */}
        <div className="h-20 px-8 flex items-center justify-between border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
                <MessageSquare size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{selectedChannel}</h1>
                <p className="text-sm text-slate-500">Product design discussions and updates</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/60 rounded-full px-4 py-2 shadow-md">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">{teamMembers.filter(m => m.status === 'online').length} online</span>
            </div>
            
            <button className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Phone size={20} />
            </button>
            <button className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Video size={20} />
            </button>
            <button className="p-3 bg-white/60 hover:bg-white/80 rounded-2xl transition-colors shadow-md">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, index) => (
            <div key={msg.id} className="group relative">
              <div className={`flex space-x-4 p-6 rounded-3xl transition-all duration-200 ${
                msg.user === 'You' 
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 ml-12' 
                  : 'bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:shadow-lg mr-12'
              }`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                    msg.user === 'You' ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' : 'bg-gradient-to-br from-slate-200 to-slate-300'
                  }`}>
                    {msg.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <StatusBadge status={msg.user === 'Sarah Chen' ? 'online' : msg.user === 'Alex Rodriguez' ? 'in-call' : 'online'} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold text-slate-800">{msg.user}</h4>
                    <span className="text-sm font-medium text-slate-500">{msg.role}</span>
                    <span className="text-xs text-slate-400">{msg.time}</span>
                    {msg.priority === 'high' && (
                      <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                        <Zap size={10} />
                        <span>Priority</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="prose prose-slate max-w-none mb-3">
                    <p className="text-slate-700 leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {msg.attachments && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {msg.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-xl border border-indigo-200">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Sparkles size={16} className="text-white" />
                          </div>
                          <span className="text-sm font-medium text-indigo-800">{attachment.name}</span>
                          <button className="text-indigo-600 hover:text-indigo-800">
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {msg.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          className="flex items-center space-x-2 bg-white/80 hover:bg-white border border-white/60 px-3 py-2 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                          <span className="text-lg">{reaction.emoji}</span>
                          <span className="font-medium text-slate-700">{reaction.count}</span>
                        </button>
                      ))}
                      <button className="p-2 bg-white/60 hover:bg-white rounded-full border border-white/60 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <Smile size={16} className="text-slate-600" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Message Actions */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col space-y-1">
                    <button className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                      <Heart size={16} className="text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                      <Bookmark size={16} className="text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                      <Share2 size={16} className="text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Composer */}
        <div className="p-8 border-t border-white/20 bg-white/40 backdrop-blur-xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
            <div className="flex items-end space-x-4">
              <div className="flex space-x-2">
                <button className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-indigo-100 hover:to-purple-100 rounded-2xl transition-all duration-200 hover:scale-105 shadow-md">
                  <Paperclip size={20} className="text-slate-600" />
                </button>
                <button className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-emerald-100 hover:to-teal-100 rounded-2xl transition-all duration-200 hover:scale-105 shadow-md">
                  <Smile size={20} className="text-slate-600" />
                </button>
              </div>
              
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-transparent resize-none outline-none text-slate-800 placeholder-slate-400 text-lg"
                  rows={1}
                  style={{ minHeight: '28px', maxHeight: '120px' }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`p-3 rounded-2xl shadow-lg transition-all duration-200 ${
                  message.trim()
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Sidebar */}
      <div className="w-80 bg-white/50 backdrop-blur-xl border-l border-white/20 flex flex-col shadow-lg">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Team Members</h3>
            <button className="text-slate-500 hover:text-slate-700">
              <Filter size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <div className="text-lg font-bold text-emerald-800">{teamMembers.filter(m => m.status === 'online').length}</div>
              <div className="text-xs text-emerald-600 font-medium">Online</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <div className="text-lg font-bold text-blue-800">{teamMembers.filter(m => m.status === 'in-call').length}</div>
              <div className="text-xs text-blue-600 font-medium">In Call</div>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <div className="text-lg font-bold text-amber-800">{teamMembers.filter(m => m.status === 'away').length}</div>
              <div className="text-xs text-amber-600 font-medium">Away</div>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <div className="text-lg font-bold text-red-800">{teamMembers.filter(m => m.status === 'busy').length}</div>
              <div className="text-xs text-red-600 font-medium">Busy</div>
            </div>
          </div>
        </div>

        {/* Team List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center space-x-4 p-4 bg-white/60 hover:bg-white/80 rounded-2xl transition-all duration-200 hover:shadow-lg cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center text-xl shadow-md">
                    {member.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <StatusBadge status={member.status} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-800 truncate">{member.name}</h4>
                    {member.name === 'Sarah Chen' && (
                      <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Star size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 truncate">{member.role}</p>
                  <p className="text-xs text-slate-400 truncate">{member.activity}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.expertise.map((skill, skillIdx) => (
                      <span key={skillIdx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                      <MessageSquare size={14} className="text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-white/80 rounded-xl transition-colors">
                      <Phone size={14} className="text-slate-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Footer */}
        <div className="p-6 border-t border-white/20 bg-gradient-to-r from-white/40 to-white/20">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Users size={16} />
              <span>Team Call</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 bg-white/60 hover:bg-white/80 text-slate-700 rounded-2xl font-medium shadow-md transition-all duration-200 hover:scale-105">
              <Calendar size={16} />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantChatUI;