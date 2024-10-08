/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { EuiFlyout, EuiFlyoutBody, EuiTabbedContent } from '@elastic/eui';

import { DataView } from '@kbn/data-views-plugin/public';
import { ScriptingSyntax } from './scripting_syntax';
import { TestScript } from './test_script';

import { ExecuteScript } from '../../types';

interface ScriptingHelpFlyoutProps {
  indexPattern: DataView;
  lang: string;
  name?: string;
  script?: string;
  executeScript: ExecuteScript;
  isVisible: boolean;
  onClose: () => void;
}

export const ScriptingHelpFlyout: React.FC<ScriptingHelpFlyoutProps> = ({
  isVisible = false,
  onClose = () => {},
  indexPattern,
  lang,
  name,
  script,
  executeScript,
}) => {
  const tabs = [
    {
      id: 'syntax',
      name: 'Syntax',
      ['data-test-subj']: 'syntaxTab',
      content: <ScriptingSyntax />,
    },
    {
      id: 'test',
      name: 'Preview results',
      ['data-test-subj']: 'testTab',
      content: (
        <TestScript
          indexPattern={indexPattern}
          lang={lang}
          name={name}
          script={script}
          executeScript={executeScript}
        />
      ),
    },
  ];

  return isVisible ? (
    <EuiFlyout onClose={onClose} data-test-subj="scriptedFieldsHelpFlyout">
      <EuiFlyoutBody>
        <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} />
      </EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
};

ScriptingHelpFlyout.displayName = 'ScriptingHelpFlyout';
