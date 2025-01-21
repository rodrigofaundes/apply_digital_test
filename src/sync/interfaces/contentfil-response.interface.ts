export interface ContentfulResponse {
  sys:   ContentfulResponseSys;
  total: number;
  skip:  number;
  limit: number;
  items: Item[];
}

export interface Item {
  metadata: Metadata;
  sys:      ItemSys;
  fields:   Fields;
}

export interface Fields {
  sku:      string;
  name:     string;
  brand:    string;
  model:    string;
  category: Category;
  color:    Color;
  price:    number;
  currency: Currency;
  stock:    number;
}

export enum Category {
  Camera = "Camera",
  Headphones = "Headphones",
  Laptop = "Laptop",
  Smartphone = "Smartphone",
  Smartwatch = "Smartwatch",
  Tablet = "Tablet",
}

export enum Color {
  Black = "Black",
  Blue = "Blue",
  Gray = "Gray",
  Green = "Green",
  Purple = "Purple",
  Red = "Red",
  RoseGold = "Rose Gold",
  Silver = "Silver",
  White = "White",
}

export enum Currency {
  Usd = "USD",
}

export interface Metadata {
  tags:     any[];
  concepts: any[];
}

export interface ItemSys {
  space:            ContentType;
  id:               string;
  type:             FluffyType;
  createdAt:        Date;
  updatedAt:        Date;
  environment:      ContentType;
  publishedVersion: number;
  revision:         number;
  contentType:      ContentType;
  locale:           Locale;
}

export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  type:     PurpleType;
  linkType: LinkType;
  id:       ID;
}

export enum ID {
  Master = "master",
  Product = "product",
  The9Xs1613L9F7V = "9xs1613l9f7v",
}

export enum LinkType {
  ContentType = "ContentType",
  Environment = "Environment",
  Space = "Space",
}

export enum PurpleType {
  Link = "Link",
}

export enum Locale {
  EnUS = "en-US",
}

export enum FluffyType {
  Entry = "Entry",
}

export interface ContentfulResponseSys {
  type: string;
}
