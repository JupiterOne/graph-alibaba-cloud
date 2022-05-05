import {
  setupRecording,
  Recording,
  SetupRecordingInput,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupProjectRecording(
  input: Omit<SetupRecordingInput, 'mutateEntry'>,
): Recording {
  return setupRecording({
    ...input,
    options: {
      matchRequestsBy: {
        method: true,
        headers: false,
        body: false,
        url: {
          hostname: true,
          protocol: true,
          query: (query, req) => {
            return {
              ...query,
              AccessKeyId: undefined,
              Timestamp: undefined,
              Signature: undefined,
              SignatureNonce: undefined,
            };
          },
        },
      },
      ...input.options,
    },
    redactedRequestHeaders: ['Authorization'],
    redactedResponseHeaders: ['set-cookie'],
    mutateEntry: (entry) => {
      redact(entry);
    },
  });
}

function redact(entry: any): void {
  entry.request.url = '[REDACTED]';
  if (entry.request.queryString) {
    entry.request.queryString.forEach(
      (query: { name: string; value: string }) => {
        if (query.name === 'AccessKeyId' || query.name === 'Signature') {
          query.value = '[REDACTED]';
        }
      },
    );
  }
}
