import React from 'react';
import { BookOpen, Map, Settings, Calendar, FileText, Globe } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="p-4 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <BookOpen className="text-[#EB0005] w-8 h-8" />
          Admin User Manual
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome to the Abdur Rehman Auto Garage Admin Dashboard. This guide will help you understand how to manage your website effectively.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Dashboard Overview */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Map className="text-blue-500 w-5 h-5" />
            1. Dashboard Overview
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            The main dashboard provides a quick snapshot of your entire business operations.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
            <li><strong>Stats Cards:</strong> View total bookings, active services, and published articles at a glance.</li>
            <li><strong>Recent Activity:</strong> Quick tables showing the 5 most recent bookings, services, and posts.</li>
          </ul>
        </section>

        {/* Section 2: Work Orders */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="text-red-500 w-5 h-5" />
            2. Managing Work Orders (Bookings)
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            All customer appointments created through the website contact form appear here.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
            <li><strong>Updating Status:</strong> Use the dropdown in the 'Status' column to change an appointment to Pending (Yellow), Confirmed (Green), or Cancelled (Red).</li>
            <li><strong>Filtering & Searching:</strong> Use the top search bar to find customers by name or email, and the filter dropdown to quickly list 'Pending' or 'Confirmed' jobs.</li>
            <li><strong>Deleting:</strong> Clicking delete will permanently remove the booking record.</li>
          </ul>
        </section>

        {/* Section 3: Posts */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="text-green-500 w-5 h-5" />
            3. Story & Blog Posts
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Manage your company's news, blogs, and journey stories.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
            <li><strong>Creating a Post:</strong> Click "New Post" at the top right. You can add titles, images, categories, and content.</li>
            <li><strong>Publishing:</strong> Set the status to <strong>Published</strong> to make it instantly visible on the public website. Keep it as Draft if you aren't ready yet.</li>
          </ul>
        </section>

        {/* Section 4: Services */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="text-purple-500 w-5 h-5" />
            4. Managing Services
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Update the pricing, descriptions, and activation states of the services you offer.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
            <li><strong>Active Toggle:</strong> To temporarily disable a service from showing on the website, simply change its state to Hidden.</li>
            <li><strong>Editing Details:</strong> Update the price, category, or description securely from the Edit option.</li>
          </ul>
        </section>

        {/* Section 5: SEO and Sitemap */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="text-teal-500 w-5 h-5" />
            5. Update Sitemap (SEO)
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            The sitemap helps search engines like Google discover your pages.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
            <li>Whenever you add a entirely new Service or write a completely new Blog Post, click the <strong>Update Sitemap</strong> button in the bottom left sidebar.</li>
            <li>This instantly clears the cached data and refreshes your SEO infrastructure so search bots index your new additions quickly.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
