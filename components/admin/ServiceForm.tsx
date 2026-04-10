'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface IconBox {
  iconName: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface WorkProcess {
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

interface Mechanic {
  name: string;
  role: string;
  image?: string;
}

export interface ServiceFormData {
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  image: string;
  isActive: boolean;
  detailedContent: string[];
  checklist: string[];
  iconBoxes: IconBox[];
  faqs: FAQ[];
  workProcessProcessText: string;
  workProcess: WorkProcess[];
  testimonialText: string;
  testimonials: Testimonial[];
  mechanics: Mechanic[];
}

interface ServiceFormProps {
  initialData?: Partial<ServiceFormData & { name?: string; price?: number | string }>;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const SERVICE_CATEGORIES = [
  'engine',
  'body',
  'electrical',
  'tyres',
  'glass',
  'interior',
  'painting',
  'general',
];

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
      >
        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{title}</span>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── Input Styles ─────────────────────────────────────────────────────────────

const inputCls =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-slate-900 placeholder:text-slate-300 text-sm';
const labelCls = 'block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1.5';

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServiceForm({ initialData, onSubmit, onCancel, isEditing = false }: ServiceFormProps) {
  const [form, setForm] = useState<ServiceFormData>({
    title: '',
    category: 'general',
    shortDescription: '',
    description: '',
    price: '',
    duration: '',
    icon: '',
    image: '',
    isActive: true,
    detailedContent: [''],
    checklist: [''],
    iconBoxes: [{ iconName: '', title: '', description: '' }],
    faqs: [{ question: '', answer: '' }],
    workProcessProcessText: '',
    workProcess: [{ title: '', description: '' }],
    testimonialText: '',
    testimonials: [{ name: '', role: '', review: '', rating: 5, date: '' }],
    mechanics: [{ name: '', role: '', image: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || (initialData as any).name || '',
        category: initialData.category || 'general',
        shortDescription: initialData.shortDescription || '',
        description: initialData.description || '',
        price: initialData.price?.toString() || '',
        duration: initialData.duration || '',
        icon: initialData.icon || '',
        image: initialData.image || '',
        isActive: initialData.isActive ?? true,
        detailedContent: initialData.detailedContent?.length ? initialData.detailedContent : [''],
        checklist: initialData.checklist?.length ? initialData.checklist : [''],
        iconBoxes: initialData.iconBoxes?.length
          ? initialData.iconBoxes
          : [{ iconName: '', title: '', description: '' }],
        faqs: initialData.faqs?.length ? initialData.faqs : [{ question: '', answer: '' }],
        workProcessProcessText: initialData.workProcessProcessText || '',
        workProcess: initialData.workProcess?.length ? initialData.workProcess : [{ title: '', description: '' }],
        testimonialText: initialData.testimonialText || '',
        testimonials: initialData.testimonials?.length ? initialData.testimonials : [{ name: '', role: '', review: '', rating: 5, date: '' }],
        mechanics: initialData.mechanics?.length ? initialData.mechanics : [{ name: '', role: '', image: '' }],
      });
    }
  }, [initialData]);

  // ─── Field handlers ─────────────────────────────────────────────────────────

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // String array helpers
  const updateArrayItem = (key: 'detailedContent' | 'checklist', index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[key]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const addArrayItem = (key: 'detailedContent' | 'checklist') => {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const removeArrayItem = (key: 'detailedContent' | 'checklist', index: number) => {
    setForm((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
  };

  // iconBoxes helpers
  const updateIconBox = (index: number, field: keyof IconBox, value: string) => {
    setForm((prev) => {
      const arr = [...prev.iconBoxes];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, iconBoxes: arr };
    });
  };

  const addIconBox = () =>
    setForm((prev) => ({
      ...prev,
      iconBoxes: [...prev.iconBoxes, { iconName: '', title: '', description: '' }],
    }));

  const removeIconBox = (index: number) =>
    setForm((prev) => ({ ...prev, iconBoxes: prev.iconBoxes.filter((_, i) => i !== index) }));

  // FAQ helpers
  const updateFaq = (index: number, field: keyof FAQ, value: string) => {
    setForm((prev) => {
      const arr = [...prev.faqs];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, faqs: arr };
    });
  };

  const addFaq = () =>
    setForm((prev) => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));

  const removeFaq = (index: number) =>
    setForm((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));

  // WorkProcess helpers
  const updateWorkProcess = (index: number, field: keyof WorkProcess, value: string) => {
    setForm((prev) => {
      const arr = [...prev.workProcess];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, workProcess: arr };
    });
  };

  const addWorkProcess = () =>
    setForm((prev) => ({ ...prev, workProcess: [...prev.workProcess, { title: '', description: '' }] }));

  const removeWorkProcess = (index: number) =>
    setForm((prev) => ({ ...prev, workProcess: prev.workProcess.filter((_, i) => i !== index) }));

  // Testimonials helpers
  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    setForm((prev) => {
      const arr = [...prev.testimonials];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, testimonials: arr };
    });
  };

  const addTestimonial = () =>
    setForm((prev) => ({ ...prev, testimonials: [...prev.testimonials, { name: '', role: '', review: '', rating: 5, date: '' }] }));

  const removeTestimonial = (index: number) =>
    setForm((prev) => ({ ...prev, testimonials: prev.testimonials.filter((_, i) => i !== index) }));

  // Mechanics helpers
  const updateMechanic = (index: number, field: keyof Mechanic, value: string) => {
    setForm((prev) => {
      const arr = [...prev.mechanics];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, mechanics: arr };
    });
  };

  const addMechanic = () =>
    setForm((prev) => ({ ...prev, mechanics: [...prev.mechanics, { name: '', role: '', image: '' }] }));

  const removeMechanic = (index: number) =>
    setForm((prev) => ({ ...prev, mechanics: prev.mechanics.filter((_, i) => i !== index) }));

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cleanedForm: ServiceFormData = {
        ...form,
        detailedContent: form.detailedContent.filter((s) => s.trim()),
        checklist: form.checklist.filter((s) => s.trim()),
        iconBoxes: form.iconBoxes.filter((b) => b.title.trim()),
        faqs: form.faqs.filter((f) => f.question.trim()),
      };
      await onSubmit(cleanedForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
          {isEditing ? '✏️ Edit Service' : '➕ Add New Service'}
        </h3>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-700 text-sm transition-colors">
          Cancel
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* ── Basic Info ── */}
      <Section title="Basic Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Service Title *</label>
            <input name="title" value={form.title} onChange={handleField} required className={inputCls} placeholder="e.g. Engine Overhauling" />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <select name="category" value={form.category} onChange={handleField} className={inputCls}>
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Price (AED)</label>
            <input name="price" value={form.price} onChange={handleField} className={inputCls} placeholder="e.g. 299" />
          </div>
          <div>
            <label className={labelCls}>Duration</label>
            <input name="duration" value={form.duration} onChange={handleField} className={inputCls} placeholder="e.g. 2-3 hours" />
          </div>
          <div>
            <label className={labelCls}>Icon (emoji or URL)</label>
            <input name="icon" value={form.icon} onChange={handleField} className={inputCls} placeholder="🔧 or /icons/engine.svg" />
          </div>
          <div>
            <label className={labelCls}>Cover Image URL</label>
            <input name="image" value={form.image} onChange={handleField} className={inputCls} placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Short Description (SEO / card)</label>
            <input name="shortDescription" value={form.shortDescription} onChange={handleField} className={inputCls} placeholder="One-line summary shown on service cards" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Full Description</label>
            <textarea name="description" value={form.description} onChange={handleField} rows={4} className={inputCls} placeholder="Detailed description of the service..." />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleField} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
          </div>
        </div>
      </Section>

      {/* ── Page Content Paragraphs ── */}
      <Section title="Page Content Paragraphs">
        <p className="text-xs text-slate-400 mb-3">These paragraphs appear in the service detail page body.</p>
        {form.detailedContent.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <textarea
              value={item}
              onChange={(e) => updateArrayItem('detailedContent', i, e.target.value)}
              rows={2}
              className={`${inputCls} resize-none flex-1`}
              placeholder={`Paragraph ${i + 1}...`}
            />
            {form.detailedContent.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('detailedContent', i)} className="mt-1 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('detailedContent')} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors mt-1">
          <Plus size={14} /> Add Paragraph
        </button>
      </Section>

      {/* ── Checklist ── */}
      <Section title="Service Checklist / Features">
        <p className="text-xs text-slate-400 mb-3">Bullet points shown as service features/inclusions.</p>
        {form.checklist.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              value={item}
              onChange={(e) => updateArrayItem('checklist', i, e.target.value)}
              className={`${inputCls} flex-1`}
              placeholder={`Feature ${i + 1}...`}
            />
            {form.checklist.length > 1 && (
              <button type="button" onClick={() => removeArrayItem('checklist', i)} className="text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('checklist')} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors mt-1">
          <Plus size={14} /> Add Feature
        </button>
      </Section>

      {/* ── Icon Boxes ── */}
      <Section title="Icon Feature Boxes">
        <p className="text-xs text-slate-400 mb-3">Highlighted feature boxes with icon, title and description.</p>
        {form.iconBoxes.map((box, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Icon (emoji/name)</label>
                <input value={box.iconName} onChange={(e) => updateIconBox(i, 'iconName', e.target.value)} className={inputCls} placeholder="🔧" />
              </div>
              <div>
                <label className={labelCls}>Title</label>
                <input value={box.title} onChange={(e) => updateIconBox(i, 'title', e.target.value)} className={inputCls} placeholder="Expert Mechanics" />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <input value={box.description} onChange={(e) => updateIconBox(i, 'description', e.target.value)} className={inputCls} placeholder="Short feature description" />
              </div>
            </div>
            {form.iconBoxes.length > 1 && (
              <button type="button" onClick={() => removeIconBox(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIconBox} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
          <Plus size={14} /> Add Icon Box
        </button>
      </Section>

      {/* ── FAQs ── */}
      <Section title="Service FAQs">
        <p className="text-xs text-slate-400 mb-3">Questions & answers shown in the FAQ accordion on the service detail page.</p>
        {form.faqs.map((faq, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3 relative">
            <div>
              <label className={labelCls}>Question</label>
              <input value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} className={inputCls} placeholder="e.g. How long does the service take?" />
            </div>
            <div>
              <label className={labelCls}>Answer</label>
              <textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Provide a clear, helpful answer..." />
            </div>
            {form.faqs.length > 1 && (
              <button type="button" onClick={() => removeFaq(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addFaq} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
          <Plus size={14} /> Add FAQ
        </button>
      </Section>

      {/* ── Work Process ── */}
      <Section title="Our Work Process">
        <p className="text-xs text-slate-400 mb-3">Add detailed step-by-step processes for this service.</p>
        
        <div className="mb-4">
          <label className={labelCls}>Process Introduction Text</label>
          <textarea
            name="workProcessProcessText"
            value={form.workProcessProcessText}
            onChange={handleField}
            rows={2}
            className={`${inputCls} resize-none`}
            placeholder="Understanding our repair process helps you feel confident..."
          />
        </div>

        {form.workProcess.map((step, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3 relative mb-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute top-4 right-4">Step {i + 1}</h4>
            <div className="mr-12">
              <label className={labelCls}>Step Title</label>
              <input value={step.title} onChange={(e) => updateWorkProcess(i, 'title', e.target.value)} className={inputCls} placeholder="e.g. Initial Assessment & Diagnostics" />
            </div>
            <div>
              <label className={labelCls}>Step Description</label>
              <textarea value={step.description} onChange={(e) => updateWorkProcess(i, 'description', e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="Describe what happens in this step..." />
            </div>
            {form.workProcess.length > 1 && (
              <button type="button" onClick={() => removeWorkProcess(i)} className="absolute bottom-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addWorkProcess} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
          <Plus size={14} /> Add Process Step
        </button>
      </Section>

      {/* ── Mechanics ── */}
      <Section title="Mechanics Grid">
        <p className="text-xs text-slate-400 mb-3">Specialist mechanics handling this service.</p>
        {form.mechanics.map((mechanic, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3 relative mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mr-8">
              <div>
                <label className={labelCls}>Name</label>
                <input value={mechanic.name} onChange={(e) => updateMechanic(i, 'name', e.target.value)} className={inputCls} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <input value={mechanic.role} onChange={(e) => updateMechanic(i, 'role', e.target.value)} className={inputCls} placeholder="e.g. Senior Technician" />
              </div>
            </div>
            <div className="mr-8">
              <label className={labelCls}>Profile Image URL</label>
              <input value={mechanic.image || ''} onChange={(e) => updateMechanic(i, 'image', e.target.value)} className={inputCls} placeholder="https://example.com/image.jpg" />
            </div>
            {form.mechanics.length > 1 && (
              <button type="button" onClick={() => removeMechanic(i)} className="absolute top-1/2 -translate-y-1/2 right-3 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addMechanic} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
          <Plus size={14} /> Add Mechanic
        </button>
      </Section>

      {/* ── Testimonials ── */}
      <Section title="Client Testimonials">
        <p className="text-xs text-slate-400 mb-3">Add testimonials specific to this service.</p>

        <div className="mb-4">
          <label className={labelCls}>Testimonial Introduction Paragraph</label>
          <textarea
            name="testimonialText"
            value={form.testimonialText}
            onChange={handleField}
            rows={2}
            className={`${inputCls} resize-none`}
            placeholder="We've helped over ten thousand satisfied vehicle owners..."
          />
        </div>

        {form.testimonials.map((test, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3 relative mb-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="col-span-2">
                <label className={labelCls}>Client Name</label>
                <input value={test.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} className={inputCls} placeholder="e.g. Alexander G. Ray" />
              </div>
              <div>
                <label className={labelCls}>Role / Tag</label>
                <input value={test.role} onChange={(e) => updateTestimonial(i, 'role', e.target.value)} className={inputCls} placeholder="e.g. Happy Client" />
              </div>
              <div>
                <label className={labelCls}>Rating (1-5)</label>
                <input type="number" min="1" max="5" value={test.rating} onChange={(e) => updateTestimonial(i, 'rating', parseInt(e.target.value))} className={inputCls} placeholder="5" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="col-span-3">
                <label className={labelCls}>Review Text</label>
                <textarea value={test.review} onChange={(e) => updateTestimonial(i, 'review', e.target.value)} rows={2} className={`${inputCls} resize-none`} placeholder="The service was exceptional..." />
              </div>
              <div>
                <label className={labelCls}>Date</label>
                <input value={test.date} onChange={(e) => updateTestimonial(i, 'date', e.target.value)} className={inputCls} placeholder="e.g. March 15, 2026" />
              </div>
            </div>
            {form.testimonials.length > 1 && (
              <button type="button" onClick={() => removeTestimonial(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addTestimonial} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
          <Plus size={14} /> Add Testimonial
        </button>
      </Section>

      {/* ── Actions ── */}
      <div className="flex gap-3 mt-6 pt-5 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-red-600 shadow-lg shadow-red-600/20 text-white rounded-xl font-bold hover:bg-red-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Service' : 'Add Service'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
