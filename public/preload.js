const cp = require('child_process')

var isFirst = true

window.start = function () {
    window.isUtools = true
    const base_path = utools.getPath("userData") + "\\clash\\"
    const path_config = base_path + 'clash-configs'
    const path = base_path + 'clash-win64.exe'
    const pass = '1234567'
    cp.exec("tasklist|findstr clash-win64.exe", (err, res, stderr) => {
        if (res.length === 0) {
            cp.exec(path + ' -d ' + path_config + ' -secret ' + pass)
            console.log("服务已启动!");
            window.startProxy()
        } else {
            console.log("服务已存在!");
        }
    })
    utools.onPluginOut((processExit) => {
        if (processExit) {
            window.end();
        }
    });
    window.updata();
}

window.end = function () {
    cp.exec("taskkill /f /im clash-win64.exe")
    window.endProxy()
    alert("服务已关闭!")
}

window.updata = function () {
    if (isFirst) {
        setInterval(window.updata, 3600000)
        isFirst = false
    }
    //获取使用中的订阅地址
    const res = utools.db.allDocs("clash");
    var base_url = '';
    res[0]?.data?.forEach((element) => {
        if (utools.dbStorage.getItem(element + ":use")) {
            base_url += utools.dbStorage.getItem(element + ":url") + '|';
        }
    });
    if (base_url !== '') {
        base_url = encodeURIComponent(base_url.substring(0, base_url.length - 1));
        const url = 'https://sub.xeton.dev/sub?target=clash&new_name=true&url=' + base_url + '&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online_Mini.ini&emoji=true&list=false&tfo=false&scv=false&fdn=false&sort=false'
        const file = utools.getPath("userData") + "\\clash\\config.yaml"
        cp.exec("curl \"" + url + "\" -x 127.0.0.1:2340 -o " + file, (error, stdout, stderr) => {
            if (error) {
                log.error(`执行的错误: ${error}`);
                return;
            }
            window.clash.update({ path: file })
            console.log("更新配置文件!");
        })
    }
    else {
        console.log("不存在任何配置!");
    }
}

window.startProxy = function () {
    cp.exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >NUL')
    cp.exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /d "127.0.0.1:2340" /f >NUL')
    cp.exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyOverride /t REG_SZ /d "" /f >NUL')
    console.log("启动代理")
}

window.endProxy = function () {
    cp.exec('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f >NUL')
    console.log("关闭代理")
}

window.getProxyStatus = async function (back) {
    await cp.exec('REG QUERY "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable', (err, res, stderr) => {
        back(res.indexOf('0x1') !== -1);
    })
}

window.test = function () {
    console.log(window.clash);
}