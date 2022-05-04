import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { createECSClient } from './client/client';
import { Instance } from './types';
import { IntegrationConfig } from '../../config';
import { ECSEntities, ECSSteps } from './constants';
import { createECSInstanceEntity } from './converter';

export async function fetchInstances({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createECSClient(instance.config, logger);

  await client.iterateInstances(async (instance: Instance) => {
    await jobState.addEntity(createECSInstanceEntity(instance));
  });
}

export const ecsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: ECSSteps.FETCH_ECS_INSTANCES.id,
    name: 'Fetch ECS Instances',
    entities: [ECSEntities.ECS_INSTANCE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchInstances,
  },
];
