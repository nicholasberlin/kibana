/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import {
  CustomIntegration,
  ROUTES_APPEND_CUSTOM_INTEGRATIONS,
  ROUTES_REPLACEMENT_CUSTOM_INTEGRATIONS,
} from '../../../common';
import { KibanaPluginServiceFactory } from '../types';

import { CustomIntegrationsStartDependencies } from '../../types';
import { CustomIntegrationsFindService, filterCustomIntegrations } from '../find';

/**
 * A type definition for a factory to produce the `CustomIntegrationsFindService` for use in Kibana.
 */
export type CustomIntegrationsFindServiceFactory = KibanaPluginServiceFactory<
  CustomIntegrationsFindService,
  CustomIntegrationsStartDependencies
>;

/**
 * A factory to produce the `CustomIntegrationsFindService` for use in Kibana.
 */
export const findServiceFactory: CustomIntegrationsFindServiceFactory = ({ coreStart }) => ({
  findAppendedIntegrations: async (params) => {
    const integrations: CustomIntegration[] = await coreStart.http.get(
      ROUTES_APPEND_CUSTOM_INTEGRATIONS
    );

    return filterCustomIntegrations(integrations, params);
  },
  findReplacementIntegrations: async (params) => {
    const replacements: CustomIntegration[] = await coreStart.http.get(
      ROUTES_REPLACEMENT_CUSTOM_INTEGRATIONS
    );

    return filterCustomIntegrations(replacements, params);
  },
});
