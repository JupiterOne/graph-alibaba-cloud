import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { VPCSteps } from './constants';

describe('#vpc', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-vpcs', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-vpcs',
    });

    const stepConfig = buildStepTestConfigForStep(VPCSteps.FETCH_VPCs.id);
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  });
});
