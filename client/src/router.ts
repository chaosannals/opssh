import {
    RouteRecordRaw,
    createRouter,
    createWebHistory,
} from "vue-router";
import { kebabCase } from 'lodash';
import { apiTouchAgain, apiValidate } from "./utils/http";
import * as IndexMeta from './pages/IndexPage';
import EmbedRouteLayout from './layouts/EmbedRouteLayout.vue';

function routePages(): RouteRecordRaw[] {
    const result: RouteRecordRaw[] = [
        {
            path: '/',
            component: () => import("./pages/IndexPage.vue"),
            meta: IndexMeta,
        }
    ];

    const metas = import.meta.glob('./pages/**/*Page.ts', { eager: true });
    const pages = import.meta.glob('./pages/**/*Page.vue');
    for (const p of Object.keys(pages)) {
        const m = p.match(/.\/pages\/(.*)Page\.vue/);
        if (m && m[1] != 'Login' && m[1] != 'Enter') {
            const prefix = p.substring(0, p.length - 4);
            const mp = `${prefix}.ts`;
            const n = m[1]
                .split('/')
                .map(i => kebabCase(i))
                .join('/');
            result.push({
                path: `/${n}`,
                alias: `/${n}.html`, // 调试服务器别名带后缀不可用，编译后是正常的。
                component: pages[p],
                meta: metas[mp] as any,
            });
        }
    }
    console.log('routes', result);
    return result;
}

export const routes = routePages();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: EmbedRouteLayout,
            children: routes,
        }, {
            path: '/login',
            alias: '/login.html',
            component: () => import('./pages/LoginPage.vue'),
        }, {
            path: '/enter',
            alias: '/enter.html',
            component: () => import('./pages/EnterPage.vue'),
        },
    ],
});

router.beforeEach(async (to) => {
    if (await apiTouchAgain()) {
        if (to.path != '/login' && await apiValidate()) {
            return { path: '/login' };
        }
    } else {
        if (to.path != '/enter') {
            console.log('enter');
            return { path: '/enter' };
        }
    }

    if (to.meta?.title) {
        document.title = to.meta.title as string;
    }
});

export default router;