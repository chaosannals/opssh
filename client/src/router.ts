import {
    RouteRecordRaw,
    createRouter,
    createWebHistory,
} from "vue-router";
import { isEmpty, kebabCase } from 'lodash';
import { useAuthStore } from "./stores/AuthStore";
import { apiTouch } from "./utils/http";

function routePages(): RouteRecordRaw[] {
    const result: RouteRecordRaw[] = [
        {
            path: '/',
            component: () => import("./pages/IndexPage.vue"),
        }
    ];
    const pages = import.meta.glob('./pages/**/*Page.vue');
    for (const p of Object.keys(pages)) {
        const m = p.match(/.\/pages\/(.*)Page\.vue/);
        if (m) {
            const n = m[1]
                .split('/')
                .map(i => kebabCase(i))
                .join('/');
            result.push({
                path: `/${n}`,
                alias: `/${n}.html`, // 调试服务器别名带后缀不可用，编译后是正常的。
                component: pages[p],
            });
        }
    }
    console.log('routes', result);
    return result;
}

export const routes = routePages();

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(async (to) => {
    const auth = useAuthStore();
    
    if (auth.able) {
        if (to.path != '/login' && isEmpty(auth.token)) {
            return { path: '/login' };
        }
    } else {
        if (to.path != '/enter') {
            if (await apiTouch()) {
                auth.able = true;
                console.log('able', auth.able);
            } else {
                console.log('enter');
                return { path: '/enter' };
            }
        }
    }
});

export default router;