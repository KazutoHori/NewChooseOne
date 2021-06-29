# # ベースイメージの作成
FROM node:14.5.0-alpine
# コンテナ内で作業するディレクトリを指定
WORKDIR /usr/src/app
# package.jsonとyarn.lockを/usr/src/appにコピー
# COPY ["package.json", "yarn.lock", "./"]
# パッケージをインストール
# RUN yarn install
# ファイルを全部作業用ディレクトリにコピー
COPY . .
# コンテナを起動する際に実行されるコマンド
ENTRYPOINT [ "yarn", "start" ]
