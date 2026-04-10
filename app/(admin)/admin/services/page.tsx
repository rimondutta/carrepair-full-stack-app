'use client';

import { useEffect, useState } from 'react';
import ServiceForm, { ServiceFormData } from '@/components/admin/ServiceForm';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';

interface ServiceData {
  _id: string;
  title?: string;
  name?: string;
  category?: string;
  shortDescription?: string;
  description: string;
  price: number | string;
  duration: string;
  icon: string;
  image?: string;
  isActive: boolean;
  detailedContent?: string[];
  checklist?: string[];
  iconBoxes?: { iconName: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  workProcessProcessText?: string;
  workProcess?: { title: string; description: string }[];
  testimonialText?: string;
  testimonials?: { name: string; role: string; review: string; rating: number; date: string }[];
  mechanics?: { name: string; role: string; image?: string }[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data?.data?.services || []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ServiceFormData) => {
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setServices((prev) => [result?.data?.service, ...prev].filter(Boolean));
    setShowForm(false);
  };

  const handleUpdate = async (data: ServiceFormData) => {
    if (!editingService) return;
    const res = await fetch(`/api/admin/services/${editingService._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setServices((prev) =>
      prev.map((s) => (s._id === editingService._id ? result?.data?.service ?? s : s))
    );
    setEditingService(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/services/${deleteId}`, { method: 'DELETE' });
      setServices((prev) => prev.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const handleToggleActive = async (service: ServiceData) => {
    try {
      const res = await fetch(`/api/admin/services/${service._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      const result = await res.json();
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? result?.data?.service ?? s : s))
      );
    } catch (error) {
      console.error('Failed to toggle service:', error);
    }
  };

  return (
    <>
      <main className="p-4 lg:p-8">
        {/* Add Button */}
        {!showForm && !editingService && (
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-slate-500">{services.length} specialty services listed</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-red-600 shadow-lg shadow-red-600/20 text-white rounded-xl font-bold hover:bg-red-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>
        )}

        {/* Add / Edit Form */}
        {showForm && (
          <ServiceForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}
        {editingService && (
          <ServiceForm
            initialData={editingService as any}
            onSubmit={handleUpdate}
            onCancel={() => setEditingService(null)}
            isEditing
          />
        )}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Service Title</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Description</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Price</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Duration</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Active</th>
                    <th className="text-left py-4 px-4 font-black text-slate-500 uppercase tracking-widest text-[10px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400">
                        No services yet. Add your first service!
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900">{service.title || service.name}</td>
                        <td className="py-4 px-4 text-slate-600 font-medium max-w-xs truncate">
                          {service.description || '—'}
                        </td>
                        <td className="py-4 px-4 text-slate-900 font-bold">
                          {service.price ? `$${parseFloat(service.price.toString()).toFixed(2)}` : '—'}
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-medium">{service.duration || '—'}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleActive(service)}
                            className={`relative w-10 h-5 rounded-full transition-colors ${
                              service.isActive ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                service.isActive ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                setEditingService(service);
                                setShowForm(false);
                              }}
                              className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(service._id)}
                              className="text-red-600 hover:text-red-800 text-xs font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Modal */}
        <ConfirmModal
          isOpen={!!deleteId}
          message="This will permanently delete this service. This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </main>
    </>
  );
}
