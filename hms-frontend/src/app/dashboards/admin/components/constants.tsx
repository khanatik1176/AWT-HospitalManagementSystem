import { Icon } from '@iconify/react';

import { SideNavItem } from '../../../../../types/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboards/admin/adminid/dashboardpanel',
    icon: <Icon icon="bx:bx-home" width="24" height="24" />,
  },
  {
    title: 'View Profile',
    path: '/dashboards/admin/adminid/Viewprofile',
    icon: <Icon icon="mdi:account" width="24" height="24" />,
  },
  {
    title: 'Doctors List',
    path: '/dashboards/admin/adminid/doctors',
    icon: <Icon icon="mdi:doctor" width="24" height="24" />,
  },
  {
    title: 'Patient List',
    path: '/dashboards/admin/adminid/patients',
    icon: <Icon icon="mdi:account-group" width="24" height="24" />,
  },
  {
    title: 'Admin List',
    path: '/dashboards/admin/adminid/admins',
    icon: <Icon icon="fa-solid:user-tie" width="24" height="24" />, // You can choose an appropriate icon for Admin List
  },
  {
    title: 'Notifications',
    path: '/dashboards/admin/adminid/notifications',
    icon: <Icon icon="bx:bx-bell" width="24" height="24" />,
  },
  {
    title: 'Feedbacks',
    path: '/dashboards/admin/adminid/feedbacks',
    icon: <Icon icon="bi:chat-right" width="24" height="24" />,
  },
  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="bi:box-arrow-right" width="24" height="24" />,
  },
];
