import * as request from "../utils/request";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../models/product";
import { IDataApi } from "../types/dataApi";
import { DataList } from "../types/dataListApi";

export class productService {
  static getProductsDemo(): IProduct[] {
    const products = [
      {
        _id: uuidv4(),
        name: "Ultimate 3D Bluetooth Speaker",
        price: 49,
        oldPrice: 59,
        description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
        imgs: [
          "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
        ],
      },
      {
        _id: uuidv4(),
        name: "Ultimate 3D Bluetooth Speaker",
        price: 49,
        oldPrice: 59,
        description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
        imgs: [
          "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
        ],
      },
      {
        _id: uuidv4(),
        name: "Ultimate 3D Bluetooth Speaker",
        price: 49,
        oldPrice: 59,
        description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
        imgs: [
          "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
        ],
      },
      {
        _id: uuidv4(),
        name: "Ultimate 3D Bluetooth Speaker",
        price: 49,
        oldPrice: 59,
        description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
        imgs: [
          "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
        ],
      },
      {
        _id: uuidv4(),
        name: "Ultimate 3D Bluetooth Speaker",
        price: 49,
        oldPrice: 59,
        description: `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.`,
        imgs: [
          "https://portotheme.com/html/porto_ecommerce/assets/images/products/product-1-2.jpg",
        ],
      },
    ];
    return products;
  }
  static async getProducts(page?: {
    page: number;
    limit: number;
    value?: string;
  }): Promise<DataList<IProduct[]>> {
    const result = await request.get("products", page);
    return result;
  }
  static async del(id: string): Promise<IDataApi<string>> {
    const _id = { id: id };
    const result = await request.del("products", _id);
    return result;
  }
  static async getProductById(id: string) {
    const idObj = { id: id };
    return await request.get("products/id", idObj);
  }

  static async createProduct(product: IProduct): Promise<IDataApi<IProduct>> {
    const pathsRes = await request.upload("products/upload", product.imgs);

    if (pathsRes.success === true) {
      product.imgs = pathsRes.data;
    }
    return await request.post("products", product);
  }
  static async editProduct(
    product: IProduct,
    files: any[]
  ): Promise<IDataApi<IProduct>> {
    const filesEdit: any[] = [];
    product.imgs = [];
    files.forEach((file) => {
      if (!file.url) {
        filesEdit.push(file);
      } else {
        product.imgs.push(file.url);
      }
    });
    const pathsRes = await request.upload("products/upload", filesEdit);

    if (pathsRes.success === true) {
      product.imgs.push(...pathsRes.data);
  
      return await request.put("products", product);
    }
    return pathsRes;
  }
}
