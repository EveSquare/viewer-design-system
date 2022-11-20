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
DATABASE_URL="file:./dev.db"
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

## Prisma

### Prisma によるデータベース初期化(テーブル作成)
```shell
yarn prisma db push
```
sqliteの場合`prisma/dev.db`が生成されます．

### `Prisma Studio`の起動

```shell
yarn prisma studio
> Prisma schema loaded from prisma/schema.prisma
> Prisma Studio is up on http://localhost:5555
```

[http://localhost:5555/](http://localhost:5555/)でモデルをGUIで操作可能

### テストデータの追加(Seed)

```shell
yarn prisma db seed
> ...
> 🌱  The seed command has been executed.
> ✨  Done in 4.74s.
```
Prisma Studioで確認するとテストデータが追加されていることが確認できる．

## Docker(オプション)
Dockerで起動する場合[Docker Desktop](https://www.docker.com/)をインストールする必要があ
ります．
Dockerで起動する場合データベース`postgres`を選択することが出来ます．
`postgres`を使用する場合は`.env`ファイルを以下のように書き換えます．
```text
# .env
POSTGRES_PASSWORD="password"
POSTGRES_USER="postgres"
DATABASE_URL="postgresql://postgres:password@db:5432/postgres?schema=public"
```
また，Prismaのスキーマに書かれているプロバイダーを変更する必要があります．
```javascript
// prisma/schema.prisma

datasource db {
  provider = "sqlite" // <- providerを"postgres"に書き換える
  url      = env("DATABASE_URL")
}
```
変わらない場合は`node_modules/.prisma/client/schema.prisma`にあるファイルと同期されていないことが問題になります．
以下のコマンドを打ち込み，同期させる必要があります．
```shell
yarn prisma db push
> The database is already in sync with the Prisma schema.

> ✔ Generated Prisma Client (4.5.0 | library) to ./node_modules/@prisma/client in 97ms

> ✨  Done in 2.57s.
```

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