import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      setEmail(user.email || '');
      
      // Get the profile with admin status
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!profile?.is_admin);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-accent rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Administrator Status</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-300">Email:</p>
          <p className="font-medium text-gray-900 dark:text-white">{email}</p>
        </div>
        
        <div>
          <p className="text-gray-600 dark:text-gray-300">Admin Status:</p>
          <p className={`font-medium ${isAdmin ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isAdmin ? 'Administrator' : 'Not an Administrator'}
          </p>
        </div>

        {!isAdmin && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              To get administrator access, please ensure you are using the correct email address (emiliano.dimartino.vega@gmail.com) and that your profile has been properly set up.
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={checkAdminStatus}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCheck;