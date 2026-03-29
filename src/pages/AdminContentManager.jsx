import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Plus, Trash2, Edit2, X, Save, ChevronLeft, Search,
  BookOpen, MessageSquare, Heart, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/AdminSidebar';

const AdminContentManager = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    category: '',
    image: '',
    link: ''
  });

  const contentTypes = {
    articles: { table: 'articles', icon: BookOpen, label: 'Articles' },
    magazines: { table: 'magazines', icon: MessageSquare, label: 'Magazines' },
    sermons: { table: 'sermons', icon: Heart, label: 'Sermons' },
    verses: { table: 'memory_verses', icon: Globe, label: 'Memory Verses' },
    resources: { table: 'resources', icon: BookOpen, label: 'Resources' },
  };

  // Fetch content from Supabase
  const fetchContent = async (type) => {
    setLoading(true);
    const { data, error } = await supabase
      .from(contentTypes[type].table)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setContents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  // Create or update content
  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      alert('Title and description are required');
      return;
    }

    const dataToSave = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      author: formData.author || 'LCC Ministry',
      category: formData.category || 'General',
      image_url: formData.image,
      link: formData.link,
    };

    if (editingId) {
      // Update
      const { error } = await supabase
        .from(contentTypes[activeTab].table)
        .update(dataToSave)
        .eq('id', editingId);

      if (!error) {
        alert('Content updated successfully!');
        setEditingId(null);
      } else {
        alert('Error updating content: ' + error.message);
      }
    } else {
      // Create
      const { error } = await supabase
        .from(contentTypes[activeTab].table)
        .insert([{ ...dataToSave, created_at: new Date() }]);

      if (!error) {
        alert('Content created successfully!');
      } else {
        alert('Error creating content: ' + error.message);
      }
    }

    resetForm();
    fetchContent(activeTab);
  };

  // Delete content
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;

    const { error } = await supabase
      .from(contentTypes[activeTab].table)
      .delete()
      .eq('id', id);

    if (!error) {
      alert('Content deleted successfully!');
      fetchContent(activeTab);
    } else {
      alert('Error deleting content: ' + error.message);
    }
  };

  // Edit content
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      content: item.content || '',
      author: item.author || '',
      category: item.category || '',
      image: item.image_url || '',
      link: item.link || ''
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      author: '',
      category: '',
      image: '',
      link: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Filter contents by search
  const filteredContents = contents.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AdminSidebar />
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Content Manager</h1>
          <p className="text-slate-400">Manage all content across your platform</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {Object.entries(contentTypes).map(([key, type]) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-[#4CAF50] text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                {type.label}
              </motion.button>
            );
          })}
        </div>

        {/* Search and Add Button */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center gap-2"
          >
            <Plus size={20} />
            Add New
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit' : 'Create New'} {contentTypes[activeTab].label}
              </h2>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  placeholder="Content title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  placeholder="Brief description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    placeholder="Author name"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content/Link</label>
                <Textarea
                  placeholder="Full content or link"
                  value={formData.content || formData.link}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value, link: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[150px]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white flex items-center gap-2 flex-1"
                >
                  <Save size={20} />
                  {editingId ? 'Update' : 'Create'}
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading...</p>
            </div>
          ) : filteredContents.length === 0 ? (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="py-12 text-center">
                <p className="text-slate-400">No content found. Create your first one!</p>
              </CardContent>
            </Card>
          ) : (
            filteredContents.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-[#4CAF50]/50 transition">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          {item.category && (
                            <Badge className="bg-[#4CAF50] text-white">{item.category}</Badge>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                        <div className="flex gap-4 text-slate-500 text-xs">
                          {item.author && <span>By: {item.author}</span>}
                          <span>Created: {new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit2 size={18} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={18} className="text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContentManager;
