import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createVPCClient } from './client/client';
import { IntegrationConfig } from '../../config';
import { VPCEntities, VPCRelationships, VPCSteps } from './constants';
import {
  createNATGatewayEntity,
  createVPCEntity,
  getVpcKey,
} from './converter';
import { NATGateway } from './types';

export async function fetchVPCs({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateVPCs(async (vpc) => {
    await jobState.addEntity(createVPCEntity(vpc));
  });
}

export async function fetchNATGateways({
  logger,
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>): Promise<void> {
  const client = createVPCClient(instance.config, logger);

  await client.iterateNATGateways(async (natGateway) => {
    await jobState.addEntity(createNATGatewayEntity(natGateway));
  });
}

export async function buildVPCHasNATGatewayRelationship({
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: VPCEntities.NAT_GATEWAY._type },
    async (natGatewayEntity) => {
      const natGateway = getRawData<NATGateway>(natGatewayEntity);
      if (!natGateway) {
        logger.warn(
          { _key: natGatewayEntity._key },
          'Could not get raw data for NAT Gateway entity',
        );
        return;
      }

      const vpcId = natGateway.VpcId;
      if (!vpcId) {
        return;
      }

      const vpcEntity = await jobState.findEntity(getVpcKey(vpcId));
      if (vpcEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: vpcEntity,
            to: natGatewayEntity,
          }),
        );
      }
    },
  );
}

export const vpcSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: VPCSteps.FETCH_VPCS,
    name: 'Fetch VPCs',
    entities: [VPCEntities.VPC],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchVPCs,
  },
  {
    id: VPCSteps.FETCH_NAT_GATEWAYS,
    name: 'Fetch NAT Gateways',
    entities: [VPCEntities.NAT_GATEWAY],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchNATGateways,
  },
  {
    id: VPCSteps.BUILD_VPC_NAT_GATEWAY_RELATIONSHIPS,
    name: 'Build VPC has NAT Gateway Relationships',
    entities: [],
    relationships: [VPCRelationships.VPC_HAS_NAT_GATEWAY],
    dependsOn: [VPCSteps.FETCH_VPCS, VPCSteps.FETCH_NAT_GATEWAYS],
    executionHandler: buildVPCHasNATGatewayRelationship,
  },
];
