import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createECSClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { ECSEntities, ECSRelationships, ECSSteps } from './constants';
import { createECSInstanceEntity } from './converter';
import { getVpcKey } from '../vpc/converter';
import { VPCSteps } from '../vpc/constants';
import { Instance } from './types';

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

export async function buildVpcHasEcsInstanceRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: ECSEntities.ECS_INSTANCE._type },
    async (ecsEntity) => {
      const ecs = getRawData<Instance>(ecsEntity);
      if (!ecs) {
        logger.warn(
          { _key: ecsEntity._key },
          'Could not get raw data for ECS entity',
        );
        return;
      }

      const vpcId = ecs.VpcAttributes?.VpcId;
      if (!vpcId) {
        return;
      }

      const vpcEntity = await jobState.findEntity(getVpcKey(vpcId));

      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: vpcEntity,
            to: ecsEntity,
          }),
        );
      }
    },
  );
}

export const ecsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: ECSSteps.FETCH_ECS_INSTANCES,
    name: 'Fetch ECS Instances',
    entities: [ECSEntities.ECS_INSTANCE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchInstances,
  },
  {
    id: ECSSteps.BUILD_VPC_ECS_INSTANCE_RELATIONSHIPS,
    name: 'Build VPC has ECS Instance Relationships',
    entities: [],
    relationships: [ECSRelationships.VPC_HAS_ECS_INSTANCE],
    dependsOn: [ECSSteps.FETCH_ECS_INSTANCES, VPCSteps.FETCH_VPCs.id],
    executionHandler: buildVpcHasEcsInstanceRelationship,
  },
];
