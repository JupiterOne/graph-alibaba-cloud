import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const REQ_TIMEOUT = 20000;

export const AutoScalingSteps = {
  FETCH_AUTOSCALING_GROUPS: {
    id: 'fetch-autoscaling-groups',
    name: 'Fetch Autoscaling Groups',
  },
  BUILD_VPC_AUTOSCALING_GROUP_RELATIONSHIPS: {
    id: 'build-vpc-autoscaling-group-relationship',
    name: 'Build VPC Autoscaling Group Relationship',
  },
};

export const AutoScalingEntities: Record<
  'AUTOSCALING_GROUP',
  StepEntityMetadata
> = {
  AUTOSCALING_GROUP: {
    resourceName: 'Autoscaling Group',
    _type: 'alibaba_cloud_autoscaling_group',
    _class: ['Deployment', 'Group'],
  },
};

export const AutoScalingRelationships: Record<
  'AUTOSCALING_GROUP_USES_VPC',
  StepRelationshipMetadata
> = {
  AUTOSCALING_GROUP_USES_VPC: {
    _type: 'alibaba_cloud_autoscaling_group_uses_vpc',
    sourceType: 'alibaba_cloud_autoscaling_group',
    targetType: 'alibaba_cloud_vpc',
    _class: RelationshipClass.USES,
  },
};
