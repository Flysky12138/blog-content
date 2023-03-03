---
title: Clash 配置模板
abbrlink: de9d2abb
date: 2021-09-01 12:29:11
updated: 2023-02-26 22:43:32
description: Clash 配置模板，供自购服务器搭建者使用
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/aff274d2a251bf91070f315c2b751ebe.webp
---

- 白名单模式，意为「**没有命中规则的网络流量，统统使用代理**」，适用于服务器线路网络质量稳定、快速，不缺服务器流量的用户。
- 如你希望 Apple、iCloud 和 Google 列表中的域名使用代理，则把 policy 由 `DIRECT` 改为 `PROXY`，以此类推，举一反三。
- 如你不希望进行 DNS 解析，可在 `GEOIP` 规则的最后加上 `,no-resolve`，如 `GEOIP,CN,DIRECT,no-resolve`。
- 详细设置说明自行查看文档 [Dreamacro/clash/wiki](https://github.com/Dreamacro/clash/wiki/Configuration)、[MetaCubeX/Clash.Meta](https://github.com/MetaCubeX/Clash.Meta/wiki/Configuring-example#general)、[Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules)

<Tabs>
<Tab label="白名单模式">

```yaml{52,54-56,63}
mixed-port: 7890
allow-lan: true
bind-address: '*'
find-process-mode: strict
mode: rule
geox-url:
  geoip: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat'
  geosite: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat'
  mmdb: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/geoip@release/Country.mmdb'
log-level: info
ipv6: true
external-controller: 127.0.0.1:9090
hosts:
# '*.clash.dev': 127.0.0.1
profile:
  store-selected: false
  store-fake-ip: true

tun:
  enable: true
  stack: gvisor
  dns-hijack:
    - 0.0.0.0:53
  auto-detect-interface: true
  auto-route: true

dns:
  enable: true
  prefer-h3: true
  listen: 0.0.0.0:53
  ipv6: false
  default-nameserver:
    - 114.114.114.114
    - tls://223.5.5.5:853
    - tls://1.12.12.12:853
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  nameserver-policy:
    'geosite:cn': https://dns.alidns.com/dns-query
  nameserver:
    - https://dns.google/dns-query
    - https://dns.cloudflare.com/dns-query
    - https://doh.opendns.com/dns-query
    - https://doh.dns.sb/dns-query
    - https://[2001:4860:4860::8888]/dns-query
    - https://[2001:4860:4860::8844]/dns-query
    - https://[2001:4860:4860::6464]/dns-query
    - https://[2001:4860:4860::64]/dns-query

proxies:
  - name: 香港
    type: trojan
    server: <节点地址>
    port: <节点端口>
    password: <节点密码>
    udp: true

proxy-groups:
  - name: 手动选择
    type: select
    proxies:
      - 香港

rule-providers:
  reject:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/reject.txt'
    path: ./ruleset/reject.yaml
    interval: 86400
  icloud:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/icloud.txt'
    path: ./ruleset/icloud.yaml
    interval: 86400
  apple:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/apple.txt'
    path: ./ruleset/apple.yaml
    interval: 86400
  google:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/google.txt'
    path: ./ruleset/google.yaml
    interval: 86400
  proxy:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/proxy.txt'
    path: ./ruleset/proxy.yaml
    interval: 86400
  direct:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/direct.txt'
    path: ./ruleset/direct.yaml
    interval: 86400
  private:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/private.txt'
    path: ./ruleset/private.yaml
    interval: 86400
  gfw:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/gfw.txt'
    path: ./ruleset/gfw.yaml
    interval: 86400
  greatfire:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/greatfire.txt'
    path: ./ruleset/greatfire.yaml
    interval: 86400
  tld-not-cn:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt'
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400
  telegramcidr:
    type: http
    behavior: ipcidr
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt'
    path: ./ruleset/telegramcidr.yaml
    interval: 86400
  cncidr:
    type: http
    behavior: ipcidr
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/cncidr.txt'
    path: ./ruleset/cncidr.yaml
    interval: 86400
  lancidr:
    type: http
    behavior: ipcidr
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/lancidr.txt'
    path: ./ruleset/lancidr.yaml
    interval: 86400
  applications:
    type: http
    behavior: classical
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/applications.txt'
    path: ./ruleset/applications.yaml
    interval: 86400

rules:
  - RULE-SET,applications,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,REJECT
  - RULE-SET,icloud,DIRECT
  - RULE-SET,apple,DIRECT
  - RULE-SET,google,DIRECT
  - RULE-SET,proxy,手动选择
  - RULE-SET,direct,DIRECT
  - RULE-SET,lancidr,DIRECT
  - RULE-SET,cncidr,DIRECT
  - RULE-SET,telegramcidr,手动选择
  - GEOIP,LAN,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,手动选择
```

</Tab>
<Tab label="全局模式">

```yaml{54-56,67-69}
mixed-port: 7890
allow-lan: true
bind-address: '*'
find-process-mode: strict
mode: rule
geox-url:
  geoip: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat'
  geosite: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat'
  mmdb: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/geoip@release/Country.mmdb'
log-level: info
ipv6: true
external-controller: 127.0.0.1:9090
hosts:
# '*.clash.dev': 127.0.0.1
profile:
  store-selected: false
  store-fake-ip: true

tun:
  enable: true
  stack: gvisor
  dns-hijack:
    - 0.0.0.0:53
  auto-detect-interface: true
  auto-route: true

dns:
  enable: true
  prefer-h3: true
  listen: 0.0.0.0:53
  ipv6: false
  default-nameserver:
    - 114.114.114.114
    - tls://223.5.5.5:853
    - tls://1.12.12.12:853
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  nameserver-policy:
    'geosite:cn': [https://doh.pub/dns-query, https://dns.alidns.com/dns-query]
  nameserver:
    - https://dns.google/dns-query
    - https://dns.cloudflare.com/dns-query
    - https://doh.opendns.com/dns-query
    - https://doh.dns.sb/dns-query
    - https://[2001:4860:4860::8888]/dns-query
    - https://[2001:4860:4860::8844]/dns-query
    - https://[2001:4860:4860::6464]/dns-query
    - https://[2001:4860:4860::64]/dns-query

proxies:
  - name: 日常
    type: vmess
    server: <节点地址>
    port: <节点端口>
    uuid: <节点密码>
    alterId: 0
    cipher: auto
    udp: true
    network: ws
    ws-opts:
      path: /
      headers:
        Host: ltetp.tv189.com
  - name: 欠费
    type: vmess
    server: <节点地址>
    port: <节点端口>
    uuid: <节点密码>
    alterId: 0
    cipher: auto
    udp: true
    network: ws
    ws-opts:
      path: /
      headers:
        Host: wap.sc.189.cn

proxy-groups:
  - name: 全局代理
    type: select
    proxies:
      - 日常
      - 欠费

rule-providers:
  reject:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/reject.txt'
    path: ./ruleset/reject.yaml
    interval: 86400
  private:
    type: http
    behavior: domain
    url: 'https://jsd.cdn.zzko.cn/gh/Loyalsoldier/clash-rules@release/private.txt'
    path: ./ruleset/private.yaml
    interval: 86400

rules:
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,REJECT
  - MATCH,全局代理
```

</Tab>
</Tabs>
