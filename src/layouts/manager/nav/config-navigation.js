// routes
import { PATH_MANAGER } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = () => {

  const { user } = useAuthContext();
  return [
    // GENERAL
    // ----------------------------------------------------------------------

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      items: [
        {
          title: '회원관리',
          path: PATH_MANAGER.user.root,
          icon: ICONS.user,
          children: [
            { title: '회원관리', path: PATH_MANAGER.user.list },
            { title: '회원추가', path: PATH_MANAGER.user.add },
          ],
        },
      ],
    },
    {
      items: [
        {
          title: '발신자관리',
          path: PATH_MANAGER.sender.root,
          icon: ICONS.user,
          children: [
            { title: '발신자관리', path: PATH_MANAGER.sender.list },
            { title: '발신자추가', path: PATH_MANAGER.sender.add },
          ],
        },
      ],
    },
    // {
    //   items: [
    //     {
    //       title: '게시물관리',
    //       path: PATH_MANAGER.post.root,
    //       icon: ICONS.booking,
    //       children: [
    //         { title: '게시물관리', path: PATH_MANAGER.post.list },
    //         { title: '게시물추가', path: PATH_MANAGER.post.add },

    //       ],
    //     },
    //   ],
    // },
    {
      items: [
        {
          title: '설정관리',
          path: PATH_MANAGER.brand.root,
          icon: ICONS.user,
          children: [
            { title: '기본설정', path: PATH_MANAGER.brand.edit },
          ],
        },
      ],
    },
  ];
}

export default navConfig;
