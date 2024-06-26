export class Script {
  name: string;
  script: string;
  pending: boolean;
  timestamp: number;
  constructor(
    name: string,
    script: string,
    pending: boolean,
    timestamp = Date.now()
  ) {
    this.name = name;
    this.script = script;
    this.pending = pending;
    this.timestamp = timestamp;
  }
}
