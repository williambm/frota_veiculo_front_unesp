import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/endpoints';
import { Imagem } from '../model/imagem';

@Injectable({
  providedIn: 'root',
})
export class ImagemService {
  constructor(private http: HttpClient) {}

  uploadImg$ = (file: File, categoria: string): Observable<Imagem> => {
    const formData: FormData = new FormData(); //Por ser uma requisição MultiPart para trabalhar com arquivos tenho que usar o FormData
    formData.append('img', file); //img aqui tem que ser o mesmo nome do parâmetro Multipart no PostMapping do Backend
    formData.append('categoria', categoria); //img aqui tem que ser o mesmo nome do parâmetro Multipart no PostMapping do Backend
    //Retorno o body
    return this.http.post<Imagem>(`${API_CONFIG.baseUrl}/imagens`, formData);
  };

  getImg$ = (id: number): Observable<Blob> => {
    //Ajusta o conten Type do Header
    const header = new HttpHeaders({ 'Content-Type': 'image/png' });

    return this.http.get<Blob>(`${API_CONFIG.baseUrl}/imagens/${id}`, {
      headers: header,
      responseType: 'blob' as 'json', //Aqui eu aviso que o response type sera do tipo blob mesmo que ainda esteja como um json - força ser blob!
    });
  };
}
