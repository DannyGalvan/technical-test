import { Container } from "inversify";

export class InversifyAdapter {
  constructor(private readonly container: Container) { }

  get<T>(someClass: any): T {
    try {
      //console.log(`Intentando resolver: ${someClass.name || someClass}`);

      // Primero intentar obtener directamente por la clase
      if (this.container.isBound(someClass)) {
        const instance = this.container.get<T>(someClass);
        //console.log(`✅ Resuelto: ${someClass.name}`);
        return instance;
      }

      //console.error(`❌ No se pudo resolver: ${someClass.name}`);
      throw new Error(`Clase ${someClass.name} no está registrada en el contenedor`);
    } catch (error) {
      console.error(`Error resolviendo ${someClass.name}:`, error);
      throw error;
    }
  }
}