import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, MailOpen, Trash2, X, Loader2, Archive, Reply, CheckCircle2 } from 'lucide-react';
import { messagesApi } from '@/services/api';
import type { Message, MessageStatus } from '@/types';

export const AdminMessagesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => messagesApi.getAll(),
  });

  const toggleReadMutation = useMutation({
    mutationFn: ({ id, read, status }: { id: string; read: boolean; status?: MessageStatus }) =>
      messagesApi.markRead(id, read, status),
    onSuccess: (updatedMsg) => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      if (selectedMessage && selectedMessage._id === updatedMsg._id) {
        setSelectedMessage(updatedMsg);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => messagesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      setSelectedMessage(null);
    },
  });

  const openMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      toggleReadMutation.mutate({ id: msg._id, read: true, status: 'read' });
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read && m.status !== 'archived';
    if (filter === 'archived') return m.status === 'archived';
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Inquiries & Messages
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Inbox for portfolio contact submissions ({unreadCount} unread).
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
          {(['all', 'unread', 'read', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                filter === tab
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {tab} {tab === 'unread' && unreadCount > 0 && `(${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary-500" />
            <span>Loading inbox...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Mail className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="text-sm">No messages in this folder.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                  !msg.read ? 'bg-primary-50/30 dark:bg-primary-950/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3.5 min-w-0">
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    !msg.read
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {!msg.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold truncate ${
                        !msg.read ? 'text-primary-900 dark:text-primary-100' : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {msg.name}
                      </span>
                      <span className="text-xs text-slate-400 truncate">
                        &lt;{msg.email}&gt;
                      </span>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-600 text-white">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-center" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                  <button
                    onClick={() => toggleReadMutation.mutate({
                      id: msg._id,
                      read: !msg.read,
                      status: !msg.read ? 'read' : 'unread',
                    })}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary-600 transition-colors"
                    title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete message from "${msg.name}"?`)) {
                        deleteMutation.mutate(msg._id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {selectedMessage.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedMessage.email} &bull; {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : ''}
                </p>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newStatus: MessageStatus = selectedMessage.status === 'archived' ? 'read' : 'archived';
                    toggleReadMutation.mutate({
                      id: selectedMessage._id,
                      read: true,
                      status: newStatus,
                    });
                  }}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5 mr-1.5" />
                  <span>{selectedMessage.status === 'archived' ? 'Unarchive' : 'Archive'}</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this message?')) {
                      deleteMutation.mutate(selectedMessage._id);
                    }
                  }}
                  className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  <span>Delete</span>
                </button>
              </div>

              <a
                href={`mailto:${selectedMessage.email}?subject=Re:%20Inquiry%20from%20Abdalle%20Hussein%20Portfolio`}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
              >
                <Reply className="w-3.5 h-3.5 mr-1.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
