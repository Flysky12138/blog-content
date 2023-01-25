---
title: Clash 配置模板
abbrlink: de9d2abb
date: 2021-09-01 12:29:11
updated: 2022-07-21 10:29:32
description: Clash 配置模板，供自购服务器搭建者使用
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/aff274d2a251bf91070f315c2b751ebe.webp
---

- 白名单模式，意为「**没有命中规则的网络流量，统统使用代理**」，适用于服务器线路网络质量稳定、快速，不缺服务器流量的用户。
- 如你希望 Apple、iCloud 和 Google 列表中的域名使用代理，则把 policy 由 `DIRECT` 改为 `PROXY`，以此类推，举一反三。
- 如你不希望进行 DNS 解析，可在 `GEOIP` 规则的最后加上 `,no-resolve`，如 `GEOIP,CN,DIRECT,no-resolve`。
- 详细设置说明自行查看文档 [Dreamacro/clash](https://github.com/Dreamacro/clash/wiki/configuration#all-configuration-options) 与 [Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules)

<Tabs>
<Tab label="白名单模式">

```yaml{33,35-37,51}
mixed-port: 7890
allow-lan: true
bind-address: '*'
mode: rule
log-level: info
ipv6: false
external-controller: 127.0.0.1:9090

dns:
  enable: true
  listen: 0.0.0.0:53
  ipv6: false
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - tls://1.0.0.1:853
    - https://cloudflare-dns.com/dns-query
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    ipcidr:
      - 240.0.0.0/4
      - 0.0.0.0/32

proxies:
  - name: <节点名称>
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
          Host: vv.video.qq.com

proxy-groups:
  - name: 手动选择
      type: select
      proxies:
        - <节点名称>

rule-providers:
  reject:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt'
    path: ./ruleset/reject.yaml
    interval: 86400
  icloud:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt'
    path: ./ruleset/icloud.yaml
    interval: 86400
  apple:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt'
    path: ./ruleset/apple.yaml
    interval: 86400
  google:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt'
    path: ./ruleset/google.yaml
    interval: 86400
  proxy:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt'
    path: ./ruleset/proxy.yaml
    interval: 86400
  direct:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt'
    path: ./ruleset/direct.yaml
    interval: 86400
  private:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt'
    path: ./ruleset/private.yaml
    interval: 86400
  gfw:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt'
    path: ./ruleset/gfw.yaml
    interval: 86400
  greatfire:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt'
    path: ./ruleset/greatfire.yaml
    interval: 86400
  tld-not-cn:
    type: http
    behavior: domain
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt'
    path: ./ruleset/tld-not-cn.yaml
    interval: 86400
  telegramcidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt'
    path: ./ruleset/telegramcidr.yaml
    interval: 86400
  cncidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt'
    path: ./ruleset/cncidr.yaml
    interval: 86400
  lancidr:
    type: http
    behavior: ipcidr
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt'
    path: ./ruleset/lancidr.yaml
    interval: 86400
  applications:
    type: http
    behavior: classical
    url: 'https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt'
    path: ./ruleset/applications.yaml
    interval: 86400

rules:
  - RULE-SET,applications,DIRECT
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
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

```yaml{35-37,48-50}
mixed-port: 7890
allow-lan: true
bind-address: '*'
mode: rule
log-level: info
ipv6: false
external-controller: 127.0.0.1:9090

dns:
  enable: true
  listen: 0.0.0.0:53
  ipv6: false
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  use-hosts: true
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - tls://1.0.0.1:853
    - https://cloudflare-dns.com/dns-query
    - https://dns.google/dns-query
  fallback-filter:
    geoip: true
    ipcidr:
      - 240.0.0.0/4
      - 0.0.0.0/32

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
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt
    path: ./ruleset/reject.yaml
    interval: 86400
  private:
    type: http
    behavior: domain
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt
    path: ./ruleset/private.yaml
    interval: 86400

rules:
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  - RULE-SET,private,DIRECT
  - RULE-SET,reject,REJECT
  - MATCH,全局代理
```

</Tab>
</Tabs>
