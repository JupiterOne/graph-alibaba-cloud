import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';
import AlibabaClient from '@alicloud/pop-core';

export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  accessKeyId: {
    type: 'string',
  },
  accessKeySecret: {
    type: 'string',
    mask: true,
  },
};

export interface IntegrationConfig extends IntegrationInstanceConfig {
  accessKeyId: string;
  accessKeySecret: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
): Promise<void> {
  const { config } = context.instance;

  if (!config.accessKeyId || !config.accessKeySecret) {
    throw new IntegrationValidationError(
      'Config requires all of {accessKeyId, accessKeySecret}',
    );
  }

  try {
    await verifyAuthentication(config);
  } catch (error) {
    throw new IntegrationProviderAuthenticationError({
      endpoint: error.url,
      cause: error,
      status: error.entry.response.statusCode,
      statusText: error.message,
    });
  }
}

/**
 * Alibaba's API does not have an endpoint for verifying access credentials. Instead, use a lightweight API call
 * to ensure credentials are valid before continuing.
 */
async function verifyAuthentication(config: IntegrationConfig): Promise<void> {
  const client = new AlibabaClient({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    endpoint: 'https://ecs.aliyuncs.com',
    apiVersion: '2014-05-26',
  });

  await client.request('DescribeInstances', {
    RegionId: 'us-east-1',
    PageSize: 1,
  });
}
