export class RequestState {
  constructor(
    public base: string,
    public timePeriod: string,
    public offset: number,
    public limit: number,
    public order: string,
    public symbols: string) {
  }
}
