import { Component } from '@angular/core';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css'],
})
export class ImagemComponent {
  //Exibir nome em tela e demais fins
  fileName = '';

  //Vou atribuir aqui o arquivo do upload
  currentFile?: File;

  //para exibir na tela eu preciso ter uma URL da imagem e quando converto do upload para file não tenho esse dado
  //Pelo debug esse cara é um blob
  fileUrl: any = '';

  //vou componentizar esse cara para o projeto então a ideia é que ele seja preenchido conforme as funções do componente sejam preenchidas
  tamanhoArquivo: string = '';
  extensaoArquivo: string = '';

  //não achei uma forma melhor de tipar esse $event pois dentro dele tem muita informação e o TS da problema de tipagem na navegação do objeto tentei como Event e File e deu erro
  selecionaArquivo(event: any) {
    if (
      event.target.files && event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg')
    ) {
      this.fileName = ''; //Limpa o campo

      //Como só uso um arquivo neste mecanismo de upload vou pegar o primeiro da fila
      const file: File = event.target.files[0];
      this.currentFile = file;
      console.log(file);

      //para exibir na tela eu preciso ter uma URL da imagem e quando converto do upload para file não tenho esse dado
      this.fileUrl = URL.createObjectURL(this.currentFile);
      console.log(this.fileUrl);

      this.fileName = file.name;
      this.tamanhoArquivo = this.formatarTamanhoArquivo(file.size);
      this.extensaoArquivo = file.type;
    } else {
      this.fileName = 'Tipo de arquivo incompatível !';
    }
  }

  private formatarTamanhoArquivo(tamanhoBytes: number): string {
    if (tamanhoBytes < 1024) {
      return tamanhoBytes + ' B';
    } else if (tamanhoBytes < 1024 * 1024) {
      //Já verifica se o arquivo é menor do que 1 Mb
      return (tamanhoBytes / 1024).toFixed(2) + ' KB';
    } else {
      return (tamanhoBytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  }
}
