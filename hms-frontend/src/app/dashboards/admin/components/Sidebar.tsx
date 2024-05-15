import React from 'react';
import Link from 'next/link';

const SideBar: React.FC = () => {
  return (
    <aside className="bg-blue-700 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/admin/employees">Employee Management</Link>
        </li>
        <li>
          <Link href="/admin/roles">Role Management</Link>
        </li>
        <li>
          <Link href="/admin/patients">Patient Management</Link>
        </li>
        <li>
          <Link href="/admin/notifications">Notification Management</Link>
        </li>
        <li>
          <Link href="/admin/feedback">Feedback/Report Management</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
