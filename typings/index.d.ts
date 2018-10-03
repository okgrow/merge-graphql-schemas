import { DocumentNode, Source } from 'graphql';
import { IOptions } from 'glob';

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
    globOptions?: IOptions;
  }
): Array<string | any>;
