import { handler } from './index';
import { mockEvent } from '@app/__mocks__';
import { sqs } from '@app/services/sqs-service';

jest.mock('@app/services/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
  }
}));

jest.mock('aws-xray-sdk', () => ({
  __esModule: true,
  default: {
    captureAWSClient: jest.fn(),
  }
}));

jest.mock('aws-sdk', () => {
  const SqsMethods = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  }
  const mockAwsSdk = {
    SQS: jest.fn(() => SqsMethods),
  };
  return mockAwsSdk;
});

jest.mock('@app/config', () => ({
  __esModule: true,
  default: {
    webhook: {
      signature: {
        secret: 'test123',
        algo: 'sha256',
        header: 'x-hub-signature-256'
      }
    },
    queue: {
      sqs: {
        url: 'queueUrl'
      }
    },
  }
}))

describe('lambda.handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  it('should return with 200 with the default message', async() => {
    (sqs.sendMessage as jest.Mock).mockReturnValue({
      promise: jest.fn(),
    })
    // @ts-ignore
    await expect(handler(mockEvent))
      .resolves
      .toEqual({
        statusCode: 200,
        body: expect.stringMatching(
          'success'
        )
      });
  });
});
