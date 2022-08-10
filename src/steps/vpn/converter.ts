import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { VPNEntities } from './constants';
import { VPNGateway } from './types';

export function createVPNGatewayEntity(vpnGateway: VPNGateway): Entity {
  return createIntegrationEntity({
    entityData: {
      source: vpnGateway,
      assign: {
        _type: VPNEntities.VPN_GATEWAY._type,
        _class: VPNEntities.VPN_GATEWAY._class,
        _key: `alibaba_cloud_vpn_gateway:${vpnGateway.VpnGatewayId}`,
        status: vpnGateway.Status,
        active: vpnGateway.Status === 'active',
        ipsecVpn: vpnGateway.IpsecVpn,
        sslVpn: vpnGateway.SslVpn,
        vpnType: vpnGateway.VpnType,
        enableBgp: vpnGateway.EnableBgp,
        createdOn: vpnGateway.CreateTime,
        endedOn: vpnGateway.EndTime,
        businessStatus: vpnGateway.BusinessStatus,
        name: vpnGateway.Name,
        vpcId: vpnGateway.VpcId,
        vpnGatewayId: vpnGateway.VpnGatewayId,
        chargeType: vpnGateway.ChargeType,
        networkType: vpnGateway.NetworkType,
        spec: vpnGateway.Spec,
        tag: vpnGateway.Tag,
        category: ['network'],
        function: ['other'],
        public: vpnGateway.NetworkType === 'public',
      },
    },
  });
}
