export class Settings {
  name!: string;
  connected!: boolean;
  constructor(name?: string, connected?: boolean) {
    this.name = name ?? "server-mehmetuysal.dev-listener";
    this.connected = connected != undefined ? connected : false;
  }
}

export class ProjectSettings {
  name!: string;
  repo!: string;
  folder!: string;
  command!: string;
  env!: string;
  outdated!: boolean;
  timestamp!: number;
  constructor(
    name: string,
    repo: string,
    folder: string,
    command: string,
    env: string,
    outdated: boolean,
    timestamp: number
  ) {
    this.name = name;
    this.repo = repo;
    this.folder = folder;
    this.command = command;
    this.env = env;
    this.outdated = outdated;
    this.timestamp = timestamp;
  }
}
