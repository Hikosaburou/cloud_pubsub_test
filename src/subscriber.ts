import { PubSub, Message } from "@google-cloud/pubsub";
import { CONFIG } from "./local_config";

const { projectId, topicName, subscriptionName } = CONFIG;

const pubSubClient = new PubSub({ projectId });

// Configures the message handler
function messageHandler(message: Message) {
  // Converts the message data to a string
  const messageData = message.data.toString("utf8");

  console.log(
    `[${new Date().toISOString()}]Received message: ${messageData}, attempt: ${
      message.deliveryAttempt
    }`
  );

  console.log(`Message attributes: ${JSON.stringify(message.attributes)}`);
  
  // Checks if the message data is equal to "ignore"
  if (messageData === "ignore") {
    console.log(`Ignoring message: ${messageData}`);
  } else {
    console.log(`Received message: ${messageData}`);
    // Acknowledges the message
    message.ack();
  }
}

// Main function
async function main() {
  // References the subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Adds the message handler
  subscription.on("message", messageHandler);
}

main().catch(console.error);
