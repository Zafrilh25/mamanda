
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum Age {
  Toddlers = 'toddlers',
  Children = 'children',
  PreTeens = 'pre-teens',
  Teens = 'teens',
  YoungAdults = 'young-adults',
  Adults = 'adults',
  MiddleAges = 'middle-ages',
}

export enum AspectRatio {
  Portrait = '3:4',
  Square = '1:1',
  Landscape = '16:9',
}

export interface ModelSelection {
  gender: Gender;
  age: Age;
}

export interface FileWithPreview extends File {
  preview: string;
}
