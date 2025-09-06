import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboards/patient/patientid/dashboardpanel',
    icon: <Icon icon="material-symbols:dashboard" width="24" height="24" />,
  },
  {
    title: 'View Profile',
    path: '/dashboards/patient/patientid/Viewprofile',
    icon: <Icon icon="lucide:circle-user-round" width="24" height="24" />,
  },
  {
    title: 'Appointments',
    path: '/dashboards/patient/patientid/appointment',
    icon: <Icon icon="lucide:timer" width="24" height="24" />,
  },
  {
    title: 'FeedBack',
    path: '/dashboards/patient/patientid/feedback',
    icon: <Icon icon="material-symbols:feedback-outline" width="24" height="24" />,
  },
  {
    title: 'Health Tracker',
    path: '/dashboards/patient/patientid/healthTracker',
    icon: <Icon icon="material-symbols:health-metrics" width="24" height="24" />,
  },
  {
    title: 'Medical Records',
    path: '/dashboards/patient/patientid/medicalRecords',
    icon: <Icon icon="vaadin:records" width="24" height="24" />,
  },
  {
    title: 'Symptom Checker',
    path: '/dashboards/patient/patientid/symptomChecker',
    icon: <Icon icon="healthicons:symptom" width="24" height="24" />,
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