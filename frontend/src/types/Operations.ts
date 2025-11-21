import type { Module } from "./Module";

export interface Operations {
  id: string;
  idModule: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt?: string;

  module?: Module;
}
