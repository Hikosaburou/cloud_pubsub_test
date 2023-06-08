// local_config.ts の内容に基づいて Cloud Pub/Sub の Topic と Subscription を作成するスクリプトです。
import { PubSub } from "@google-cloud/pubsub";
import { CONFIG } from "./local_config";
const { projectId, topicName, subscriptionName } = CONFIG;
const pubSubClient = new PubSub({projectId});

async function createTopic(topicNameOrId: string) {
  // Creates a new topic
  await pubSubClient.createTopic(topicNameOrId);
  console.log(`Topic ${topicNameOrId} created.`);
}

async function createSubscription(
  topicNameOrId: string,
  subscriptionNameOrId: string
) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId);
  console.log(`Subscription ${subscriptionNameOrId} created.`);
}

async function main() {
  await createTopic(topicName);
  await createSubscription(topicName, subscriptionName);
}

main().catch(console.error);
