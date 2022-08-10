import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { VPNSteps } from './constants';

describe('#vpn', () => {
  let recording: Recording;
  afterEach(async () => {
    await recording.stop();
  });

  test('fetch-vpn-gateways', async () => {
    recording = setupProjectRecording({
      directory: __dirname,
      name: 'fetch-vpn-gateways',
    });

    const stepConfig = buildStepTestConfigForStep(
      VPNSteps.FETCH_VPN_GATEWAYS.id,
    );
    const stepResult = await executeStepWithDependencies(stepConfig);
    expect(stepResult).toMatchStepMetadata(stepConfig);
  }, 20000);
});
