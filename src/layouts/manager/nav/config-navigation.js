// routes
import { PATH_MANAGER } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { useAuthContext } from 'src/auth/useAuthContext';
import { postTypeList } from 'src/utils/format';
import { Icon } from '@iconify/react';

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
          icon: <Icon icon="mdi:user-outline" style={{ fontSize: '1.5rem' }} />,
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
          title: '디자인관리',
          path: PATH_MANAGER.design.root,
          icon: <Icon icon="material-symbols:design-services-outline-rounded" style={{ fontSize: '1.5rem' }} />,
          children: [
            { title: '메인페이지관리', path: PATH_MANAGER.design.main },
            { title: '회사소개관리', path: PATH_MANAGER.design.info },
            { title: '프로그램소개관리', path: PATH_MANAGER.design.program_info },
            { title: '이용절차 및 상품안내 관리', path: PATH_MANAGER.design.guide },
          ],
        },
      ],
    },
    ...(postTypeList.map((post_type => {
      return {
        items: [
          {
            title: `${post_type.label}관리`,
            path: PATH_MANAGER.post.root + `/${post_type.value}`,
            icon: <Icon icon={post_type.icon} style={{ fontSize: '1.5rem' }} />,
            children: [
              { title: `${post_type.label}관리`, path: PATH_MANAGER.post.root + `/${post_type.value}/list` },
              { title: `${post_type.label}추가`, path: PATH_MANAGER.post.root + `/${post_type.value}/add` },
            ],
          },
        ],
      }
    }))),
    {
      items: [
        {
          title: '문의관리',
          path: PATH_MANAGER.request.root,
          icon: <Icon icon="mdi:user-outline" style={{ fontSize: '1.5rem' }} />,
          children: [
            { title: '문의관리', path: PATH_MANAGER.request.list },
          ],
        },
      ],
    },
    {
      items: [
        {
          title: '설정관리',
          path: PATH_MANAGER.brand.root,
          icon: <Icon icon="uil:setting" style={{ fontSize: '1.5rem' }} />,
          children: [
            { title: '기본설정', path: PATH_MANAGER.brand.edit },
          ],
        },
      ],
    },
  ];
}

export default navConfig;
