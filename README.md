# izu-web

izuのweb、およびツール

## DevTool

開発用にお使いください。

### ビルド

```bash
$ make build-dev
```

### 閲覧方法

動的なhttpサーバーを立てる必要ないです。

`./devtool/build/www` が見られるようにプロキシを設定してください。

nginxの場合、 `./devtool/izu-web.conf` を少し変えて `/etc/nginx/conf.d` に置けば上手く動くと思う。

1. `HOST_NAME` をホスト名に(例: `izu-devtool.hakaba.xyz` )
2. `PATH_TO_THIS_PROJECT` を、このプロジェクトフォルダへのパスに(例: `/home/hakaba/izu-web` )
