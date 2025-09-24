export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      { icon: 'table', path: '/admin/card', component: './Admin/Card', name: '卡片管理' },
      { icon: 'table', path: '/admin/cardset', component: './Admin/CardSet', name: '卡片集管理' },
      { icon: 'table', path: '/admin/studyplan', component: './Admin/StudyPlan', name: '学习计划管理' },
      { icon: 'table', path: '/admin/reviewrecordlog', component: './Admin/ReviewRecordLog', name: '复习记录管理' },
      { icon: 'table', path: '/admin/usercardset', component: './Admin/UserCardSet', name: '用户卡片集关系管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
