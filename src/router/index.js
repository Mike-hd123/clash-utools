import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/proxy' },
        { path: '/connet', component: () => import('@/pages/connet/index.vue') },
        { path: '/log', component: () => import('@/pages/log/index.vue') },
        { path: '/proxy', component: () => import('@/pages/proxy/index.vue') },
        { path: '/rule', component: () => import('@/pages/rule/index.vue') },
        { path: '/config', component: () => import('@/pages/config/index.vue') },
        { path: '/setting', component: () => import('@/pages/setting/index.vue') }
    ]
});

export default router;