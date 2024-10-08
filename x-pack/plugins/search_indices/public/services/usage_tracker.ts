/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { METRIC_TYPE, UiCounterMetricType } from '@kbn/analytics';
import type {
  UsageCollectionSetup,
  UsageCollectionStart,
} from '@kbn/usage-collection-plugin/public';
import { AppUsageTracker } from '../types';

const APP_TRACKER_NAME = 'searchIndices';

export function createUsageTracker(
  usageCollection?: UsageCollectionSetup | UsageCollectionStart
): AppUsageTracker {
  const track = (type: UiCounterMetricType, name: string | string[]) =>
    usageCollection?.reportUiCounter(APP_TRACKER_NAME, type, name);

  return {
    click: (eventName: string | string[]) => {
      track(METRIC_TYPE.CLICK, eventName);
    },
    count: (eventName: string | string[]) => {
      track(METRIC_TYPE.COUNT, eventName);
    },
    load: (eventName: string | string[]) => {
      track(METRIC_TYPE.LOADED, eventName);
    },
  };
}

export function createEmptyUsageTracker(): AppUsageTracker {
  return {
    click: (_eventName: string | string[]) => {},
    count: (_eventName: string | string[]) => {},
    load: (_eventName: string | string[]) => {},
  };
}
