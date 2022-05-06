// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const sidebarConfig = [
  {
    title: 'Admin',
    path: '/dashboard/admin',
    icon: getIcon('mdi:shield-account')
  },
  {
    title: 'Client',
    path: '/dashboard/client',
    icon: getIcon('mdi:account-tie-voice')
  },
  {
    title: 'Staff',
    path: '/dashboard/staff',
    icon: getIcon('mdi:account-tie')
  },
  {
    title: 'Student Help',
    path: '/dashboard/mainform',
    icon: getIcon('mdi:account-tie')
  }

];

export default sidebarConfig;
