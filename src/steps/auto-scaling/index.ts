import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createScalingGroupClient } from './client/client';
import { IntegrationConfig } from '../../config';
import {
  AutoScalingEntities,
  AutoScalingRelationships,
  AutoScalingSteps,
} from './constants';
import { createAutoscalingGroupEntity } from './converter';
import { getVpcKey } from '../vpc/converter';
import { VPCSteps } from '../vpc/constants';
import { ScalingGroup } from './types';

export async function fetchScalingGroups({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createScalingGroupClient(instance.config, logger);

  await client.iterateScalingGroups(async (scalingGroup) => {
    await jobState.addEntity(createAutoscalingGroupEntity(scalingGroup));
  });
}

export async function buildScalingGroupUsesVpcRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: AutoScalingEntities.AUTOSCALING_GROUP._type },
    async (scalingGroupEntity) => {
      const scalingGroup = getRawData<ScalingGroup>(scalingGroupEntity);
      if (!scalingGroup) {
        logger.warn(
          { _key: scalingGroupEntity._key },
          'Could not get raw data for Scaling Group entity',
        );
        return;
      }

      const vpcId = scalingGroup.VpcId;
      if (!vpcId) {
        return;
      }

      const vpcEntity = await jobState.findEntity(getVpcKey(vpcId));

      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.USES,
            from: scalingGroupEntity,
            to: vpcEntity,
          }),
        );
      }
    },
  );
}

export const autoScalingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: AutoScalingSteps.FETCH_AUTOSCALING_GROUPS.id,
    name: AutoScalingSteps.FETCH_AUTOSCALING_GROUPS.name,
    entities: [AutoScalingEntities.AUTOSCALING_GROUP],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchScalingGroups,
  },
  {
    id: AutoScalingSteps.BUILD_VPC_AUTOSCALING_GROUP_RELATIONSHIPS.id,
    name: AutoScalingSteps.BUILD_VPC_AUTOSCALING_GROUP_RELATIONSHIPS.name,
    entities: [],
    relationships: [AutoScalingRelationships.AUTOSCALING_GROUP_USES_VPC],
    dependsOn: [
      AutoScalingSteps.FETCH_AUTOSCALING_GROUPS.id,
      VPCSteps.FETCH_VPCS,
    ],
    executionHandler: buildScalingGroupUsesVpcRelationship,
  },
];
