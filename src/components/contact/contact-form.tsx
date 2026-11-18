"use client";

import { Magnetic } from "@/components/ui/magnetic";
import { isValidEmail } from "@/lib/utils";
import { FormEvent, useState } from "react";

const topics = ["Services enquiry", "Content request", "Correction", "Partnership", "Something else"];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Add your name so we know who the note is from.");
      setDone(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter a complete email address.");
      setDone(false);
      return;
    }
    if (message.trim().length < 12) {
      setError("Give the note a little more detail.");
      setDone(false);
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <div className="border border-cyan/50 p-8" role="status">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">Preview sent</p>
        <p className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.04em]">Message staged locally.</p>
        <p className="mt-4 max-w-lg text-mist">
          Thanks, {name.trim()}. This form does not deliver mail yet. Nothing was transmitted or stored.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <label className="block">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Name</span>
        <input className="field" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
      </label>
      <label className="block">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Email</span>
        <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </label>
      <label className="block">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Topic</span>
        <select className="field bg-transparent" value={topic} onChange={(event) => setTopic(event.target.value)}>
          {topics.map((item) => (
            <option key={item} value={item} className="bg-ink">
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mist">Message</span>
        <textarea className="field min-h-32 resize-y" value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      {error && <p className="font-mono text-xs text-[#ff8b98]">{error}</p>}
      <Magnetic>
        <button type="submit" className="h-12 bg-cyan px-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-on-accent transition-opacity hover:opacity-90">
          Send note
        </button>
      </Magnetic>
    </form>
  );
}
