export class EventData {
  public fromHour: number;
  public toHour: number;
  public title: string;
  public id: number;

  constructor(data: any) {
    this.fromHour = data.fromHour ? data.fromHour : null;
    this.toHour = data.toHour ? data.toHour : null;
    this.title = data.title ? data.title : null;
    this.id = data.id ? data.id : null;
  }

  getSpan(): number {
    if (this.fromHour < this.toHour) return this.toHour - this.fromHour;
    return 1;
  }
}
