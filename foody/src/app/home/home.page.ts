import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProductsService } from "../services/products/products.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  /* Declaring tags, product list */
  current_tags:any = [];
  productList:any = [];
  searchable_tags:any = [];
  similarProducts:any = [];

  constructor( private storage: Storage,
               private _productService: ProductsService)
              {
                  this._productService.setProducts();
                  this._productService.setSimilarProducts();
                  this._productService.setMandatoryHashtags();
                  this._productService.setSerchableHashtags();
              }

  ngOnInit(){
  }

  ngAfterViewInit(){
  /* Fetching products to display for default tags */
    setTimeout(() => {
      this.getdefaultTags();
      this.getsearchableTags();
      this.getSimilarProducts();
    }, 1000);
  }

  /* function to fetch the Products depending on the requirements */
  getProducts(tags){
    this._productService.getProducts(tags).then(data => {
      data.forEach(element => {
        element.comments = this._productService.kFormatter(element.comments);
        element.likes = this._productService.kFormatter(element.likes);
      });
      this.productList = data;
    }, err => {
    });
  }

  /* Inlcude the required hashtag to search products */
  searchProducts(tag){
    let pos = this.searchable_tags.findIndex(x => x == tag);
    this.searchable_tags.splice(pos, 1);
    this.current_tags.push(tag);
    this.getProducts(this.current_tags);
  }

  /* Remove the tags from the chips inputs to get the requirement */
  removeTag(tag){
    let pos = this.current_tags.findIndex(x => x == tag);
    this.current_tags.splice(pos, 1);
    this.getProducts(this.current_tags);
    this.searchable_tags.push(tag);
  }


  /* To fetch the similar products show in the page */
  getSimilarProducts(){
    this._productService.getSimilarProducts().then(data=>{
      data.forEach(element => {
        element.comments = this._productService.kFormatter(element.comments);
        element.likes = this._productService.kFormatter(element.likes);
      });
      this.similarProducts = data;
    });
  }

  /* function to fetch the Products depending on the tags */
  getdefaultTags() {
    this._productService.getdefaultTags().then(data => {
      this.current_tags = data;
      this.getProducts(this.current_tags);
    }, err => {
    });
  }

  /* function to fetch the Products depending on the tags */
  getsearchableTags() {
    this._productService.getsearchableTags().then(data => {
      this.searchable_tags = data;
    }, err => {
    });
  }

}
