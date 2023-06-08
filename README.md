# cloud_pubsub_test
Cloud Pub/Subの動作確認用

# 使い方

ローカルでpublish, subscribeします。

## 準備

* `gcloud auth login` する
* `npm i` する
* local_config.ts にGoogle CloudプロジェクトIDとCloud Pub/Subの設定を入れる


## Cloud Pub/Sub トピックとサブスクリプションを作る

```
npx ts-node ./src/create_topic_and_subscription.ts
```

## トピックにメッセージを送る

```
npx ts-node ./src/publish.ts
```

## メッセージを受け取る

```
npx ts-node ./src/subscriber.ts
```