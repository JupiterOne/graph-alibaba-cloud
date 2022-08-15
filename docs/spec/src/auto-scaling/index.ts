import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const autoScalingSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * Action: DescribeInstances
     * PATTERN: Fetch Entities
     */
    id: 'fetch-autoscaling-groups',
    name: 'Fetch Autoscaling Groups',
    entities: [
      {
        resourceName: 'Autoscaling Group',
        _type: 'alibaba_cloud_autoscaling_group',
        _class: ['Deployment', 'Group'],
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
    id: 'build-vpc-autoscaling-group-relationship',
    name: 'Build VPC Autoscaling Group Relationship',
    entities: [],
    relationships: [
      {
        _type: 'alibaba_cloud_autoscaling_group_uses_vpc',
        sourceType: 'alibaba_cloud_autoscaling_group',
        targetType: 'alibaba_cloud_vpc',
        _class: RelationshipClass.USES,
      },
    ],
    dependsOn: ['fetch-autoscaling-groups', 'fetch-vpcs'],
    implemented: true,
  },
];
