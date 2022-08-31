import {
  StepEntityMetadata,
  StepRelationshipMetadata,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { VPCEntities } from '../vpc/constants';

// ECS Config
export const ECS_REQ_TIMEOUT = 20000;
export const ECS_DEFAULT_ENDPOINT = 'https://ecs.aliyuncs.com';
export const ECS_API_VERSION = '2014-05-26';
export const ECS_PAGE_SIZE = 50;

export enum ECSSteps {
  FETCH_ECS_INSTANCES = 'fetch-ecs-instances',
  BUILD_VPC_ECS_INSTANCE_RELATIONSHIPS = 'build-vpc-has-ecs-instance-relationships',
}

export const ECSEntities: Record<'ECS_INSTANCE', StepEntityMetadata> = {
  ECS_INSTANCE: {
    resourceName: 'ECS Instance',
    _type: 'alibaba_cloud_ecs_instance',
    _class: ['Host'],
    schema: {
      additionalProperties: true,
      properties: {
        instanceName: { type: 'string' },
        instanceId: { type: 'string' },
        instanceType: { type: 'string' },
        region: { type: 'string' },
      },
      required: ['instanceName', 'instanceId', 'instanceType', 'region'],
    },
  },
};

export const ECSRelationships: Record<
  'VPC_HAS_ECS_INSTANCE',
  StepRelationshipMetadata
> = {
  VPC_HAS_ECS_INSTANCE: {
    _type: 'alibaba_cloud_vpc_has_ecs_instance',
    sourceType: VPCEntities.VPC._type,
    _class: RelationshipClass.HAS,
    targetType: ECSEntities.ECS_INSTANCE._type,
  },
};
