"use client"
// app/page.tsx
import dynamic from 'next/dynamic';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import LoginComponent from './components/Login';
import useAuthStore from '../../authStore';
import ImportHealthDataButton from './components/ImportHealthData'
import Calendar from '@/app/components/Calendar'
import { useEffect } from 'react'
const MyCalendar = dynamic(() => import('@/app/components/Calendar'), { ssr: false });

export default function Home() {
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const user = useAuthStore((state) => state.user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Chat Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let calendar tell you what to do today instead of you telling it.
        </p>
        <LoginComponent />
      </header>
      {user && (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ImportHealthDataButton />
          <MyCalendar />
        </div>
      )}
      <footer className="mt-12 text-gray-600 dark:text-gray-400">
        <p>
          Built with <a href="https://nextjs.org" className="text-blue-500 dark:text-blue-400 hover:underline">Vercel</a> and <a href="https://github.com/nhn/toast-ui.react-calendar" className="text-blue-500 dark:text-blue-400 hover:underline">Gemini</a>.
        </p>
      </footer>
    </main>
  );
}
