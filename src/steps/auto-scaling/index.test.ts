import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { AutoScalingSteps } from './constants';

describe('#vpn', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-scaling-groups', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-scaling-groups',
    });

    const stepConfig = buildStepTestConfigForStep(
      AutoScalingSteps.FETCH_AUTOSCALING_GROUPS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 300000);

  test('build-scaling-groups-vpc-relationship', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-scaling-groups-vpc-relationship',
    });

    const stepConfig = buildStepTestConfigForStep(
      AutoScalingSteps.BUILD_VPC_AUTOSCALING_GROUP_RELATIONSHIPS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 300000);
});
