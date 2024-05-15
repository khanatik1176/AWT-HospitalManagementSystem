import { Icon } from '@iconify/react';

import { SideNavItem } from '@/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboards/admin/adminid/dashboardpanel',
    icon: <Icon icon="material-symbols:dashboard" width="24" height="24" />,
  },
  {
    title: 'View Profile',
    path: '/dashboards/admin/adminid/Viewprofile',
    icon: <Icon icon="lucide:circle-user-round" width="24" height="24" />,
  },
  {
    title: 'Doctors List',
    path: '/dashboards/admin/adminid/doctors',
    icon: <Icon icon="healthicons:rx" width="24" height="24" />,
  },
  {
    title: 'Patient List',
    path: '/dashboards/admin/adminid/patients',
    icon: <Icon icon="akar-icons:schedule" width="24" height="24" />,
  },
  {
    title: 'Notifications',
    path: '/dashboards/admin/adminid/notifications',
    icon: <Icon icon="tabler:zoom-money-filled" width="24" height="24" />,
  },
  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  },
];