import AlibabaClient from '@alicloud/pop-core';
import { ResourceIteratee } from '../../../client/client';
import { IntegrationConfig } from '../../../config';
import {
  ListUsersResponse,
  ListGroupsResponse,
  ListRolesResponse,
  ListPoliciesResponse,
} from './types/response';
import { User, Group, Role, Policy } from '../types';
import { RegionalServiceClient } from '../../../client/regionalClient';
import {
  ListUsersParameters,
  ListGroupsParameters,
  ListRolesParameters,
  ListPoliciesParameters,
  RAMRequest,
} from './types/request';
import { ECS_REGIONS } from '../../../regions';
import { IntegrationLogger } from '@jupiterone/integration-sdk-core';

export class RAMClient extends RegionalServiceClient {
  private client: AlibabaClient;
  private perPage = 100;
  constructor(config: IntegrationConfig, logger: IntegrationLogger) {
    super({ logger });

    this.client = new AlibabaClient({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: 'https://ram.aliyuncs.com',
      apiVersion: '2015-05-01',
    });

    this.getRegions = (): Promise<string[]> => Promise.resolve(ECS_REGIONS);
  }

  public async iterateUsers(iteratee: ResourceIteratee<User>): Promise<void> {
    let start = true;
    let marker: string | undefined = '';
    do {
      if (start) {
        start = false;
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListUsers',
          parameters,
        };

        const response = await this.request<ListUsersResponse>(req);
        const users = response.Users.User;
        marker = response.Marker;
        for (const user of users) {
          await iteratee(user);
        }
      } else if (marker) {
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
          Marker: marker,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListUsers',
          parameters,
        };

        const response = await this.request<ListUsersResponse>(req);
        const users = response.Users.User;
        marker = response.Marker;
        for (const user of users) {
          await iteratee(user);
        }
      }
    } while (marker);
  }

  public async iterateGroups(iteratee: ResourceIteratee<Group>): Promise<void> {
    let start = true;
    let marker: string | undefined = '';
    do {
      if (start) {
        start = false;
        const parameters: ListGroupsParameters = {
          MaxItems: this.perPage,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListGroups',
          parameters,
        };

        const response = await this.request<ListGroupsResponse>(req);
        const groups = response.Groups.Group;
        marker = response.Marker;
        for (const group of groups) {
          await iteratee(group);
        }
      } else if (marker) {
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
          Marker: marker,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListGroups',
          parameters,
        };

        const response = await this.request<ListGroupsResponse>(req);
        const groups = response.Groups.Group;
        marker = response.Marker;
        for (const group of groups) {
          await iteratee(group);
        }
      }
    } while (marker);
  }

  public async iterateRoles(iteratee: ResourceIteratee<Role>): Promise<void> {
    let start = true;
    let marker: string | undefined = '';
    do {
      if (start) {
        start = false;
        const parameters: ListRolesParameters = {
          MaxItems: this.perPage,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListRoles',
          parameters,
        };

        const response = await this.request<ListRolesResponse>(req);
        const roles = response.Roles.Role;
        marker = response.Marker;
        for (const role of roles) {
          await iteratee(role);
        }
      } else if (marker) {
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
          Marker: marker,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListRoles',
          parameters,
        };

        const response = await this.request<ListRolesResponse>(req);
        const roles = response.Roles.Role;
        marker = response.Marker;
        for (const role of roles) {
          await iteratee(role);
        }
      }
    } while (marker);
  }

  public async iteratePoliciesOfUser(
    userName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      UserName: userName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForUser',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }

  public async iteratePoliciesOfGroup(
    groupName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      GroupName: groupName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForGroup',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }
  public async iteratePoliciesOfRole(
    roleName: string,
    iteratee: ResourceIteratee<Policy>,
  ): Promise<void> {
    const parameters: ListPoliciesParameters = {
      RoleName: roleName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListPoliciesForRole',
      parameters,
    };

    const response = await this.request<ListPoliciesResponse>(req);
    const policies = response.Policies.Policy;
    for (const policy of policies) {
      await iteratee(policy);
    }
  }

  public async iterateUsersOfGroups(
    groupName: string,
    iteratee: ResourceIteratee<User>,
  ): Promise<void> {
    let start = true;
    let marker: string | undefined = '';
    do {
      if (start) {
        start = false;
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
          GroupName: groupName,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListUsersForGroup',
          parameters,
        };

        const response = await this.request<ListUsersResponse>(req);
        const users = response.Users.User;
        marker = response.Marker;
        for (const user of users) {
          await iteratee(user);
        }
      } else if (marker) {
        const parameters: ListUsersParameters = {
          MaxItems: this.perPage,
          GroupName: groupName,
          Marker: marker,
        };

        const req: RAMRequest = {
          client: this.client,
          action: 'ListUsersForGroup',
          parameters,
        };

        const response = await this.request<ListUsersResponse>(req);
        const users = response.Users.User;
        marker = response.Marker;
        for (const user of users) {
          await iteratee(user);
        }
      }
    } while (marker);
  }

  public async iterateUsersOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<User>,
  ): Promise<void> {
    const parameters: ListUsersParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListUsersResponse>(req);
    const users = response.Users.User;
    for (const user of users) {
      await iteratee(user);
    }
  }

  public async iterateGroupsOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<Group>,
  ): Promise<void> {
    const parameters: ListGroupsParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListGroupsResponse>(req);
    const groups = response.Groups.Group;
    for (const group of groups) {
      await iteratee(group);
    }
  }

  public async iterateRolesOfPolicy(
    policyType: string,
    policyName: string,
    iteratee: ResourceIteratee<Role>,
  ): Promise<void> {
    const parameters: ListRolesParameters = {
      PolicyType: policyType,
      PolicyName: policyName,
    };

    const req: RAMRequest = {
      client: this.client,
      action: 'ListEntitiesForPolicy',
      parameters,
    };

    const response = await this.request<ListRolesResponse>(req);
    const roles = response.Roles.Role;
    for (const role of roles) {
      await iteratee(role);
    }
  }
}

export function createRAMClient(
  config: IntegrationConfig,
  logger: IntegrationLogger,
): RAMClient {
  return new RAMClient(config, logger);
}
