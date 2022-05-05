import { createMockExecutionContext } from '@jupiterone/integration-sdk-testing';
import { integrationConfig } from '../test/config';
import { Recording, setupProjectRecording } from '../test/recording';
import { IntegrationConfig, validateInvocation } from './config';

describe('#validateInvocation', () => {
  let recording: Recording;

  afterEach(async () => {
    if (recording) {
      await recording.stop();
    }
  });

  test('successfully validates invocation', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'validate-invocation',
    });

    const executionContext = createMockExecutionContext({
      instanceConfig: integrationConfig,
    });

    // successful validateInvocation doesn't throw errors and will be undefined
    await expect(validateInvocation(executionContext)).resolves.toBeUndefined();
  });

  describe('fails validating invocation', () => {
    test('requires valid config', async () => {
      const executionContext = createMockExecutionContext<IntegrationConfig>({
        instanceConfig: {} as IntegrationConfig,
      });

      await expect(validateInvocation(executionContext)).rejects.toThrow(
        'Config requires all of {accessKeyId, accessKeySecret}',
      );
    });

    test('should throw if access key id is invalid', async () => {
      recording = setupProjectRecording({
        directory: __dirname,
        name: 'access-key-id-auth-error',
        options: {
          recordFailedRequests: true,
        },
      });

      const executionContext = createMockExecutionContext({
        instanceConfig: {
          accessKeyId: 'INVALID',
          accessKeySecret: integrationConfig.accessKeySecret,
        },
      });

      await expect(validateInvocation(executionContext)).rejects.toThrow(
        '404 Specified access key is not found.',
      );
    });

    test('should throw if secret access key is invalid', async () => {
      recording = setupProjectRecording({
        directory: __dirname,
        name: 'access-key-secret-auth-error',
        options: {
          recordFailedRequests: true,
        },
      });

      const executionContext = createMockExecutionContext({
        instanceConfig: {
          accessKeyId: integrationConfig.accessKeyId,
          accessKeySecret: 'INVALID',
        },
      });

      await expect(validateInvocation(executionContext)).rejects.toThrow(
        '400 The request signature does not conform to Aliyun standards.',
      );
    });
  });
});
