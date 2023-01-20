export class Merchant {
  public id: number
  public lat: number
  public lng: number
  public hp2: string
  public color: string
  public address?: string
  public postalCode?: string
  private colors: string[] = ['#5DFDCB', '#7CC6FE', '#F4FAFF', '#8789C0']

  constructor(options: any) {
    this.id = options.id
    this.lat = options.lat
    this.lng = options.lng
    this.hp2 = options.hp2
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
    this.postalCode = options.postal_code
    this.address = options.address
  }

  static fromObject(data: object) {
    return new Merchant(data)
  }

  toArrayCoordinate(): number[] {
    return [this.lng, this.lat]
  }

  toPointString(): string {
    return `${this.lng},${this.lat}`
  }
}
