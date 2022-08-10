export interface VPNGateway {
  Status?: string;
  IpsecVpn?: string;
  SslVpn?: string;
  VpnType?: string;
  EnableBgp?: boolean;
  CreateTime?: number;
  EndTime?: number;
  BusinessStatus?: string;
  Name?: string;
  VpcId?: string;
  VpnGatewayId: string;
  ChargeType?: string;
  NetworkType?: string;
  Spec?: string;
  Tag?: string;
}
