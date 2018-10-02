import { DocumentNode, Source } from 'graphql';

export function mergeTypes(
  types: Array<string | Source | DocumentNode>,
  options?: { all: boolean }
): string;

export function mergeResolvers<T>(args: T[]): T;

export function fileLoader(
  path: string,
  options?: {
    recursive?: boolean;
    extensions?: string[];
    ignoreIndex: boolean;
    globOptions?: object;
  }
): Array<string | any>;
