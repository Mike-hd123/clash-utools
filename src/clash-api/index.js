import axios from 'axios'

const baseURL = 'http://127.0.0.1:2390/'
const baseSok = 'ws://127.0.0.1:2390'
const token = '1234567'

// 创建一个 axios 实例
const clash_api = axios.create({
    baseURL: baseURL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
})

const clash = {
    getTraffic: (back) => {
        const connet = new WebSocket(baseSok + '/traffic?token=' + encodeURI(token ?? ''))
        connet.addEventListener('message', back)
    },
    getLog: ({ level, back }) => {
        const connet = new WebSocket(baseSok + '/logs?level=' + (level ?? 'info') + '&token=' + encodeURI(token ?? ''))
        connet.addEventListener('message', back)
        // const back = (msg) => {
        //     const data = JSON.parse(msg.data);
        //     console.log(data);
        // };
        // window.clash.getLog({ back: back });
    },
    getVersion: async () => {
        return await clash_api.get("version")
        // window.clash.getVersion().then((obj) => {
        //     const { data: res } = obj;
        //     console.log(res.version);
        // });
    },
    getConfigs: async () => {
        return await clash_api.get("configs")
    },
    //"port": 0, 代理端口
    //"socks-port": 0, 为0使用上面的
    //"redir-port": 0, 为0使用上面的
    //"allow-lan": true,外网接入
    //"mode": "Rule", 代理模式 Global | Rule | Direct
    //"log-level": "info",日志 info | warning | error | debug
    setConfig: async ({ port, socks_port, redir_port, allow_lan, mode, log_level }) => {
        return await clash_api.patch("configs", {
            port: port ?? undefined,
            "socks-port": socks_port ?? undefined,
            "redir-port": redir_port ?? undefined,
            "allow-lan": allow_lan ?? undefined,
            mode: mode ?? undefined,
            "log-level": log_level ?? undefined
        })
    },
    update: ({ force, path }) => {
        //force是否改变端口
        clash_api.put("configs?force=" + (force ?? 'false'), {
            "path": path
        })
    },
    getRules: async () => {
        return await clash_api.get("rules")
    },
    getProxy: async () => {
        return await clash_api.get("proxies")
        //取出值
        // const {
        //   data: { proxies: res },
        // } = await window.clash.getProxy();
        // console.log(res);
        // for (let key in res) {
        //   if (res[key].history.length === 0) console.log(key);
        // }
    },
    getNodeInfo: async (node) => {
        return await clash_api.get("proxies/" + node)
        // const { data: res } = await window.clash.getNodeInfo("GLaDOS-N2-00");
        // console.log(res);
    },
    getNodeTest: async ({ node, time_out, test_url }) => {
        return await clash_api.get("proxies/" + node + "/delay?timeout=" + (time_out ?? "3000") + "&url=" + (test_url ?? 'http://www.google.com'))
        // const { data: res } = await window.clash.getNodeTest({
        //     node: "GLaDOS-N2-00",
        // });
    },
    setProxyNode: async (name, child) => {
        return await clash_api.put("proxies/" + encodeURI(name), { name: child })
        // window.clash.setProxyNode(
        //     "🚀 节点选择",
        //     "GLaDOS-N2-00"
        // );
    },
    getProvider: async () => {
        return await clash_api.get("providers/proxies")
    },
    setProvider: async (name) => {
        return await clash_api.put("providers/proxies/" + name)
    },
    getProviderInfo: async (name) => {
        return await clash_api.get("providers/proxies/" + name)
    },
    getProviderHeal: async (name) => {
        return await clash_api.get("providers/proxies/" + name + "/healthcheck")
    },
    getConnet: async () => {
        return await clash_api.get("connections")
    },
    closeAllConnet: async () => {
        clash_api.delete("connections")
    },
    closeConnet: async (id) => {
        clash_api.delete("connections/" + id)
    }
}


export default clash