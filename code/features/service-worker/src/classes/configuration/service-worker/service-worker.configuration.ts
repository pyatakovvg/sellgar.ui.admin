export abstract class ServiceWorkerConfiguration {
  abstract readonly buildId: string;
  abstract readonly requireBuildIdChange: boolean;
}
