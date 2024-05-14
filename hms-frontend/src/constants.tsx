import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboards/doctor/doctorid/dashboardpanel',
    icon: <Icon icon="material-symbols:dashboard" width="24" height="24" />,
  },
  {
    title: 'View Profile',
    path: '/dashboards/doctor/doctorid/Viewprofile',
    icon: <Icon icon="lucide:circle-user-round" width="24" height="24" />,
  },
  {
    title: 'Patient Appointments',
    path: '/dashboards/doctor/doctorid/patient-mgt-sys',
    icon: <Icon icon="healthicons:rx" width="24" height="24" />,
  },
  {
    title: 'Schedule Management',
    path: '/dashboards/doctor/doctorid/schedule-mgt',
    icon: <Icon icon="akar-icons:schedule" width="24" height="24" />,
  },
  {
    title: 'Financials',
    path: '/dashboards/doctor/doctorid/doc-financials',
    icon: <Icon icon="tabler:zoom-money-filled" width="24" height="24" />,
  },
  {
    title: 'Medicine Repository',
    path: '/dashboards/doctor/doctorid/medicine-list',
    icon: <Icon icon="mdi:medicine-bottle" width="24" height="24" />,
  },
  {
    title: 'Representive Management',
    path: '/dashboards/doctor/doctorid/rep-mgt',
    icon: <Icon icon="fluent:people-team-toolbox-20-filled" width="24" height="24" />,
  },
  {
    title: 'Representive Appointment Management',
    path: '/dashboards/doctor/doctorid/rep-apt-mgt',
    icon: <Icon icon="fluent:people-team-toolbox-20-filled" width="24" height="24" />,
  },
    // submenu: true,
    // subMenuItems: [
    //   { title: 'Account', path: '/settings/account' },
    //   { title: 'Privacy', path: '/settings/privacy' },
    // ],

  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  },
];