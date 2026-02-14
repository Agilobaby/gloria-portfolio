import React, { useEffect, useState } from 'react';
import { getProjects, createProject, deleteProject, getExperience, createExperience, deleteExperience, getMessages } from '../services/api';
import { Project, Experience, Message } from '../types';
import { Trash2, LogOut } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experience' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Forms State
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: '', category: 'UI Design', image: '' });
  const [newExp, setNewExp] = useState<Partial<Experience>>({ type: 'education', title: '', role: '', date: '', description: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setProjects(await getProjects());
      setExperience(await getExperience());
      setMessages(await getMessages());
    } catch (e) {
      console.error("Fetch error", e);
      // If unauthorized, redirect might happen via interceptor or manually here
      if (localStorage.getItem('token') === null) window.location.hash = '#/login';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = '#/';
    window.location.reload();
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title) {
      await createProject(newProject as Project);
      setNewProject({ title: '', category: 'UI Design', image: '' });
      fetchData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Delete project?")) {
      await deleteProject(id);
      fetchData();
    }
  };

  const handleAddExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newExp.title) {
      await createExperience(newExp as Experience);
      setNewExp({ type: 'education', title: '', role: '', date: '', description: '' });
      fetchData();
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (window.confirm("Delete experience entry?")) {
      await deleteExperience(id);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E5EA] p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300 pb-2">
          {['projects', 'experience', 'messages'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`capitalize pb-2 px-2 font-medium ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-4">Add Project</h3>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="border p-2 rounded" required />
                <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="border p-2 rounded">
                  <option value="UI Design">UI Design</option>
                  <option value="Web Templates">Web Templates</option>
                  <option value="Logo">Logo</option>
                  <option value="Branding">Branding</option>
                </select>
                <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="border p-2 rounded" />
                <button type="submit" className="bg-primary text-black font-bold p-2 rounded">Add</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-4">Existing Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map(p => (
                  <div key={p._id} className="border p-4 rounded flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{p.title}</h4>
                      <p className="text-sm text-gray-500">{p.category}</p>
                    </div>
                    <button onClick={() => handleDeleteProject(p._id!)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
             <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-4">Add Experience</h3>
              <form onSubmit={handleAddExp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value as any})} className="border p-2 rounded">
                  <option value="education">Education</option>
                  <option value="work">Work History</option>
                </select>
                <input placeholder="Title (e.g. University)" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} className="border p-2 rounded" required />
                <input placeholder="Role (e.g. Student)" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="border p-2 rounded" required />
                <input placeholder="Date (e.g. 2020-2022)" value={newExp.date} onChange={e => setNewExp({...newExp, date: e.target.value})} className="border p-2 rounded" required />
                <textarea placeholder="Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} className="border p-2 rounded md:col-span-2" rows={3} />
                <button type="submit" className="bg-primary text-black font-bold p-2 rounded md:col-span-2">Add Entry</button>
              </form>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-4">History Entries</h3>
              <div className="space-y-4">
                {experience.map(e => (
                  <div key={e._id} className="border p-4 rounded flex justify-between items-center">
                     <div>
                       <span className={`text-xs px-2 py-1 rounded text-white ${e.type === 'work' ? 'bg-blue-500' : 'bg-green-500'}`}>{e.type.toUpperCase()}</span>
                       <h4 className="font-bold inline-block ml-2">{e.title}</h4>
                       <span className="text-sm text-gray-500 ml-2">({e.date})</span>
                     </div>
                     <button onClick={() => handleDeleteExp(e._id!)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="font-bold mb-4">Messages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m._id} className="border-b">
                      <td className="p-3 font-medium">{m.fullName}</td>
                      <td className="p-3 text-sm text-blue-600">{m.email}</td>
                      <td className="p-3 text-sm">{m.subject || '-'}</td>
                      <td className="p-3 text-sm text-gray-600 max-w-xs truncate" title={m.message}>{m.message}</td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr><td colSpan={4} className="p-4 text-center text-gray-500">No messages yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;