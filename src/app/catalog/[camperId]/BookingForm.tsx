'use client';

import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bookCamper } from '@/lib/api';
import styles from './BookingForm.module.css';

interface FormErrors {
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letters (incl. Cyrillic), spaces, hyphens and apostrophes only — no digits/symbols.
const NAME_RE = /^[A-Za-zА-Яа-яЇїІіЄєҐґ'’-]+(\s[A-Za-zА-Яа-яЇїІіЄєҐґ'’-]+)*$/;


export default function BookingForm({ camperId }: { camperId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: bookCamper,
    onSuccess: () => {
      toast.success('Booking successful! We will contact you shortly.');
      setName('');
      setEmail('');
      setErrors({});
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = name.trim();

    if (!trimmedName) {
      nextErrors.name = 'Please enter your name.';
    } else if (!NAME_RE.test(trimmedName)) {
      nextErrors.name = 'Please enter your full name.';
    } else if (trimmedName.split(/\s+/).filter(Boolean).length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (!EMAIL_RE.test(email.trim())) {
      nextErrors.email = 'Please enter your email.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    mutation.mutate({
      name: name.trim(),
      email: email.trim(),
      camperId,
    });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? styles.inputError : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.inputError : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <button type="submit" className="btn" disabled={mutation.isPending}>
          {mutation.isPending ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  );
}