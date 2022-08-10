import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { ECSSteps } from './constants';

describe('#ecs', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-ecs-instances', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-ecs-instances',
    });

    const stepConfig = buildStepTestConfigForStep(ECSSteps.FETCH_ECS_INSTANCES);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);

  test('build-vpc-has-ecs-instance-relationship', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'build-vpc-has-ecs-instance-relationship',
    });

    const stepConfig = buildStepTestConfigForStep(
      ECSSteps.BUILD_VPC_ECS_INSTANCE_RELATIONSHIPS,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });
});
