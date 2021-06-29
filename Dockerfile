# # ベースイメージの作成
# FROM node:14.5.0-alpine
# コンテナ内で作業するディレクトリを指定
# WORKDIR /usr/src/app
# package.jsonとyarn.lockを/usr/src/appにコピー
# COPY ["package.json", "yarn.lock", "./"]
# パッケージをインストール
# RUN yarn install
# ファイルを全部作業用ディレクトリにコピー
# COPY . .
# コンテナを起動する際に実行されるコマンド
# ENTRYPOINT [ "yarn", "start" ]

FROM node:14.5.0-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install 

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN npm install && mv node_modules /node_modules

COPY . .

CMD npm start