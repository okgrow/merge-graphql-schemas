import { DocumentNode } from 'graphql';

export function mergeTypes(
  types: Array<string | DocumentNode>,
  options?: { all: boolean }
): string;

export function mergeResolvers<T>(args: T[]): T;

export function fileLoader(
  path: string,
  options?: {
    recursive?: boolean;
    extensions?: string[];
    globOptions?: object;
  }
): string[];
