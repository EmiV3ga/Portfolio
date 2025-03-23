import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Heart, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos de ejemplo
  const examplePosts = [
    {
      id: 1,
      content: "Just launched my new portfolio! Check it out and let me know what you think 🚀",
      created_at: "2024-03-19",
      likes: 42,
      comments: 8,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
      profiles: {
        full_name: "Emiliano Vega",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      }
    },
    {
      id: 2,
      content: "Working on some exciting new features for the upcoming project. Stay tuned! 💻",
      created_at: "2024-03-18",
      likes: 35,
      comments: 5,
      profiles: {
        full_name: "Emiliano Vega",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      }
    }
  ];

  // Cargar posts desde Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(full_name, avatar_url)') // Cargar datos del perfil del usuario
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        // Si hay un error, usa los datos de ejemplo
        setPosts(examplePosts);
      } else {
        // Combina los posts de Supabase con los posts de ejemplo
        setPosts([...examplePosts, ...data]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-secondary rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {/* Mostrar información del usuario si está disponible */}
              {post.profiles && (
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-primary dark:text-text-dark">
                      {post.profiles.full_name}
                    </h3>
                    <span className="text-sm text-primary/60 dark:text-text-dark/60">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Contenido del post */}
              <p className="text-primary dark:text-text-dark mb-4">{post.content}</p>

              {/* Imagen del post (si está disponible) */}
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img src={post.image} alt="" className="w-full h-64 object-cover" />
                </div>
              )}

              {/* Interacciones (likes, comentarios, compartir) */}
              <div className="flex items-center justify-between text-sm text-primary/60 dark:text-text-dark/60">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                    <Heart size={18} />
                    <span>{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                    <MessageSquare size={18} />
                    <span>{post.comments || 0}</span>
                  </button>
                  <button className="hover:text-accent transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Feed;