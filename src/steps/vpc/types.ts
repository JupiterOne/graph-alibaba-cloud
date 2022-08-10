interface Tag {
  key: string;
  value: string;
}

interface Ipv6CidrBlock {
  Ipv6Isp: string;
  Ipv6CidrBlock: string;
}

enum VPCStatus {
  AVAILABLE = 'Available',
  PENDING = 'Pending',
}

export interface VPC {
  CreationTime: string;
  Status: VPCStatus;
  VpcId: string;
  IsDefault: boolean;
  OwnerId: string;
  RegionId: string;
  VpcName: string;
  VRouterId: string;
  DhcpOptionsSetStatus?: string;
  CidrBlock: string;
  Description: string;
  Ipv6CidrBlock: string;
  CenStatus: string;
  Tags?: Tag[];
  Ipv6CidrBlocks?: { Ipv6CidrBlock: Ipv6CidrBlock[] };
  VSwitchIds: { VSwitchId: string[] };
  SecondaryCidrBlocks: { SecondaryCidrBlock: string[] };
  UserCidrs: { UserCidr: string[] };
  NatGatewayIds: { NatGatewayIds: string[] };
  RouterTableIds: { RouterTableIds: string[] };
  ResourceGroupId: string;
  NetworkAclNum: number;
  AdvancedResource: boolean;
}

interface CloudResource {
  ResourceCount: number;
  ResourceType: string;
}

export interface VPCAttribute {
  CreationTime: string;
  Status: VPCStatus;
  VpcId: string;
  IsDefault: boolean;
  ClassicLinkEnabled?: boolean;
  OwnerId: string;
  RegionId: string;
  VpcName: string;
  VRouterId: string;
  DhcpOptionsSetStatus?: string;
  CidrBlock: string;
  Description: string;
  ResourceGroupId: string;
  DhcpOptionsSetId?: string;
  Ipv6CidrBlock: string;
  VSwitchIds: { VSwitchId: string[] };
  UserCidrs: { UserCidr: string[] };
  SecondaryCidrBlocks: { SecondaryCidrBlock: string[] };
  CloudResources: { CloudResourceSetType: CloudResource[] };
  Ipv6CidrBlocks?: { Ipv6CidrBlock: Ipv6CidrBlock[] };
  SupportIpv4Gateway: boolean;
  Ipv4GatewayId: string;
  NetworkAclNum: number;
}
