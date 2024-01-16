// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_MANAGER = '/manager';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/manager/login',
};

export const PATH_MANAGER = {
  root: ROOTS_MANAGER,
  user: {
    root: path(ROOTS_MANAGER, '/user'),
    list: path(ROOTS_MANAGER, '/user/list'),
    add: path(ROOTS_MANAGER, '/user/add'),
  },
  request: {
    root: path(ROOTS_MANAGER, '/request'),
    list: path(ROOTS_MANAGER, '/request/list'),
  },
  post: {
    root: path(ROOTS_MANAGER, '/post'),
    list: path(ROOTS_MANAGER, '/post/list'),
    add: path(ROOTS_MANAGER, '/post/add'),
  },
  design: {
    root: path(ROOTS_MANAGER, '/design'),
    main: path(ROOTS_MANAGER, '/design/main'),
    info: path(ROOTS_MANAGER, '/design/info'),
    program_info: path(ROOTS_MANAGER, '/design/program-info'),
    guide: path(ROOTS_MANAGER, '/design/guide'),
  },
  brand: {
    root: path(ROOTS_MANAGER, '/brand'),
    edit: path(ROOTS_MANAGER, '/brand/edit'),
    list: path(ROOTS_MANAGER, '/brand/list'),
    design: path(ROOTS_MANAGER, '/brand/design'),
  },
};
