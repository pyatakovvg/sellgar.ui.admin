import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { loadEnv, type ConfigEnv, type Plugin, type UserConfig } from 'vite';

export class ServiceWorkerBuildPlugin implements Plugin {
  readonly name = 'sellgar:service-worker-build';
  private readonly buildId?: string;

  constructor(buildId?: string) {
    this.buildId = buildId;
  }

  readonly config = (config: UserConfig, environment: ConfigEnv): UserConfig => {
    const root = resolve(config.root ?? process.cwd());
    const envDir = config.envDir === false ? false : resolve(root, config.envDir ?? '.');
    const env = loadEnv(environment.mode, envDir, 'VITE_APP_BUILD_ID');
    const buildId =
      this.buildId ?? env.VITE_APP_BUILD_ID ?? (environment.command === 'build' ? randomUUID() : 'development');

    return {
      define: {
        'import.meta.env.VITE_APP_BUILD_ID': JSON.stringify(buildId),
      },
    };
  };
}
