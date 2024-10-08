/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from '@kbn/shared-ux-router';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageTemplate,
  EuiPageSection,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

import { CoreStart } from '@kbn/core/public';
import { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';
import {
  ScreenshotModePluginSetup,
  KBN_SCREENSHOT_MODE_HEADER,
} from '@kbn/screenshot-mode-plugin/public';

import { PLUGIN_NAME, BASE_API_ROUTE } from '../../common';

interface ScreenshotModeExampleAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  screenshotMode: ScreenshotModePluginSetup;
}

export const ScreenshotModeExampleApp = ({
  basename,
  notifications,
  http,
  navigation,
  screenshotMode,
}: ScreenshotModeExampleAppDeps) => {
  const isScreenshotMode = screenshotMode.isScreenshotMode();

  useEffect(() => {
    // fire and forget
    http.get(`${BASE_API_ROUTE}/check_is_screenshot`, {
      headers: isScreenshotMode ? { [KBN_SCREENSHOT_MODE_HEADER]: 'true' } : undefined,
    });
    notifications.toasts.addInfo({
      title: 'Welcome to the screenshot example app!',
      text: isScreenshotMode
        ? 'In screenshot mode we want this to remain visible'
        : 'In normal mode this toast will disappear eventually',
      toastLifeTimeMs: isScreenshotMode ? 360000 : 3000,
    });
  }, [isScreenshotMode, notifications, http]);
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_NAME}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="screenshotModeExample.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageTemplate.Section>
                <EuiPageHeader>
                  <EuiTitle>
                    <h2>
                      {isScreenshotMode ? (
                        <FormattedMessage
                          id="screenshotModeExample.screenshotModeTitle"
                          defaultMessage="We are in screenshot mode!"
                        />
                      ) : (
                        <FormattedMessage
                          id="screenshotModeExample.normalModeTitle"
                          defaultMessage="We are not in screenshot mode!"
                        />
                      )}
                    </h2>
                  </EuiTitle>
                </EuiPageHeader>
                <EuiPageSection>
                  <EuiText>
                    {isScreenshotMode ? (
                      <p>We detected screenshot mode. The chrome navbar should be hidden.</p>
                    ) : (
                      <p>
                        This is how the app looks in normal mode. The chrome navbar should be
                        visible.
                      </p>
                    )}
                  </EuiText>
                </EuiPageSection>
              </EuiPageTemplate.Section>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
