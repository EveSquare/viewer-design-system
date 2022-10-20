# viewer-design-system


## セットアップ

環境変数ファイルの作成
```shell
cp .env.example .env
```

```txt
# .envファイルをこのように書き換えます
NEXT_PUBLIC_LOG_HOST=http://localhost:3000/
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

## 動作環境

- node v16.14.2
- yarn v1.22.19

## StoryBookサンプル

`https://631806e6d5cba4af51ae5b2b-psnzkainpv.chromatic.com`