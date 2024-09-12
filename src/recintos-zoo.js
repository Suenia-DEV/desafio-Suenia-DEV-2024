class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animaisHabilitados = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false, condicaoEspecial: true }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      
      if (!this.animaisHabilitados[tipoAnimal]) {
        return { erro: "Animal inválido" };
      }
      if (isNaN(quantidade) || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animal = this.animaisHabilitados[tipoAnimal];
      const espacoNecessario = (animal.tamanho * quantidade) + (quantidade > 1 ? 1 : 0);
  
      let recintosViaveis = [];
  
      this.recintos.forEach(recinto => {
        let espacoOcupado = 0;
        let especiesNoRecinto = new Set();
        let podeAdicionar = true;
  
        recinto.animaisExistentes.forEach(animalExistente => {
          espacoOcupado += animalExistente.quantidade * this.animaisHabilitados[animalExistente.especie].tamanho;
          especiesNoRecinto.add(animalExistente.especie);
  
          
          if (animal.carnivoro && animalExistente.especie !== tipoAnimal) {
            podeAdicionar = false;
          }
          if (this.animaisHabilitados[animalExistente.especie].carnivoro && animalExistente.especie !== tipoAnimal) {
            podeAdicionar = false;
          }
  
          
          if (animal.condicaoEspecial && recinto.bioma !== 'savana e rio') {
            podeAdicionar = false;
          }
        });
  
        
        if (animal.biomas.includes(recinto.bioma) && podeAdicionar) {
          let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
          let espacoRestante = espacoDisponivel - espacoNecessario;
  
          if (especiesNoRecinto.size > 0) {
            espacoRestante -= 1; 
          }
  
          if (espacoRestante >= 0) {
            recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoRestante}, total: ${recinto.tamanhoTotal})`);
          }
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis: recintosViaveis.sort() };
    }
  }
  
  
  export { RecintosZoo as RecintosZoo };
  
  // Testando a classe
  const zoo = new RecintosZoo();
  console.log(zoo.analisaRecintos('LEAO', 1));  // Exemplo de uso
  console.log(zoo.analisaRecintos('MACACO', 2));  // Outro exemplo
  console.log(zoo.analisaRecintos('HIPOPOTAMO', 1));  // Hipopótamo
  console.log(zoo.analisaRecintos('TIGRE', 1));  // Animal inválido
  console.log(zoo.analisaRecintos('LEOPARDO', 0));  // Quantidade inválida
  