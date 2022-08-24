export type Gen<T> = {
  [Key in keyof T]?: T[Key];
};
export type TType<T> = {
  [Key in keyof T]: T;
};

export type Res<T> = {
  [Key in keyof T]: (val: T[Key]) => string;
};

export type Re<T> = {
  [Key in keyof T]: Partial<Record<keyof T, T[Key]>>;
};
