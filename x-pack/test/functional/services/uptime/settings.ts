/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { DynamicSettings } from '@kbn/synthetics-plugin/common/runtime_types';
import { FtrProviderContext } from '../../ftr_provider_context';

export function UptimeSettingsProvider({ getService }: FtrProviderContext) {
  const testSubjects = getService('testSubjects');
  const retry = getService('retry');

  const changeInputField = async (text: string, field: string) => {
    const input = await testSubjects.find(field, 5000);
    await input.clearValueWithKeyboard();
    await input.type(text);
  };

  return {
    go: async () => {
      await testSubjects.click('settings-page-link', 5000);
    },

    changeHeartbeatIndicesInput: async (text: string) => {
      await changeInputField(text, 'heartbeat-indices-input-loaded');
    },
    changeErrorThresholdInput: async (text: string) => {
      await changeInputField(text, 'expiration-threshold-input-loaded');
    },
    changeWarningThresholdInput: async (text: string) => {
      await changeInputField(text, 'age-threshold-input-loaded');
    },
    loadFields: async (): Promise<DynamicSettings> => {
      const indInput = await testSubjects.find('heartbeat-indices-input-loaded', 5000);
      const expirationInput = await testSubjects.find('expiration-threshold-input-loaded', 5000);
      const ageInput = await testSubjects.find('age-threshold-input-loaded', 5000);
      const heartbeatIndices = (await indInput.getAttribute('value')) ?? '0';
      const expiration = (await expirationInput.getAttribute('value')) ?? '0';
      const age = (await ageInput.getAttribute('value')) ?? '0';

      return {
        heartbeatIndices,
        certAgeThreshold: parseInt(age, 10),
        certExpirationThreshold: parseInt(expiration, 10),
        defaultConnectors: [],
        defaultEmail: { to: [], cc: [], bcc: [] },
      };
    },
    applyButtonIsDisabled: async () => {
      return !!(await (await testSubjects.find('apply-settings-button')).getAttribute('disabled'));
    },
    apply: async () => {
      await (await testSubjects.find('apply-settings-button')).click();
      await retry.waitFor('submit to succeed', async () => {
        // When the form submit is complete the form will no longer be disabled
        const disabled = await (
          await testSubjects.find('heartbeat-indices-input-loaded', 5000)
        ).getAttribute('disabled');
        return disabled === null;
      });
    },
  };
}
