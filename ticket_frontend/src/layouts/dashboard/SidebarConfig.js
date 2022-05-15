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
];

export default sidebarConfig;
