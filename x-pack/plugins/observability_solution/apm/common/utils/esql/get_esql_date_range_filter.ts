/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import moment from 'moment';
import { string } from '.';

export function getEsqlDateRangeFilter(from: number | string, to: number | string) {
  return `@timestamp >= ${string`${moment(from).toISOString()}`} AND @timestamp < ${string`${moment(
    to
  ).toISOString()}`}`;
}
