import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CrudService } from './crud.service';
import { Products } from '../models/products';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

@Injectable({
  providedIn: 'root'
})

export class WordpressService extends CrudService<Products, number> {

  nonce: string = ''
  currentTimestamp: number = 0 ;
  customer_key: string = 'ck_9d30eb6f94d274a938e5c2da9a1a9c2d9f6b460e';
  customer_secret: string = 'cs_eb7bb049b6a36f6e68afd732c71559cb3aaa1acf';



  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}/products`);

    
  }


 

  authenticateApi(method,url,params) {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.nonce ='';
    for(var i = 0; i < 6; i++) {
        this.nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }    
    this.currentTimestamp = Math.floor(new Date().getTime() / 1000);

    let authParam:object ={
        oauth_consumer_key : this.customer_key,
        oauth_nonce : this.nonce,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_timestamp : this.currentTimestamp,
        oauth_version : '1.0',
    } 
    let parameters = Object.assign({}, authParam, params);
    let signatureStr:string = '';
    Object.keys(parameters).sort().forEach(function(key) {
        if(signatureStr == '')
            signatureStr += key+'='+parameters[key];
        else
            signatureStr += '&'+key+'='+parameters[key];
    });
    let paramStr:string = '';
    Object.keys(params).sort().forEach(function(key) {

        paramStr += '&'+key+'='+parameters[key];
    });
    return url+'?oauth_consumer_key='+this.customer_key+'&oauth_nonce='+this.nonce+'&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+this.currentTimestamp+'&oauth_version=1.0&oauth_signature='+Base64.stringify(hmacSHA1(method+'&'+encodeURIComponent(url)+'&'+encodeURIComponent(signatureStr),this.customer_secret+'&'))+paramStr;
  }



  getPosts(): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'customer_secret': 'cs_eb7bb049b6a36f6e68afd732c71559cb3aaa1acf',
        'customer_key': 'ck_9d30eb6f94d274a938e5c2da9a1a9c2d9f6b460e',

        'Access-Control-Allow-Credentials': 'true'
      })
    };
    return this._http.get<any[]>('https://shop.migustafood.it/wp-json/wc/v3/products', httpOptions);
  }

  findWordpress(id: number) {
    return this._http.get('http://localhost:3000/posts/' + id)
  }

  getList() {
    return this._http.get('http://localhost:3000/posts/')
  }


  getOrders(params) {
    let orderurl:string = this.authenticateApi('GET',environment.apiURL,params);
    return this._http.get<any>(orderurl, {observe: 'response'});
  }

  

}



