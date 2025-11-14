'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch initial content
    fetch('/api/clipboard')
      .then(res => res.json())
      .then(data => {
        setContent(data.content || '');
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching clipboard:', err);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to save after 500ms of no typing
    timeoutRef.current = setTimeout(() => {
      fetch('/api/clipboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      }).catch(err => console.error('Error saving clipboard:', err));
    }, 500);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <div style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500 }}>Shared Clipboard</h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          Type or paste text - it auto-saves and syncs across all devices
        </p>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        disabled={isLoading}
        placeholder={isLoading ? 'Loading...' : 'Start typing or paste your text here...'}
        style={{
          flex: 1,
          width: '100%',
          padding: '1.5rem',
          fontSize: '1rem',
          lineHeight: '1.6',
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
