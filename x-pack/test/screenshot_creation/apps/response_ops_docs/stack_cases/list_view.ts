/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../../ftr_provider_context';

export default function ({ getService }: FtrProviderContext) {
  const cases = getService('cases');
  const commonScreenshots = getService('commonScreenshots');

  const screenshotDirectories = ['response_ops_docs', 'stack_cases'];

  describe('list view', function () {
    it('cases list screenshot', async () => {
      await cases.navigation.navigateToApp();
      await commonScreenshots.takeScreenshot('cases', screenshotDirectories, 1500, 1080);
    });
  });
}
