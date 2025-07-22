'use client'

import { FC, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ui/ThemeToggle'
import styles from './Header.module.css'
import { hotkeyManager } from '@/lib/hotkeys'
import ServicesDropdown from './ServicesDropdown'

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false)
  const servicesMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node) &&
        isServicesMenuOpen
      ) {
        setIsServicesMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Реєструємо гарячу клавішу для Escape з низьким пріоритетом
    hotkeyManager.register({
      key: 'Escape',
      priority: -1, // Низький пріоритет для закриття меню
      callback: () => {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false)
        }
        if (isServicesMenuOpen) {
          setIsServicesMenuOpen(false)
        }
      },
    })

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      hotkeyManager.unregister('Escape')
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen, isServicesMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isServicesMenuOpen) setIsServicesMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsServicesMenuOpen(false)
  }

  const toggleServicesMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsServicesMenuOpen(!isServicesMenuOpen)
  }

  const closeServicesMenu = () => {
    setIsServicesMenuOpen(false)
  }

  return (
    <>
      <div className={styles.topHeader} role="banner">
        <div>
          <div className={styles.contactInfo}>
            <a href="tel:+380507575411" className={styles.contactLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +380 (50) 757-54-11
            </a>
            <a href="mailto:Pecheryag@gmail.com" className={styles.contactLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Pecheryag@gmail.com
            </a>
            <span className={styles.contactLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Пн-Пт: 9:00-16:00
            </span>
            <span className={styles.contactLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              м. Чернівці, вул. Героїв Майдану, 226
            </span>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/plastic_p_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <header className={styles.mainHeader} role="navigation">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            Plastic P
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink} onClick={closeMobileMenu}>
              Головна
            </Link>
            <div className={styles.servicesNavItem} ref={servicesMenuRef}>
              <button
                className={`${styles.navLink} ${styles.servicesButton} ${
                  isServicesMenuOpen ? styles.active : ''
                }`}
                onClick={toggleServicesMenu}
                aria-expanded={isServicesMenuOpen}
                aria-haspopup="true"
              >
                Послуги
              </button>
              <ServicesDropdown
                isOpen={isServicesMenuOpen}
                onClose={closeServicesMenu}
              />
            </div>
            <Link
              href="/about-doctor"
              className={styles.navLink}
              onClick={closeMobileMenu}
            >
              Про лікаря
            </Link>
            <Link
              href="/contacts"
              className={styles.navLink}
              onClick={closeMobileMenu}
            >
              Контакти
            </Link>
            <Link
              href="/blog"
              className={styles.navLink}
              onClick={closeMobileMenu}
            >
              Блог
            </Link>
          </nav>
          <ThemeToggle />
          <button
            className={styles.burgerButton}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Відкрити меню"
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Мобільне меню */}
      <div
        className={`${styles.overlay} ${
          isMobileMenuOpen ? styles.overlayVisible : ''
        }`}
        onClick={closeMobileMenu}
        role="presentation"
      />
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
      >
        <div className={styles.mobileContactInfo}>
          <a
            href="tel:+380507575411"
            className={styles.contactLink}
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +380 (50) 757-54-11
          </a>
          <a
            href="mailto:Pecheryag@gmail.com"
            className={styles.contactLink}
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Pecheryag@gmail.com
          </a>
          <span className={styles.contactLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Пн-Пт: 9:00-16:00
          </span>
          <span className={styles.contactLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            м. Чернівці, вул. Героїв Майдану, 226
          </span>
        </div>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.navLink} onClick={closeMobileMenu}>
            Головна
          </Link>
          <div className={styles.mobileServicesNavItem}>
            <button
              className={`${styles.navLink} ${styles.servicesButton}`}
              onClick={toggleServicesMenu}
              aria-expanded={isServicesMenuOpen}
              aria-haspopup="true"
            >
              Послуги
            </button>
            <ServicesDropdown
              isOpen={isServicesMenuOpen}
              onClose={closeServicesMenu}
            />
          </div>
          <Link
            href="/about-doctor"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Про лікаря
          </Link>
          <Link
            href="/contacts"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Контакти
          </Link>
          <Link
            href="/blog"
            className={styles.navLink}
            onClick={closeMobileMenu}
          >
            Блог
          </Link>
        </nav>
        <div className={styles.mobileSocialLinks}>
          <a
            href="https://www.instagram.com/plastic_p_/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
