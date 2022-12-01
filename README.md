# viewer-design-system


## セットアップ

環境変数ファイルの作成
```shell
cp .env.example .env
```

```txt
# .envファイルをこのように書き換えます(必要に応じて書き換えます)
NEXT_PUBLIC_LOG_HOST=http://localhost:3000/
NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH=/Resources/logs/sample-logs/6
```

必要なパッケージをインストールします
```shell
yarn
```

## コマンド一覧

開発サーバー起動

```
yarn dev
```

Storybook 起動

```
yarn storybook
```

## hygen によるコンポーネントテンプレート生成

下記コマンド実行して、新規作成するコンポーネントのテンプレートを作成できます。

```
yarn hygen
```

## Dockerによる環境

### 起動
```shell
docker-compose up -d
```

### 終了
```
docker-compose down
```

## 動作環境

- node v16.14.2
- yarn v1.22.19

## StoryBookサンプル

`https://631806e6d5cba4af51ae5b2b-psnzkainpv.chromatic.com`

## ログ一覧
https://season-truffle-a3c.notion.site/9016a8ce87554475ac8e0e8f5cc42a64

## ログリンク作成ページ
https://script.google.com/macros/s/AKfycbzv7X4bsHxqqR21CZkht3j_TSbRAWaYZyqCWjaFjzJDiduNvRp5300vE3mxnMLLWz2Hrw/exec