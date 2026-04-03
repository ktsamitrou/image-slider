"use client";

import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Alice",
    text: "Love the Forest Path shot – the lighting is incredible!",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Bob",
    text: "Desert Dunes has such a serene feel. Great collection.",
    timestamp: "1 hour ago",
  },
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();
    if (!trimmedAuthor || !trimmedText) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: trimmedAuthor,
        text: trimmedText,
        timestamp: "just now",
      },
    ]);
    setAuthor("");
    setText("");
  };

  return (
    <section aria-label="Comments">
      <h2 className="mb-4 text-base font-semibold text-white">Comments</h2>

      {/* Comment list */}
      <ul className="mb-6 space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3">
            {/* Avatar placeholder */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {c.author[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-white">
                  {c.author}
                </span>
                <span className="text-xs text-gray-500">{c.timestamp}</span>
              </div>
              <p className="mt-0.5 text-sm text-gray-300">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none sm:w-40"
          maxLength={50}
          required
        />
        <input
          type="text"
          placeholder="Add a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          maxLength={300}
          required
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Post
        </button>
      </form>
    </section>
  );
}
