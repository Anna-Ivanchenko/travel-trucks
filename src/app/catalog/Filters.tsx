'use client';

import { useState } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import type { CamperFilters, CamperForm, Engine, Transmission } from '@/lib/types';
import styles from './Filters.module.css';

interface FilterProps {
  initialFilters: CamperFilters;
  onSearch: (filters: CamperFilters) => void;
  onClear: () => void;
}

const FORM_OPTIONS: { value: CamperForm; label: string }[] = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panel_van', label: 'Panel Van' },
  { value: 'integrated', label: 'Integrated' },
  { value: 'semi_integrated', label: 'Semi Integrated' }
];

const ENGINE_OPTIONS: { value: Engine; label: string }[] = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSION_OPTIONS: { value: Transmission; label: string }[] = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

export default function Filters({ initialFilters, onSearch, onClear }: FiltersProps) {
  const [location, setLocation] = useState(initialFilters.location ?? '');
  const [form, setForm] = useState<CamperForm | undefined>(initialFilters.form);
  const [engine, setEngine] = useState<Engine | undefined>(initialFilters.engine);
  const [transmission, setTransmission] = useState<Transmission | undefined>(
    initialFilters.transmission
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location: location.trim() || undefined, form, engine, transmission });
  };

  const handleClear = () => {
    setLocation('');
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onClear();
  };

  const radioGroup = <T extends string>(
    name: string,
    value: T | undefined,
    setValue: (v: T | undefined) => void,
    options: { value: T; label: string }[]
  ) =>
    options.map((opt) => (
      <label key={opt.value} className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          checked={value === opt.value}
          onChange={() => setValue(opt.value)}
        />
        {opt.label}
      </label>
    ));

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>Location</label>
        <div className={styles.inputWrap}>
          <FiMapPin aria-hidden />
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <h2 className={styles.heading}>Filters</h2>

      <fieldset className={styles.group}>
        <legend className={styles.groupLabel}>Vehicle type</legend>
        {radioGroup('form', form, setForm, FORM_OPTIONS)}
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupLabel}>Engine</legend>
        {radioGroup('engine', engine, setEngine, ENGINE_OPTIONS)}
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.groupLabel}>Transmission</legend>
        {radioGroup('transmission', transmission, setTransmission, TRANSMISSION_OPTIONS)}
      </fieldset>

      <button type="submit" className={`btn ${styles.searchBtn}`}>
        Search
      </button>
      <button type="button" className={`btn btnOutline ${styles.clearBtn}`} onClick={handleClear}>
        <FiX aria-hidden /> Clear filters
      </button>
    </form>
  );
}