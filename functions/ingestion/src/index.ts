import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda';

import { sendMessage } from '@app/services/sqs-service';
//import {
  //verifySignature,
//} from '@app/utils';

import { captureRequestContext } from '@app/utils/async-local-storage';

export const handler = async(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  captureRequestContext(event);
  console.log('Event : ', JSON.stringify({
    event,
  }, null, 4));
  // 1. Verify Signature
  //verifySignature(event);

  const messageId: string = await sendMessage(event);
  // 2. Add to Queue

  // 3. Error handling (final touch)

  // 4. Response
  return {
    statusCode: 200,
    body: JSON.stringify({
      messageId,
      message: 'success'
    }),
  }
}
