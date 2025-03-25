import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GuestbookEntry {
  id: string;
  content: string;
  created_at: string;
  visitor_name?: string;
  display_name?: string;
  avatar_url?: string;
}

const Guestbook = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorAlias, setVisitorAlias] = useState('');
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    checkAdminStatus();
    fetchEntries();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!profile?.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries_with_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching guestbook entries:', error);
      setError('Failed to load entries');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    setLoading(true);
    try {
      const visitorDisplayName = visitorName.trim() + (visitorAlias.trim() ? ` - ${visitorAlias.trim()}` : '');
      
      const { error } = await supabase
        .from('guestbook')
        .insert([{
          content: message.trim(),
          user_id: user?.id || null,
          visitor_name: !user ? visitorDisplayName || 'Anonymous' : null
        }]);

      if (error) throw error;

      setMessage('');
      setVisitorName('');
      setVisitorAlias('');
      await fetchEntries();
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
      setError('Failed to submit entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', entryId);

      if (error) throw error;
      await fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      setError('Failed to delete entry');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Guestbook</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white dark:bg-accent rounded-xl shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!user && (
            <div className="space-y-4">
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder={t('yourName')}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input
                type="text"
                value={visitorAlias}
                onChange={(e) => setVisitorAlias(e.target.value)}
                placeholder={t('yourAlias')}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('writeMessage')}
            className="w-full h-24 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Signing...' : t('signGuestbook')}</span>
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white dark:bg-accent rounded-xl shadow-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={entry.avatar_url || `https://ui-avatars.com/api/?name=${entry.display_name || 'Guest'}&background=5c4742&color=fff`}
                  alt={entry.display_name || 'Guest'}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {entry.display_name || entry.visitor_name || t('anonymous')}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <time className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(entry.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;