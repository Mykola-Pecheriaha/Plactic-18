'use client';

import React, { useState } from 'react';
import { MessageCircle, HelpCircle, Send, Heart } from 'lucide-react';
import styles from './BlogComments.module.css';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  isQuestion: boolean;
  response?: string;
  type: 'blog' | 'consultation';
  postSlug?: string;
}

interface BlogCommentsProps {
  postSlug: string;
}

export default function BlogComments({ postSlug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: '',
    isQuestion: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const comment: Comment = {
        id: Date.now().toString(),
        ...newComment,
        createdAt: new Date().toISOString(),
        type: newComment.isQuestion ? 'consultation' : 'blog',
        postSlug: postSlug
      };

      // Якщо це запитання до лікаря, додаємо його до консультацій
      if (newComment.isQuestion) {
        const response = await fetch('/api/admin/consultations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newComment.name,
            email: newComment.email,
            message: newComment.content,
            source: `blog-${postSlug}`,
            status: 'pending'
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Failed to submit consultation');
        }

        const consultationData = await response.json();
        console.log('Consultation created:', consultationData);
      }

      // Додаємо коментар до локального стану
      setComments(prev => [comment, ...prev]);
      
      // Очищаємо форму
      setNewComment({
        name: '',
        email: '',
        content: '',
        isQuestion: false
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Виникла помилка при надсиланні. Спробуйте ще раз.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <MessageCircle className="inline-block mr-2" />
        Коментарі та запитання
      </h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Ім&apos;я</label>
          <input
            type="text"
            id="name"
            value={newComment.name}
            onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
            className={styles.input}
            placeholder="Введіть ваше ім'я"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={newComment.email}
            onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
            className={styles.input}
            placeholder="Введіть ваш email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.label}>Ваш коментар</label>
          <textarea
            id="content"
            value={newComment.content}
            onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
            className={styles.textarea}
            placeholder="Напишіть ваш коментар або запитання"
            required
          />
        </div>

        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={newComment.isQuestion}
              onChange={(e) => setNewComment(prev => ({ ...prev, isQuestion: e.target.checked }))}
              className={styles.checkbox}
            />
            <HelpCircle className="inline-block" size={20} />
            Це запитання до лікаря
          </label>
        </div>

        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Надсилання...'
          ) : (
            <>
              <Send className="inline-block mr-2" size={20} />
              Надіслати
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <p className={styles.successMessage}>
            {newComment.isQuestion 
              ? 'Ваше запитання успішно надіслано! Очікуйте відповіді лікаря.'
              : 'Ваш коментар успішно додано!'}
          </p>
        )}
        {submitStatus === 'error' && (
          <p className={styles.errorMessage}>
            {errorMessage}
          </p>
        )}
      </form>

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>
            <MessageCircle className="inline-block mr-2" />
            Поки що немає коментарів. Будьте першим!
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={`${styles.comment} ${comment.isQuestion ? styles.questionComment : ''}`}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.name}</span>
                <span className={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleDateString('uk-UA')}
                </span>
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
              {comment.isQuestion && (
                <div className={styles.questionBadge}>
                  <HelpCircle size={16} />
                  Запитання до лікаря
                </div>
              )}
              {comment.response && (
                <div className={styles.response}>
                  <strong>
                    <MessageCircle className="inline-block mr-2" size={16} />
                    Відповідь лікаря:
                  </strong>
                  <p>{comment.response}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 