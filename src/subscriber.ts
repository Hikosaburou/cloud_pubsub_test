import { PubSub, Message } from "@google-cloud/pubsub";
import { CONFIG } from "./local_config";

const { projectId, subscriptionName } = CONFIG;

const pubSubClient = new PubSub({ projectId });

// Configures the message handler
function messageHandler(message: Message) {
  // Converts the message data to a string
  const messageData = message.data.toString("utf8");

  console.log(
    `[${new Date().toISOString()}]Received message: ${messageData}(ID:${message.id})`
  );

  // Checks if the message data is equal to "ignore"
  if (messageData === "ignore") {
    console.log(`Ignoring message: ${messageData}`);
    message.nack();
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
