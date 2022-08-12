import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { AutoScalingEntities } from './constants';
import { ScalingGroup } from './types';

export function createAutoscalingGroupEntity(
  scalingGroup: ScalingGroup,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: scalingGroup,
      assign: {
        _type: AutoScalingEntities.AUTOSCALING_GROUP._type,
        _class: AutoScalingEntities.AUTOSCALING_GROUP._class,
        _key: `alibaba_cloud_autoscaling_group:${scalingGroup.ScalingGroupId}`,
        name: scalingGroup.ScalingGroupName,
        activeScalingConfigurationId: scalingGroup.ActiveScalingConfigurationId,
        modifiedOn: parseTimePropertyValue(scalingGroup.ModificationTime),
        active: scalingGroup.LifecycleState === 'Active',
        lifecyclyState: scalingGroup.LifecycleState,
        totalInstanceCount: scalingGroup.TotalInstanceCount,
        weighted: scalingGroup.Weighted,
        removalPolicies: scalingGroup.RemovalPolicies.RemovalPolicy,
        pendingWaitCapacity: scalingGroup.PendingWaitCapacity,
        totalCapacity: scalingGroup.TotalCapacity,
        removingWaitCapacity: scalingGroup.RemovingWaitCapacity,
        isElasticStrengthInAlarm: scalingGroup.IsElasticStrengthInAlarm,
        protectedCapacity: scalingGroup.ProtectedCapacity,
        standbyCapacity: scalingGroup.ProtectedCapacity,
        standByCapacity: scalingGroup.StandbyCapacity,
        scalingPolicy: scalingGroup.ScalingPolicy,
        suspendedProcesses: scalingGroup.SuspendedProcesses.SuspendedProcess,
        removingCapacity: scalingGroup.RemovingCapacity,
        vSwitchIds: scalingGroup.VSwitchIds.VSwitchId,
        scalingGroupId: scalingGroup.ScalingGroupId,
        pendingCapacity: scalingGroup.PendingCapacity,
        vSwitchId: scalingGroup.VSwitchId,
        loadBalancerIds: scalingGroup.LoadBalancerIds.LoadBalancerId,
        groupDeletionProtection: scalingGroup.GroupDeletionProtection,
        maxSize: scalingGroup.MaxSize,
        minSize: scalingGroup.MinSize,
        activeCapacity: scalingGroup.ActiveCapacity,
        defaultCooldown: scalingGroup.DefaultCooldown,
        vpcId: scalingGroup.VpcId,
        groupType: scalingGroup.GroupType,
        systemSuspended: scalingGroup.SystemSuspended,
        monitorGroupId: scalingGroup.MonitorGroupId,
        createdOn: parseTimePropertyValue(scalingGroup.CreationTime),
        multiAzPolicy: scalingGroup.MultiAZPolicy,
        stoppedCapacity: scalingGroup.StoppedCapacity,
        regionId: scalingGroup.RegionId,
        dbInstancesId: scalingGroup.DBInstanceIds.DBInstanceId,
        healthCheckType: scalingGroup.HealthCheckType,
      },
    },
  });
}
