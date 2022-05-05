export interface Instance {
  InstanceId: string;
  InstanceName?: string;
  InstanceType?: string;
  RegionId?: string;
  CreationTime?: string;
  SerialNumber?: string;
  Status?: string;
  DeploymentSetId?: string;
  KeyPairName?: string;
  SaleCycle?: string;
  SpotStrategy?: string;
  DeviceAvailable?: boolean;
  LocalStorageCapacity?: number;
  Description?: string;
  SpotDuration?: number;
  InstanceNetworkType?: string;
  OSNameEn?: string;
  HpcClusterId?: string;
  SpotPriceLimit?: number;
  Memory?: number;
  OSName?: string;
  DeploymentSetGroupNo?: number;
  ImageId?: string;
  VlanId?: string;
  ClusterId?: string;
  GPUSpec?: string;
  AutoReleaseTime?: string;
  DeletionProtection?: boolean;
  StoppedMode?: string;
  GPUAmount?: number;
  HostName?: string;
  InternetMaxBandwidthOut?: number;
  InternetMaxBandwidthIn?: number;
  InstanceChargeType?: string;
  IoOptimized?: boolean;
  StartTime?: string;
  Cpu?: number;
  LocalStorageAmount?: number;
  ExpiredTime?: string;
  ResourceGroupId?: string;
  InternetChargeType?: string;
  ZoneId?: string;
  Recyclable?: boolean;
  ISP?: string;
  CreditSpecification?: string;
  InstanceTypeFamily?: string;
  OSType?: string;
  NetworkInterfaces?: {
    NetworkInterface?: NetworkInterface[];
  };
  OperationLocks?: {
    LockReason?: LockReason[];
  };
  Tags?: {
    Tag?: Tag[];
  };
  RdmaIpAddress?: {
    RdmaIpAddress?: string[];
  };
  SecurityGroupIds?: {
    SecurityGroupId?: string[];
  };
  PublicIpAddress?: {
    IpAddress?: string[];
  };
  InnerIpAddress?: {
    IpAddress?: string[];
  };
  VpcAttributes?: VPCAttributes;
  EipAddress?: EipAddress;
  HibernationOptions?: {
    Configured?: boolean;
  };
  DedicatedHostAttribute?: {
    DedicatedHostId?: string;
    DedicatedHostName?: string;
    DedicatedHostClusterId?: string;
  };
  EcsCapacityReservationAttr?: {
    CapacityReservationPreference?: string;
    CapacityReservationId?: string;
  };
  DedicatedInstanceAttribute?: {
    Affinity?: string;
    Tenancy?: string;
  };
  CpuOptions?: {
    Numa?: string;
    CoreCount?: number;
    ThreadsPerCore?: number;
  };
  MetadataOptions?: {
    HttpEndpoint?: string;
    HttpPutResponseHopLimit?: number;
    HttpTokens?: string;
  };
  ImageOptions?: {
    LoginAsNonRoot?: boolean;
  };
}

interface NetworkInterface {
  Type?: string;
  MacAddress?: string;
  PrimaryIpAddress?: string;
  NetworkInterfaceId?: string;
  PrivateIpSets?: {
    PrivateIpSet?: PrivateIpSet[];
  };
}

interface PrivateIpSet {
  PrivateIpAddress?: string;
  Primary?: boolean;
}

interface LockReason {
  LockMsg?: string;
  LockReason?: string;
}

interface Tag {
  TagValue?: string;
  TagKey?: string;
}

interface VPCAttributes {
  VpcId?: string;
  NatIpAddress?: string;
  VSwitchId?: string;
  PrivateIpAddress?: {
    IpAddress?: string[];
  };
}

interface EipAddress {
  IsSupportUnassociate?: boolean;
  InternetChargeType?: string;
  IpAddress?: string;
  Bandwidth?: number;
  AllocationId?: string;
}
