import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private storage: Storage) { }

  /* To set the mandatory hash tags to the database */
  public setMandatoryHashtags(){
    let current_tags = ['cheeselove', 'cofluence'];
    this.storage.set('mandatorytags', current_tags)
  }

  /* To set the mandatory hash tags to the database */
  public setSerchableHashtags() {
    let searchable_tags = ['pizza', 'burger'];
    this.storage.set('customtags', searchable_tags)
  }


  /* To get the default tags from the storage */
  public getdefaultTags() {
    let self = this;
    return new Promise((resolve, reject) => {
      self.storage.get('mandatorytags').then((val) => {
        resolve(val);
      });
    });
  }

  /* To get the searchable tags from the storage */
  public getsearchableTags() {
    let self = this;
    return new Promise((resolve, reject) => {
      self.storage.get('customtags').then((val) => {
        resolve(val);
      });
    });
  }


  /* To get the products from the storage based on tags input */
  public getProducts(tags): Promise<any> {
    let self =  this;
    let productList:any = [];
    let checker = (product, tagsSelected) => tagsSelected.every(v => product.includes(v));
    return new Promise((resolve, reject) => {
      self.storage.get('products').then((val) => {
        val.forEach(element => {
          if (checker(tags, element.tags)){
            productList.push(element);
          }
        });
        console.log(productList);

        resolve(productList);
      });
    });
  }

  /* To get the similar products from the storage */
  public getSimilarProducts(): Promise<any> {
    let self = this;
    return new Promise((resolve, reject) => {
      self.storage.get('similarproducts').then((val) => {
        resolve(val);
      });
    });
  }

/* To get the 1000 as k for comments and likes */
public kFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

  /* To set the prodcuts to local storage before fetching it. */
  public setProducts(){
    let products = [
    {
      image: 'assets/images/cheese8.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'video',
      likes: 132,
      comments: 11
    },
    {
      image: 'assets/images/cheese3.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'image',
      likes: 132,
      comments: 11
    },
    {
      image: 'assets/images/cheese6.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'video',
      likes: 132,
      comments: 11
    },
    {
      image: 'assets/images/cheese7.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'image',
      likes: 132,
      comments: 11
    },
    {
      image: 'assets/images/cheese1.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'image',
      likes: 999,
      comments: 48
    },
    {
      image: 'assets/images/cheese2.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'video',
      likes: 336,
      comments: 21
    },
    {
      image: 'assets/images/cheese4.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'image',
      likes: 2880,
      comments: 86
    },
    {
      image: 'assets/images/cheese5.jpg',
      tags: ['cheeselove', 'cofluence'],
      type: 'video',
      likes: 8088,
      comments: 81
    },
    {
      image: 'assets/images/pizza-8.jpg',
      tags: ['cheeselove', 'cofluence', 'pizza'],
      type: 'image',
      likes: 1233,
      comments: 1112
    },
    {
      image: 'assets/images/pizza-4.jpg',
      tags: ['cheeselove', 'cofluence', 'pizza'],
      type: 'image',
      likes: 54515,
      comments: 854
    },
    {
      image: 'assets/images/pizza-5.jpg',
      tags: ['cheeselove', 'cofluence', 'pizza'],
      type: 'video',
      likes: 3215,
      comments: 221
    },
    {
      image: 'assets/images/pizza-6.jpg',
      tags: ['cheeselove', 'cofluence', 'pizza'],
      type: 'image',
      likes: 3223,
      comments: 45
    },
    {
      image: 'assets/images/pizza-7.jpg',
      tags: ['cheeselove', 'cofluence', 'pizza'],
      type: 'image',
      likes: 234324,
      comments: 3323
    },
    {
      image: 'assets/images/burger-1.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'image',
      likes: 102100,
      comments: 4560
    },
    {
      image: 'assets/images/burger-2.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'video',
      likes: 1233,
      comments: 43
    },
    {
      image: 'assets/images/burger-3.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'image',
      likes: 7584,
      comments: 334
    },
    {
      image: 'assets/images/burger-4.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'image',
      likes: 476574,
      comments: 544
    },
    {
      image: 'assets/images/burger-5.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'image',
      likes: 23432,
      comments: 324
    },
    {
      image: 'assets/images/burger-6.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'image',
      likes: 3244,
      comments: 76
    },
    {
      image: 'assets/images/burger-7.jpg',
      tags: ['cheeselove', 'cofluence', 'burger'],
      type: 'video',
      likes: 12322,
      comments: 44
    }
    ];

    this.storage.set('products', products);
    this.storage.get('products').then((val) => {
      console.log("value",val);

      // val.forEach(element => {
      //   // if (tags.every(e => element.tags.includes(e))) {
      //   //   productList.push(element);
      //   }
      });

  }


/* To set the similar products */
  public setSimilarProducts(){
    let similarProducts = [
      {
        image: 'assets/images/pizza-9.jpg',
        tags: ['cheeselove', 'cofluence', 'pizza'],
        type: 'video',
        likes: 1020,
        comments: 422
      },
      {
        image: 'assets/images/pizza-10.jpg',
        tags: ['cheeselove', 'cofluence', 'pizza'],
        type: 'image',
        likes: 10100,
        comments: 322
      },
      {
        image: 'assets/images/burger-8.jpg',
        tags: ['cheeselove', 'cofluence', 'burger'],
        type: 'video',
        likes: 1200,
        comments: 42
      },
      {
        image: 'assets/images/burger-9.jpg',
        tags: ['cheeselove', 'cofluence', 'burger'],
        type: 'image',
        likes: 1300,
        comments: 42
      },
      {
        image: 'assets/images/pizza1.jpg',
        tags: ['cheeselove', 'cofluence', 'pizza'],
        type: 'image',
        likes: 60096,
        comments: 761
      }, {
        image: 'assets/images/pizza-2.jpg',
        tags: ['cheeselove', 'cofluence', 'pizza'],
        type: 'image',
        likes: 8630,
        comments: 92
      },
      {
        image: 'assets/images/pizza-3.jpg',
        tags: ['cheeselove', 'cofluence', 'pizza'],
        type: 'video',
        likes: 58225,
        comments: 482
      },
      {
        image: 'assets/images/burger-10.jpg',
        tags: ['cheeselove', 'cofluence', 'burger'],
        type: 'video',
        likes: 950,
        comments: 42
      }
    ]

    this.storage.set('similarproducts', similarProducts)
  }


}
