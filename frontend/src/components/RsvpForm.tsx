import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCRIPT_URL = import.meta.env.VITE_RSVP_SCRIPT_URL ?? '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function RsvpForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const canSubmit = name.trim() !== '' && attending !== null && status !== 'submitting';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus('submitting');

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          timestamp: new Date().toISOString(),
        }),
      });

      // Google Apps Script returns opaque response with no-cors,
      // so we assume success if no network error was thrown.
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rsvp-form mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 py-8"
          >
            <p className="font-display text-3xl text-accent">Thank You</p>
            <p className="text-bone/70 text-sm">
              {attending
                ? 'We look forward to seeing you there.'
                : 'We\u2019re sorry to miss you. Thank you for letting us know.'}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="rsvp-name"
                className="block text-xs uppercase tracking-[0.4em] text-bone/60"
              >
                Your Name
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="rsvp-input w-full"
              />
            </div>

            {/* Attending toggle */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-bone/60">
                Will You Attend?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`rsvp-toggle ${attending === true ? 'rsvp-toggle--active' : ''}`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`rsvp-toggle ${attending === false ? 'rsvp-toggle--active' : ''}`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="rsvp-submit"
            >
              {status === 'submitting' ? (
                <span className="inline-flex items-center gap-2">
                  <span className="rsvp-spinner" />
                  Sending&hellip;
                </span>
              ) : (
                'Send RSVP'
              )}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
