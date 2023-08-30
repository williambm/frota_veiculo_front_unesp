import { ImagemService } from './../../../services/imagem.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.css'],
})
export class ImagemComponent {
  //Criando uma comunicação do Filho para o Pai é uma espécie de RxJS
  @Output() fotoCadastrada$ :EventEmitter<number> = new EventEmitter<number>();

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

  public categoria:string='';

  constructor(private imgService: ImagemService) {}

  //não achei uma forma melhor de tipar esse $event pois dentro dele tem muita informação e o TS da problema de tipagem na navegação do objeto tentei como Event e File e deu erro
  selecionaArquivo(event: any) {
    if (
      event.target.files &&
      event.target.files[0] &&
      (event.target.files[0].type == 'image/png' ||
        event.target.files[0].type == 'image/jpeg')
    ) {
      this.fileName = ''; //Limpa o campo

      //Como só uso um arquivo neste mecanismo de upload vou pegar o primeiro da fila
      const file: File = event.target.files[0];
      this.currentFile = file;
      console.log(file);

      //para exibir na tela eu preciso ter uma URL da imagem e quando converto do upload para file não tenho esse dado
      this.fileUrl = URL.createObjectURL(this.currentFile);
      console.log(this.fileUrl);
      console.log(this.categoria);

      this.fileName = file.name;
      this.tamanhoArquivo = this.formatarTamanhoArquivo(file.size);
      this.extensaoArquivo = file.type;
    } else {
      this.fileName = 'Arquivo incompatível !';
    }
  }

  upload() {
    //Com o ! eu estou asusmindo a responsabilidade de que aqui vai estar preenchida a variável currentFile com um File
    this.imgService.uploadImg$(this.currentFile!).subscribe({
      next: (resposta) => {
        console.log(resposta)
        //Aqui eu capturo o evento do @Output e com o emit notifico o componente Pai passando o ID da Imagem relacionada a entidade
        this.fotoCadastrada$.emit(resposta.id)
      },
      error: (respostaErrro) => console.log(respostaErrro),
    });
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
