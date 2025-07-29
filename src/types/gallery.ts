export interface BeforeAfterImage {
  id: string
  before: {
    src: string
    alt: string
    thumbnail?: string
  }
  after: {
    src: string
    alt: string
    thumbnail?: string
  }
}
