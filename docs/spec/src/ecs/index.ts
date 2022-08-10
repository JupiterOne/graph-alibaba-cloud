import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const ecsSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: DescribeInstances
     * PATTERN: Fetch Entities
     */
    id: 'fetch-ecs-instances',
    name: 'Fetch ECS Instances',
    entities: [
      {
        resourceName: 'ECS Instance',
        _type: 'alibaba_cloud_ecs_instance',
        _class: ['Host'],
      },
    ],
    relationships: [],
    dependsOn: [],
    implemented: true,
  },
  {
    /**
     * PATTERN: Build Child Relationships
     */
    id: 'build-vpc-has-ecs-instance-relationships',
    name: 'Build VPC has ECS Instance Relationships',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_vpc_has_ecs_instance',
        sourceType: 'alibaba_cloud_vpc',
        _class: RelationshipClass.HAS,
        targetType: 'alibaba_cloud_ecs_instance',
      },
    ],
    dependsOn: ['fetch-ecs-instances', 'fetch-vpcs'],
    implemented: true,
  },
];
