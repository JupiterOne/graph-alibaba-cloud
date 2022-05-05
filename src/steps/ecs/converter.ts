import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { ECSEntities } from './constants';
import { Instance } from './types';

export function createECSInstanceEntity(instance: Instance): Entity {
  const operationLockReasons = instance.OperationLocks?.LockReason?.map(
    (lock) => lock.LockReason ?? '',
  );
  const tagKeys = instance.Tags?.Tag?.map((tag) => tag.TagKey ?? '');
  const tagValues = instance.Tags?.Tag?.map((tag) => tag.TagValue ?? '');
  const networkInterfaceIds: string[] = [];
  instance.NetworkInterfaces?.NetworkInterface?.forEach((networkInterface) => {
    if (networkInterface.NetworkInterfaceId) {
      networkInterfaceIds.push(networkInterface.NetworkInterfaceId);
    }
  });

  // host entity properties
  const hostname = instance.HostName;
  const publicIpAddress = instance.PublicIpAddress?.IpAddress;
  const state = instance.Status;
  const osName = instance.OSType;
  const osDetails = instance.OSNameEn;
  let ipAddress: string | undefined;
  let privateIpAddress: string | undefined;
  let macAddress: string | undefined;
  instance.NetworkInterfaces?.NetworkInterface?.forEach((networkInterface) => {
    if (networkInterface.Type && networkInterface.Type === 'Primary') {
      macAddress = networkInterface.MacAddress;
      ipAddress = networkInterface.PrimaryIpAddress;
      networkInterface.PrivateIpSets?.PrivateIpSet?.forEach((privateIpSet) => {
        if (privateIpSet.Primary) {
          privateIpAddress = privateIpSet.PrivateIpAddress;
        }
      });
    }
  });

  return createIntegrationEntity({
    entityData: {
      source: instance,
      assign: {
        _type: ECSEntities.ECS_INSTANCE._type,
        _class: ECSEntities.ECS_INSTANCE._class,
        _key: instance.InstanceId,
        instanceName: instance.InstanceName,
        name: instance.InstanceName,
        instanceId: instance.InstanceId,
        instanceType: instance.InstanceType,
        region: instance.RegionId,
        hostname,
        publicIpAddress,
        privateIpAddress,
        ipAddress,
        macAddress,
        state,
        osName,
        osDetails,
        osType: instance.OSType,
        creationTime: instance.CreationTime,
        serialNumber: instance.SerialNumber,
        status: instance.Status,
        deploymentSetId: instance.DeploymentSetId,
        keyPairName: instance.KeyPairName,
        saleCycle: instance.SaleCycle,
        spotStrategy: instance.SpotStrategy,
        deviceAvailable: instance.DeviceAvailable,
        localStorageCapacity: instance.LocalStorageCapacity,
        description: instance.Description,
        spotDuration: instance.SpotDuration,
        instanceNetworkType: instance.InstanceNetworkType,
        osNameEn: instance.OSNameEn,
        hpcClusterId: instance.HpcClusterId,
        spotPriceLimit: instance.SpotPriceLimit,
        memory: instance.Memory,
        deploymentSetGroupNo: instance.DeploymentSetGroupNo,
        imageId: instance.ImageId,
        vlanId: instance.VlanId,
        clusterId: instance.ClusterId,
        gpuSpec: instance.GPUSpec,
        autoReleaseTime: instance.AutoReleaseTime,
        deletionProtection: instance.DeletionProtection,
        stoppedMode: instance.StoppedMode,
        gpuAmount: instance.GPUAmount,
        internetMaxBandwidthOut: instance.InternetMaxBandwidthOut,
        internetMaxBandwidthIn: instance.InternetMaxBandwidthIn,
        instanceChargeType: instance.InstanceChargeType,
        ioOptimized: instance.IoOptimized,
        startTime: instance.StartTime,
        cpu: instance.Cpu,
        localStorageAmount: instance.LocalStorageAmount,
        expiredTime: instance.ExpiredTime,
        resourceGroupId: instance.ResourceGroupId,
        internetChargeType: instance.InternetChargeType,
        zoneId: instance.ZoneId,
        recyclable: instance.Recyclable,
        isp: instance.ISP,
        creditSpecification: instance.CreditSpecification,
        instanceTypeFamily: instance.InstanceTypeFamily,
        networkInterfaceIds,
        operationLocks: operationLockReasons,
        tagKeys,
        tagValues,
        rdmaIpAddress: instance.RdmaIpAddress?.RdmaIpAddress,
        securityGroupIds: instance.SecurityGroupIds?.SecurityGroupId,
        innerIpAddress: instance.InnerIpAddress?.IpAddress,
        vpcId: instance.VpcAttributes?.VpcId,
        vpcNatIpAddress: instance.VpcAttributes?.NatIpAddress,
        vpcVSwitchId: instance.VpcAttributes?.VSwitchId,
        vpcPrivateIpAddress:
          instance.VpcAttributes?.PrivateIpAddress?.IpAddress,
        eipAddress: instance.EipAddress?.IpAddress,
        hibernationOptionsConfigured: instance.HibernationOptions?.Configured,
        dedicatedHostId: instance.DedicatedHostAttribute?.DedicatedHostId,
        dedicatedHostName: instance.DedicatedHostAttribute?.DedicatedHostName,
        dedicatedHostClusterId:
          instance.DedicatedHostAttribute?.DedicatedHostClusterId,
        ecsCapacityReservationPreference:
          instance.EcsCapacityReservationAttr?.CapacityReservationPreference,
        ecsCapacityReservationId:
          instance.EcsCapacityReservationAttr?.CapacityReservationId,
        dedicatedInstanceAffinity:
          instance.DedicatedInstanceAttribute?.Affinity,
        dedicatedInstanceTenancy: instance.DedicatedInstanceAttribute?.Tenancy,
        cpuCoreCount: instance.CpuOptions?.CoreCount,
        cpuThreadsPerCore: instance.CpuOptions?.ThreadsPerCore,
        httpEndpoint: instance.MetadataOptions?.HttpEndpoint,
        httpPutResponseHopLimit:
          instance.MetadataOptions?.HttpPutResponseHopLimit,
        httpTokens: instance.MetadataOptions?.HttpTokens,
        loginAsRoot: instance.ImageOptions?.LoginAsNonRoot,
      },
    },
  });
}
