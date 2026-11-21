'use client';

import React, { useState } from 'react';
import { INITIAL_TASKS, TaskItem } from '@/data/sphere-os-mock';
import {
  CheckCircle2,
  Play,
  HelpCircle,
  ExternalLink,
  Clock,
  Sparkles,
  Check,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';

export default function MyDayStaffPortal() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedStaff, setSelectedStaff] = useState<'Saakshi' | 'Riddhi' | 'Anjali'>('Saakshi');
  const [activeHelpModal, setActiveHelpModal] = useState<TaskItem | null>(null);
  const [expandedSop, setExpandedSop] = useState<string | null>('t-101');
  const [tenMinuteTimer, setTenMinuteTimer] = useState<number>(600); // 10 minutes in seconds

  React.useEffect(() => {
    fetch(`/api/sphere-os/tasks?assignee=${selectedStaff}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.tasks) {
          setTasks((prev) => {
            const others = prev.filter((t) => t.assignee !== selectedStaff);
            return [...others, ...data.tasks];
          });
        }
      })
      .catch((err) => console.warn('Could not fetch tasks:', err));
  }, [selectedStaff]);

  const staffRoleMap = {
    Saakshi: {
      lane: 'Polish Lane',
      focus: 'After Effects, High-Polish Reels, AI Visuals (Max 2 open tasks)',
      rule: '10-Minute Decision Rule Active: If undecided, AI default rule applies.',
    },
    Riddhi: {
      lane: 'Concept & Trend Lane',
      focus: 'Creative Lead: Calendar drafting, hooks, carousels & statics',
      rule: 'Owns Idea Vault & Festival planning 4 weeks ahead.',
    },
    Anjali: {
      lane: 'Volume Lane (Remote)',
      focus: 'Fast cut-downs, standard reels, stories & repurposing',
      rule: 'Cloud-only links (Zero WhatsApp transfers). Every export passes Tech-QC.',
    },
  };

  const currentStaffTasks = tasks.filter((t) => t.assignee === selectedStaff);
  const activeTasksCount = currentStaffTasks.filter((t) => t.status === 'in_progress').length;

  const handleStatusChange = async (taskId: string, newStatus: TaskItem['status']) => {
    // Enforce 2 open tasks limit
    if (newStatus === 'in_progress' && activeTasksCount >= 2) {
      alert('Limit reached: Maximum 2 open tasks allowed per person at a time! Complete or pause an active task first.');
      return;
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await fetch('/api/sphere-os/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status: newStatus }),
      });
    } catch (err) {
      console.warn('Failed to sync task status to server:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Help / SOP Modal */}
      {activeHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">AI Assistant & SOP Helper</h3>
              </div>
              <button
                onClick={() => setActiveHelpModal(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-2">
              <div className="font-semibold text-rose-300">Task: {activeHelpModal.title}</div>
              <p className="text-slate-300">
                <strong>If in doubt, do this:</strong> {activeHelpModal.brief.defaultRule}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                One-Page SOP Checklist:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {activeHelpModal.brief.sopChecklist.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  handleStatusChange(activeHelpModal.id, 'in_progress');
                  setActiveHelpModal(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold"
              >
                Apply AI Recommendation & Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Selector Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">
            Staff Portal • Focus Mode
          </span>
          <h1 className="text-lg font-bold text-white tracking-tight">"My Day" — Today's 3 Tasks</h1>
          <p className="text-xs text-slate-400">
            No noise, no WhatsApp chaos. Briefs, references, and 1-tap progress buttons.
          </p>
        </div>

        {/* Staff Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['Saakshi', 'Riddhi', 'Anjali'] as const).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedStaff(name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStaff === name
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Role Profile Info Card */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center gap-2">
            <strong className="text-white text-sm">{selectedStaff}</strong>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
              {staffRoleMap[selectedStaff].lane}
            </span>
          </div>
          <p className="text-slate-400 mt-1">{staffRoleMap[selectedStaff].focus}</p>
        </div>

        <div className="sm:text-right">
          <div className="text-[11px] text-amber-400 flex items-center sm:justify-end gap-1">
            <Clock className="w-3.5 h-3.5" /> {staffRoleMap[selectedStaff].rule}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Active Load: <strong className="text-white">{activeTasksCount} / 2 open tasks</strong>
          </div>
        </div>
      </div>

      {/* Task Cards List (Max 3 Tasks per day) */}
      <div className="space-y-4">
        {currentStaffTasks.length === 0 ? (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-8 text-center text-xs text-slate-400">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            No open tasks for {selectedStaff} today. Capacity buffer protected!
          </div>
        ) : (
          currentStaffTasks.map((task) => {
            const isSopOpen = expandedSop === task.id;
            return (
              <div
                key={task.id}
                className={`bg-slate-900/80 border rounded-2xl p-5 transition-all space-y-4 ${
                  task.status === 'done'
                    ? 'border-emerald-500/40 opacity-75'
                    : task.status === 'in_progress'
                    ? 'border-rose-500/50 shadow-lg shadow-rose-950/20'
                    : 'border-slate-800'
                }`}
              >
                {/* Header: Client & Due Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold text-xs">
                      {task.clientName}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                      {task.type}
                    </span>
                    <span className="text-[11px] text-slate-500">• {task.effortPoints} Effort Pts</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-300">Due: <strong>{task.dueTime}</strong></span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        task.status === 'done'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : task.status === 'in_progress'
                          ? 'bg-rose-500/20 text-rose-400 animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{task.title}</h3>
                </div>

                {/* Smart Brief Box (Hinglish / Gujlish) */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/60 pb-2">
                    <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Smart Brief ({task.brief.language})
                    </span>
                    <span>AI Brand Brain Grounded</span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{task.brief.summary}</p>

                  {/* Hook and CTA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-bold uppercase text-amber-400 block mb-1">
                        First 3-Sec Hook:
                      </span>
                      <p className="text-slate-300 italic">{task.brief.hook3Sec}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-bold uppercase text-rose-400 block mb-1">
                        Target CTA:
                      </span>
                      <p className="text-slate-300">{task.brief.cta}</p>
                    </div>
                  </div>

                  {/* References & "If In Doubt" Rule */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px]">References:</span>
                      {task.brief.referenceLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px] underline"
                        >
                          <span>Ref #{idx + 1}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>

                    <div className="text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-500/20">
                      <strong>If in doubt:</strong> {task.brief.defaultRule}
                    </div>
                  </div>
                </div>

                {/* SOP Accordion */}
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSop(isSopOpen ? null : task.id)}
                    className="w-full px-4 py-2 bg-slate-950/40 flex items-center justify-between text-xs text-slate-300 hover:bg-slate-900 transition-colors"
                  >
                    <span className="font-semibold flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      Technical SOP Checklist ({task.brief.sopChecklist.length} checks)
                    </span>
                    {isSopOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isSopOpen && (
                    <div className="p-3 bg-slate-950/60 divide-y divide-slate-800/60 text-xs">
                      {task.brief.sopChecklist.map((sop, idx) => (
                        <div key={idx} className="py-1.5 first:pt-0 last:pb-0 flex items-center gap-2 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{sop}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* The 3 Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {task.status !== 'in_progress' ? (
                      <button
                        onClick={() => handleStatusChange(task.id, 'in_progress')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 text-rose-400" />
                        <span>Start Working</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(task.id, 'todo')}
                        className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Pause Task</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleStatusChange(task.id, 'done')}
                      disabled={task.status === 'done'}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        task.status === 'done'
                          ? 'bg-emerald-600/30 text-emerald-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{task.status === 'done' ? 'Completed (Tech-QC)' : 'Done & Submit'}</span>
                    </button>
                  </div>

                  {/* Need Help Button */}
                  <button
                    onClick={() => setActiveHelpModal(task)}
                    className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Need Help?</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
