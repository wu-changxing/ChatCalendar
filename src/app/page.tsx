"use client";

import dynamic from 'next/dynamic';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const MyCalendar = dynamic(() => import('@/app/components/Calendar'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Chat Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let calendar tell you what to do today instead of you telling it.
        </p>
      </header>
      
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <MyCalendar />
      </div>
      
      <footer className="mt-12 text-gray-600 dark:text-gray-400">
        <p>
          Built with <a href="https://nextjs.org" className="text-blue-500 dark:text-blue-400 hover:underline">Next.js</a> and <a href="https://github.com/nhn/toast-ui.react-calendar" className="text-blue-500 dark:text-blue-400 hover:underline">TOAST UI Calendar</a>.
        </p>
      </footer>
    </main>
  );
}
