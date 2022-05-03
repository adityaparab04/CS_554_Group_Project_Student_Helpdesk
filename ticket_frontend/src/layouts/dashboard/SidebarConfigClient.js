// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const sidebarConfigClient = [
  {
    title: 'Client',
    path: '/dashboard/client',
    icon: getIcon('mdi:account-tie-voice')
  },
];

export default sidebarConfigClient;
