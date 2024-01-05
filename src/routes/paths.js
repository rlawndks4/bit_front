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
  post: {
    root: path(ROOTS_MANAGER, '/post'),
    list: path(ROOTS_MANAGER, '/post/list'),
    add: path(ROOTS_MANAGER, '/post/add'),
  },
  brand: {
    root: path(ROOTS_MANAGER, '/brand'),
    edit: path(ROOTS_MANAGER, '/brand/edit'),
    list: path(ROOTS_MANAGER, '/brand/list'),
    design: path(ROOTS_MANAGER, '/brand/design'),
  },
};
