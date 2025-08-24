import { useState} from 'react';
import { 
  Hash, 
  Volume2, 
  Settings, 
  Plus, 
  Mic, 
  MicOff, 
  Headphones,
  VolumeX,
  PhoneCall,
  Users,
  Calendar,
  Search,
  Bell,
  Gift,
  Smile,
  Paperclip,
  Send,
  MoreHorizontal,
  UserPlus,
  Shield,
  Crown,
  ChevronDown,
  ChevronRight,
  Trash2,
  Edit,
  Reply,
  Heart,
  ThumbsUp,
  Laugh
} from 'lucide-react';

const DiscordUI = () => {
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isInVoice, setIsInVoice] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    'Text Channels': true,
    'Voice Channels': true,
    'Events': false
  });

  const servers = [
    { id: 0, name: 'My Server', avatar: '🎮', notifications: 3 },
    { id: 1, name: 'Work Team', avatar: '💼', notifications: 0 },
    { id: 2, name: 'Gaming', avatar: '🎯', notifications: 12 },
    { id: 3, name: 'Study Group', avatar: '📚', notifications: 1 }
  ];

  const channels = {
    'Text Channels': [
      { name: 'general', type: 'text', notifications: 2 },
      { name: 'random', type: 'text', notifications: 0 },
      { name: 'announcements', type: 'text', notifications: 1 },
      { name: 'projects', type: 'text', notifications: 0 }
    ],
    'Voice Channels': [
      { name: 'General', type: 'voice', users: ['Alice', 'Bob'] },
      { name: 'Gaming', type: 'voice', users: [] },
      { name: 'Music', type: 'voice', users: ['Charlie'] }
    ],
    'Events': [
      { name: 'Weekly Standup', type: 'event', time: '2:00 PM' },
      { name: 'Game Night', type: 'event', time: '8:00 PM' }
    ]
  };

  const messages = [
    {
      id: 1,
      user: 'Alice',
      avatar: '👩‍💻',
      time: '12:34',
      content: 'Hey everyone! How\'s the project going?',
      reactions: [{ emoji: '👍', count: 3 }, { emoji: '❤️', count: 1 }]
    },
    {
      id: 2,
      user: 'Bob',
      avatar: '👨‍💼',
      time: '12:35',
      content: 'Making good progress on the frontend. The new design looks amazing!',
      reactions: [{ emoji: '🔥', count: 2 }]
    },
    {
      id: 3,
      user: 'Charlie',
      avatar: '🎨',
      time: '12:36',
      content: 'Thanks! I\'ve been working on the color scheme. What do you think about the dark theme?',
      reactions: []
    },
    {
      id: 4,
      user: 'You',
      avatar: '😊',
      time: '12:37',
      content: 'The dark theme looks professional and easy on the eyes. Great choice!',
      reactions: [{ emoji: '💯', count: 1 }]
    }
  ];

  const onlineUsers = [
    { name: 'Alice', avatar: '👩‍💻', status: 'online', activity: 'Playing Valorant' },
    { name: 'Bob', avatar: '👨‍💼', status: 'away', activity: 'In a meeting' },
    { name: 'Charlie', avatar: '🎨', status: 'dnd', activity: 'Designing' },
    { name: 'Diana', avatar: '👩‍🎓', status: 'online', activity: 'Listening to Spotify' }
  ];

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const StatusIndicator = ({ status }) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      dnd: 'bg-red-500',
      offline: 'bg-gray-500'
    };
    return <div className={`w-3 h-3 rounded-full ${colors[status]} border-2 border-gray-800`} />;
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      {/* Server Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-2">
        {servers.map((server, index) => (
          <div key={server.id} className="relative group">
            <button
              onClick={() => setSelectedServer(server.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 ${
                selectedServer === server.id
                  ? 'bg-indigo-600 rounded-2xl'
                  : 'bg-gray-700 hover:bg-indigo-600 hover:rounded-2xl group-hover:rounded-2xl'
              }`}
            >
              {server.avatar}
            </button>
            {server.notifications > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {server.notifications > 9 ? '9+' : server.notifications}
              </div>
            )}
            <div className="absolute left-16 bg-gray-900 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {server.name}
            </div>
          </div>
        ))}
        <button className="w-12 h-12 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* Channel Sidebar */}
      <div className="w-60 bg-gray-700 flex flex-col">
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 shadow-md">
          <h2 className="font-semibold">{servers[selectedServer].name}</h2>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(channels).map(([category, channelList]) => (
            <div key={category} className="mb-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-300 flex items-center uppercase tracking-wide"
              >
                {expandedCategories[category] ? (
                  <ChevronDown size={12} className="mr-1" />
                ) : (
                  <ChevronRight size={12} className="mr-1" />
                )}
                {category}
              </button>
              {expandedCategories[category] && (
                <div className="space-y-1">
                  {channelList.map((channel) => (
                    <button
                      key={channel.name}
                      onClick={() => setSelectedChannel(channel.name)}
                      className={`w-full px-6 py-1 text-left flex items-center justify-between hover:bg-gray-600 rounded-l-none ${
                        selectedChannel === channel.name ? 'bg-gray-600 text-white' : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        {channel.type === 'text' && <Hash size={16} className="mr-2 text-gray-400" />}
                        {channel.type === 'voice' && <Volume2 size={16} className="mr-2 text-gray-400" />}
                        {channel.type === 'event' && <Calendar size={16} className="mr-2 text-gray-400" />}
                        <span className="truncate">{channel.name}</span>
                      </div>
                      {channel.notifications > 0 && (
                        <div className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 min-w-5 text-center">
                          {channel.notifications}
                        </div>
                      )}
                      {channel.users && channel.users.length > 0 && (
                        <div className="text-xs text-gray-400">
                          {channel.users.length}
                        </div>
                      )}
                      {channel.time && (
                        <div className="text-xs text-gray-400">
                          {channel.time}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Voice Panel */}
        {isInVoice && (
          <div className="p-2 bg-gray-600 border-t border-gray-500">
            <div className="text-xs text-green-400 mb-2 flex items-center">
              <Volume2 size={12} className="mr-1" />
              Voice Connected
            </div>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded ${isMuted ? 'bg-red-600' : 'bg-gray-500 hover:bg-gray-400'}`}
              >
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                onClick={() => setIsDeafened(!isDeafened)}
                className={`p-2 rounded ${isDeafened ? 'bg-red-600' : 'bg-gray-500 hover:bg-gray-400'}`}
              >
                {isDeafened ? <VolumeX size={16} /> : <Headphones size={16} />}
              </button>
              <button
                onClick={() => setIsInVoice(false)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded"
              >
                <PhoneCall size={16} />
              </button>
            </div>
          </div>
        )}

        {/* User Panel */}
        <div className="h-14 px-2 bg-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">
                😊
              </div>
              <StatusIndicator status="online" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">You</div>
              <div className="text-xs text-gray-400 truncate">#1234</div>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-gray-700 rounded" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button className="p-1 hover:bg-gray-700 rounded" onClick={() => setIsDeafened(!isDeafened)}>
              {isDeafened ? <VolumeX size={16} /> : <Headphones size={16} />}
            </button>
            <button 
              className="p-1 hover:bg-gray-700 rounded"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-gray-600 bg-gray-750 shadow-sm">
          <div className="flex items-center space-x-3">
            <Hash size={20} className="text-gray-400" />
            <span className="font-semibold">{selectedChannel}</span>
            <div className="w-px h-6 bg-gray-600" />
            <span className="text-sm text-gray-400">Welcome to #{selectedChannel}!</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-1.5 hover:bg-gray-600 rounded">
              <Bell size={18} />
            </button>
            <button className="p-1.5 hover:bg-gray-600 rounded">
              <Users size={18} />
            </button>
            <button className="p-1.5 hover:bg-gray-600 rounded">
              <Search size={18} />
            </button>
            <button className="p-1.5 hover:bg-gray-600 rounded">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex space-x-3 hover:bg-gray-750 p-2 rounded group">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-medium">{msg.user}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-gray-100 mt-1">{msg.content}</p>
                  {msg.reactions.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {msg.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          className="flex items-center space-x-1 px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded-full text-xs"
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                      <button className="px-2 py-1 hover:bg-gray-600 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <Smile size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-gray-600 rounded">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="p-1 hover:bg-gray-600 rounded">
                    <Reply size={14} />
                  </button>
                  <button className="p-1 hover:bg-gray-600 rounded">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="bg-gray-600 rounded-lg">
            <div className="flex items-end space-x-2 p-3">
              <button className="p-1 hover:bg-gray-500 rounded">
                <Paperclip size={20} className="text-gray-300" />
              </button>
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${selectedChannel}`}
                  className="w-full bg-transparent resize-none outline-none max-h-32 placeholder-gray-400"
                  rows={1}
                />
              </div>
              <button className="p-1 hover:bg-gray-500 rounded">
                <Gift size={20} className="text-gray-300" />
              </button>
              <button className="p-1 hover:bg-gray-500 rounded">
                <Smile size={20} className="text-gray-300" />
              </button>
              {message.trim() && (
                <button
                  onClick={sendMessage}
                  className="p-1 text-indigo-400 hover:text-indigo-300"
                >
                  <Send size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Users Sidebar */}
      <div className="w-60 bg-gray-700 flex flex-col">
        {/* Online Members */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Online — {onlineUsers.filter(u => u.status === 'online').length}
          </h3>
          <div className="space-y-2">
            {onlineUsers.map((user, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-1 hover:bg-gray-600 rounded group">
                <div className="relative">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">
                    {user.avatar}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <StatusIndicator status={user.status} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium flex items-center">
                    {user.name}
                    {user.name === 'Alice' && <Crown size={12} className="ml-1 text-yellow-500" />}
                    {user.name === 'Bob' && <Shield size={12} className="ml-1 text-green-500" />}
                  </div>
                  {user.activity && (
                    <div className="text-xs text-gray-400 truncate">{user.activity}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Voice Channel Users */}
          {channels['Voice Channels'].some(ch => ch.users.length > 0) && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                In Voice
              </h3>
              {channels['Voice Channels'].map(channel => 
                channel.users.length > 0 && (
                  <div key={channel.name} className="mb-2">
                    <div className="text-xs text-gray-400 mb-1 flex items-center">
                      <Volume2 size={12} className="mr-1" />
                      {channel.name}
                    </div>
                    {channel.users.map(user => (
                      <div key={user} className="flex items-center space-x-2 p-1 ml-3">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs">
                          {user[0]}
                        </div>
                        <span className="text-sm">{user}</span>
                        <div className="flex space-x-1 ml-auto">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="absolute bottom-16 left-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2 z-50">
          <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">
            Set Status
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">
            Profile
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm">
            Settings
          </button>
          <div className="border-t border-gray-600 my-1"></div>
          <button className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded text-sm text-red-400">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscordUI;