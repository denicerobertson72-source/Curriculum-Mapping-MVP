import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Pill } from '../components/Badge';
import type { TopicType } from '../types';

const TOPIC_TYPES: TopicType[] = ['topic', 'skill', 'concept', 'method'];
const TYPE_COLORS: Record<TopicType, string> = { topic: 'blue', skill: 'teal', concept: 'purple', method: 'amber' };

export default function TopicPlaceholder() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const { courses, topicPlaceholders, topicTags } = state;

  const course = courses.find(c => c.course_id === id);
  const existing = topicPlaceholders.find(tp => tp.course_id === id);
  const tags = topicTags.filter(t => t.course_id === id);

  const [syllabusUrl, setSyllabusUrl] = useState(existing?.syllabus_url ?? '');
  const [reviewDate, setReviewDate] = useState(existing?.syllabus_review_date ?? '');
  const [assignments, setAssignments] = useState(existing?.major_assignments_text ?? '');
  const [delivery, setDelivery] = useState(existing?.delivery_notes ?? '');
  const [saved, setSaved] = useState(false);

  const [newTag, setNewTag] = useState('');
  const [newTagType, setNewTagType] = useState<TopicType>('topic');

  useEffect(() => {
    setSyllabusUrl(existing?.syllabus_url ?? '');
    setReviewDate(existing?.syllabus_review_date ?? '');
    setAssignments(existing?.major_assignments_text ?? '');
    setDelivery(existing?.delivery_notes ?? '');
  }, [id, existing]);

  if (!course) return <div className="p-8 text-gray-500">Course not found.</div>;

  const handleSave = () => {
    dispatch({
      type: 'SAVE_TOPIC_PLACEHOLDER',
      payload: {
        placeholder: {
          topic_placeholder_id: existing?.topic_placeholder_id ?? `tp-${Date.now()}`,
          course_id: id!,
          syllabus_url: syllabusUrl || undefined,
          syllabus_review_date: reviewDate || undefined,
          major_assignments_text: assignments || undefined,
          delivery_notes: delivery || undefined,
          created_at: existing?.created_at ?? new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    dispatch({
      type: 'ADD_TOPIC_TAG',
      payload: {
        tag: {
          course_topic_tag_id: `tag-${Date.now()}`,
          course_id: id!,
          topic_name: newTag.trim(),
          topic_type: newTagType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    });
    setNewTag('');
  };

  const handleRemoveTag = (tagId: string) => {
    dispatch({ type: 'REMOVE_TOPIC_TAG', payload: { course_topic_tag_id: tagId } });
  };

  const tagsByType = TOPIC_TYPES.map(type => ({
    type,
    items: tags.filter(t => t.topic_type === type),
  })).filter(g => g.items.length > 0);

  return (
    <div>
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200">
        <Link to={`/courses/${id}`} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft size={14} /> {course.course_code}: {course.course_title}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Topic Placeholder</h1>
            <p className="text-sm text-gray-500 mt-1">Lightweight syllabus and topic data for future overlap analysis</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all ${saved ? 'bg-green-600 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}`}
          >
            <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: syllabus & assignments */}
        <div className="space-y-6">
          {/* Syllabus */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Syllabus Reference</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus URL (optional)</label>
              <input
                value={syllabusUrl}
                onChange={e => setSyllabusUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Syllabus Review Date</label>
              <input
                type="date"
                value={reviewDate}
                onChange={e => setReviewDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Major Assignments</h2>
            <textarea
              value={assignments}
              onChange={e => setAssignments(e.target.value)}
              rows={4}
              placeholder="e.g. Lab reports (4), Midterm exam, Research proposal, Poster presentation"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Delivery notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Delivery / Emphasis Notes</h2>
            <textarea
              value={delivery}
              onChange={e => setDelivery(e.target.value)}
              rows={3}
              placeholder="Notes on how this course is delivered, its emphasis, or special context..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Right: topics & skills */}
        <div className="space-y-6">
          {/* Add tag */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Add Topic / Skill / Concept</h2>
            <div className="flex gap-2">
              <select
                value={newTagType}
                onChange={e => setNewTagType(e.target.value as TopicType)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {TOPIC_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
              <input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                placeholder="e.g. Statistical Analysis"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={handleAddTag}
                className="flex items-center gap-1 bg-brand-600 text-white px-3 py-2 rounded-lg hover:bg-brand-700 text-sm"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {TOPIC_TYPES.map(t => (
                <span key={t} className="text-xs text-gray-500">
                  <Pill label={t.charAt(0).toUpperCase() + t.slice(1)} color={TYPE_COLORS[t]} />
                </span>
              ))}
            </div>
          </div>

          {/* Tags grouped */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Current Topics & Skills ({tags.length})</h2>
            {tags.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-6">No topics added yet.</div>
            ) : (
              <div className="space-y-4">
                {tagsByType.map(({ type, items }) => (
                  <div key={type}>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {type}s ({items.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map(tag => (
                        <div key={tag.course_topic_tag_id} className="flex items-center gap-1 group">
                          <Pill label={tag.topic_name} color={TYPE_COLORS[type]} />
                          <button
                            onClick={() => handleRemoveTag(tag.course_topic_tag_id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 -ml-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All topics summary across all courses */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">About Topic Placeholders</h3>
            <p className="text-xs text-gray-500">
              This lightweight data supports a future phase of the curriculum mapping tool that will identify overlapping topics across courses, flag redundant coverage, and surface sequencing opportunities. Add topics now to prepare.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
