// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const sidebarConfigStaff = [
  {
    title: 'Staff',
    path: '/dashboard/staff',
    icon: getIcon('mdi:account-tie')
  }
];

export default sidebarConfigStaff;
