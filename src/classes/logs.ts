export class Log {
  level!: "info" | "warn" | "error";
  name!: string;
  status!: "Run" | "Err" | "Res";
  timestamp!: number;
  type!: "Promise" | "Function";
  data!: any[];
}
