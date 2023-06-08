import {PubSub} from '@google-cloud/pubsub';
import {CONFIG} from './local_config';

const {projectId, topicName} = CONFIG;

// Creates a client; cache this for further use
const pubSubClient = new PubSub({projectId});

async function publishMessage(topicNameOrId: string, data: string) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(
      `Received error while publishing: ${(error as Error).message}`
    );
    process.exitCode = 1;
  }
}

async function main() {
    await publishMessage(topicName, 'ignore');
}

main().catch(console.error);