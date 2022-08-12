export interface ScalingGroup {
  ActiveScalingConfigurationId: string;
  ModificationTime: string;
  LifecycleState: string;
  TotalInstanceCount: number;
  Weighted: boolean;
  RemovalPolicies: {
    RemovalPolicy: string[];
  };
  PendingWaitCapacity: number;
  TotalCapacity: number;
  RemovingWaitCapacity: number;
  IsElasticStrengthInAlarm: boolean;
  ProtectedCapacity: number;
  StandbyCapacity: number;
  ScalingPolicy: string;
  SuspendedProcesses: {
    SuspendedProcess: string[];
  };
  RemovingCapacity: number;
  VSwitchIds: {
    VSwitchId: string[];
  };
  ScalingGroupId: string;
  PendingCapacity: number;
  VSwitchId: string;
  LoadBalancerIds: {
    LoadBalancerId: string[];
  };
  GroupDeletionProtection: boolean;
  MaxSize: number;
  ScalingGroupName: string;
  MinSize: number;
  ActiveCapacity: number;
  DefaultCooldown: number;
  VpcId: string;
  GroupType: string;
  SystemSuspended: boolean;
  MonitorGroupId: number;
  CreationTime: string;
  MultiAZPolicy: string;
  StoppedCapacity: number;
  RegionId: string;
  DBInstanceIds: {
    DBInstanceId: string[];
  };
  HealthCheckType: string;
}
