/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

const id = Symbol('id');

const isBucketLike = (bucket: unknown): bucket is { key: unknown } => {
  return Boolean(bucket && typeof bucket === 'object' && 'key' in bucket);
};

function getKeysFromBucket(bucket: unknown) {
  if (!isBucketLike(bucket)) {
    throw new Error('bucket malformed - no key found');
  }
  return Array.isArray(bucket.key)
    ? bucket.key.map((keyPart) => String(keyPart))
    : [String(bucket.key)];
}

export class MultiFieldKey {
  [id]: string;
  keys: string[];

  constructor(bucket: unknown) {
    this.keys = getKeysFromBucket(bucket);

    this[id] = MultiFieldKey.idBucket(bucket);
  }
  static idBucket(bucket: unknown) {
    return getKeysFromBucket(bucket).join(',');
  }

  toString() {
    return this[id];
  }
}

export function isMultiFieldKey(field: unknown): field is MultiFieldKey {
  return field instanceof MultiFieldKey;
}

/**
 * Multi-field key separator used in Visualizations (Lens, AggBased, TSVB).
 * This differs from the separator used in the toString method of the MultiFieldKey
 */
export const MULTI_FIELD_KEY_SEPARATOR = ' › ';
